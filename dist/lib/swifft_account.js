"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var Url = _interopRequire(require("url"));

var Wreck = _interopRequire(require("wreck"));

var range = require("./utils.js").range;

var AccountSettings = require("./settings.js").AccountSettings;

var SwifftContainer = _interopRequire(require("./swifft_container.js"));

var ENV = process.env;

var SwifftAccount = (function () {
    function SwifftAccount() {
        var options = arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SwifftAccount);

        var _options$auth_url = options.auth_url;
        var auth_url = _options$auth_url === undefined ? ENV.OS_AUTH_URL : _options$auth_url;
        var _options$tenant_id = options.tenant_id;
        var tenant_id = _options$tenant_id === undefined ? ENV.OS_TENANT_ID : _options$tenant_id;
        var _options$tenant_name = options.tenant_name;
        var tenant_name = _options$tenant_name === undefined ? ENV.OS_TENANT_NAME : _options$tenant_name;
        var _options$endpoint_type = options.endpoint_type;
        var endpoint_type = _options$endpoint_type === undefined ? ENV.OS_ENDPOINT_TYPE : _options$endpoint_type;
        var _options$region = options.region;
        var region = _options$region === undefined ? ENV.OS_REGION_NAME : _options$region;
        var _options$username = options.username;
        var username = _options$username === undefined ? ENV.OS_USERNAME : _options$username;
        var _options$password = options.password;
        var password = _options$password === undefined ? ENV.OS_PASSWORD : _options$password;

        this.auth_url = Url.parse(auth_url);
        this.tenant_id = tenant_id;
        this.tenant_name = tenant_name;
        this.region = region;
        this.endpoint_type = endpoint_type;

        this.storage_url = {};
        this.id = undefined;

        this.auth = undefined;
        if (username && password) {
            this.authenticate({ username: username, password: password });
        }
    }

    _createClass(SwifftAccount, {
        invoke: {
            value: function invoke(options, callback) {
                var _this = this;

                this.auth.then(function (token) {

                    options.headers = _core.Object.assign({}, options.headers, {
                        "X-Auth-Token": token && token.id
                    });

                    // Prepend the generated path with the root as provided by
                    // the storage url. This is done late (as opposed to in the
                    // `pathname` getter because it's not available until after
                    // authentication has happened.
                    var root = _this.storage_url.pathname;

                    // Use storage url as base, apply (reset) the pathname, and
                    // then apply the options uri, finally updating it to use
                    // the root storage path. This could probably be cleaned up
                    // and made more straightforward, but works for now.
                    options.uri = _core.Object.assign({}, _this.storage_url, { pathname: _this.pathname }, options.uri);
                    options.uri.pathname = root + options.uri.pathname;

                    _this._request(options, callback);
                }, callback);
            }
        },
        pathname: {
            get: function () {
                return "";
            }
        },
        readSettings: {
            value: function readSettings(res) {
                if (res) {
                    return _core.Object.assign({
                        account: this.id
                    }, AccountSettings.fromHeaders(res.headers));
                }
                return undefined;
            }
        },
        container: {
            value: function container(name) {
                return new SwifftContainer({ name: name, account: this });
            }
        },
        authenticate: {
            value: function authenticate() {
                var _this = this;

                var credentials = arguments[0] === undefined ? {} : arguments[0];
                var _credentials$username = credentials.username;
                var username = _credentials$username === undefined ? ENV.OS_USERNAME : _credentials$username;
                var _credentials$password = credentials.password;
                var password = _credentials$password === undefined ? ENV.OS_PASSWORD : _credentials$password;

                this.auth = new _core.Promise(function (resolve, reject) {

                    var opts = {
                        method: "POST",
                        json: true,
                        uri: _core.Object.assign({}, _this.auth_url, { pathname: "/v2.0/tokens" }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        payload: JSON.stringify({
                            auth: {
                                tenantName: _this.tenant_name,
                                tenantId: _this.tenant_id,
                                passwordCredentials: {
                                    username: username,
                                    password: password
                                }
                            }
                        })
                    };

                    _this._request(opts, function (err, res, payload) {

                        if (err) {
                            reject(err);
                            return;
                        }

                        var _payload$access = payload.access;
                        var token = _payload$access.token;
                        var _payload$access$serviceCatalog = _payload$access.serviceCatalog;
                        var serviceCatalog = _payload$access$serviceCatalog === undefined ? [] : _payload$access$serviceCatalog;

                        _this.id = "KEY_" + token.tenant.id;

                        // Reauthenticate 5 minutes prior to expiry. Hopefully this will take into
                        // account any differences in clocks, etc. Not my fav, but it should do.
                        var lifetime = new Date(token.expires) - new Date(token.issued_at);
                        var timeout = lifetime - 1000 * 60 * 5;
                        setTimeout(function () {
                            _this.authenticate(credentials);
                        }, timeout).unref();

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            services: for (var _iterator = _core.$for.getIterator(serviceCatalog), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _step$value = _step.value;
                                var type = _step$value.type;
                                var _name = _step$value.name;
                                var endpoints = _step$value.endpoints;

                                if (type === "object-store" && _name === "swift") {
                                    var _iteratorNormalCompletion2 = true;
                                    var _didIteratorError2 = false;
                                    var _iteratorError2 = undefined;

                                    try {
                                        for (var _iterator2 = _core.$for.getIterator(endpoints), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                            var endpoint = _step2.value;

                                            if (endpoint.region && _this.region && endpoint.region.toLowerCase() === _this.region.toLowerCase()) {
                                                switch (_this.endpoint_type) {
                                                    case "adminURL":
                                                        _this.storage_url = Url.parse(endpoint.adminURL);
                                                        break;

                                                    case "internalURL":
                                                        _this.storage_url = Url.parse(endpoint.internalURL);
                                                        break;

                                                    case "publicURL":
                                                        _this.storage_url = Url.parse(endpoint.publicURL);
                                                        break;

                                                    default:
                                                        _this.storage_url = Url.parse(endpoint.publicURL || endpoint.internalURL);
                                                }
                                                break services;
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError2 = true;
                                        _iteratorError2 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                                _iterator2["return"]();
                                            }
                                        } finally {
                                            if (_didIteratorError2) {
                                                throw _iteratorError2;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        resolve(token);
                    });
                });

                return this;
            }
        },
        getMetadata: {
            value: function getMetadata(callback) {
                var _this = this;

                var opts = {
                    method: "HEAD",
                    json: true
                };

                this.invoke(opts, function (err, res, _) {
                    callback(err, _this.readSettings(res));
                });
            }
        },
        updateMetadata: {
            value: function updateMetadata(settings, callback) {
                var _this = this;

                var opts = {
                    method: "POST",
                    headers: AccountSettings.toHeaders(settings)
                };

                this.invoke(opts, function (err, res, _) {
                    callback(err, _this.readSettings(res));
                });
            }
        },
        list: {
            value: function list(options, callback) {
                var _this = this;

                if (typeof options === "function") {
                    callback = options;
                    options = {};
                }

                var opts = {
                    json: true,
                    uri: {
                        query: _core.Object.assign({ format: "json" }, options)
                    }
                };

                this.invoke(opts, function (err, res, payload) {
                    callback(err, payload, _this.readSettings(res));
                });
            }
        },
        _request: {
            value: function _request(options, callback) {
                var _options$method = options.method;
                var method = _options$method === undefined ? "GET" : _options$method;
                var json = options.json;

                Wreck.request(method, Url.format(options.uri), options, function (err, res) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    if (options.stream) {
                        callback(err, res, null);
                        return;
                    }

                    Wreck.read(res, { json: json }, function (err, payload) {
                        if (err) {
                            callback(err, res, payload);
                            return;
                        }

                        if (range(res.statusCode) !== 200) {
                            switch (res.statusCode) {
                                case 401:
                                    err = new Error("Unauthorized.");
                                    err.code = res.statusCode;
                                    break;

                                case 404:
                                    err = new Error("Not found.");
                                    err.code = res.statusCode;
                                    break;

                                default:
                                    // TODO: This is pretty brute force error handling.
                                    if (Buffer.isBuffer(payload)) {
                                        err = new Error("Error: " + res.statusCode);
                                        err.detail = payload.toString("utf8");
                                        err.code = res.statusCode;
                                    } else {
                                        var _payload$error = payload.error;
                                        var title = _payload$error.title;
                                        var message = _payload$error.message;
                                        var code = _payload$error.code;

                                        err = new Error(title);
                                        err.detail = message;
                                        err.code = code;
                                    }
                            }

                            callback(err, res, payload);
                            return;
                        }

                        callback(err, res, payload);
                    });
                });
            }
        }
    });

    return SwifftAccount;
})();

module.exports = SwifftAccount;