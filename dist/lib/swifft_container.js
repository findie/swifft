"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var ContainerSettings = require("./settings.js").ContainerSettings;

var SwifftObject = _interopRequire(require("./swifft_object.js"));

var SwiftContainer = (function () {
    function SwiftContainer(_ref) {
        var name = _ref.name;
        var account = _ref.account;

        _classCallCheck(this, SwiftContainer);

        this.name = name;
        this.account = account;
    }

    _createClass(SwiftContainer, {
        invoke: {
            value: function invoke(options, callback) {
                options.uri = _core.Object.assign({}, { pathname: this.pathname }, options.uri);
                this.account.invoke(options, callback);
            }
        },
        pathname: {
            get: function () {
                return "" + this.account.pathname + "/" + this.name;
            }
        },
        readSettings: {
            value: function readSettings(res) {
                return _core.Object.assign({
                    account: this.account.id,
                    container: this.name
                }, ContainerSettings.fromHeaders(res.headers));
            }
        },
        object: {
            value: function object(name) {
                return new SwifftObject({ name: name, account: this.account, container: this });
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
                        query: _core.Object.assign(options, { format: "json" })
                    }
                };

                this.invoke(opts, function (err, res, payload) {
                    callback(err, payload, _this.readSettings(res));
                });
            }
        },
        create: {
            value: function create(settings, callback) {
                var _this = this;

                if (typeof settings === "function") {
                    callback = settings;
                    settings = {};
                }

                var opts = {
                    method: "PUT",
                    headers: ContainerSettings.toHeaders(settings)
                };

                this.invoke(opts, function (err, res, payload) {
                    callback(err, payload, _this.readSettings(res));
                });
            }
        },
        "delete": {
            value: function _delete(callback) {
                var _this = this;

                this.invoke({ method: "DELETE" }, function (err, res, _) {
                    callback(err, _this.readSettings(res));
                });
            }
        },
        getMetadata: {
            value: function getMetadata(callback) {
                var _this = this;

                var opts = {
                    method: "HEAD",
                    json: true,
                    uri: {
                        query: {
                            format: "json"
                        }
                    }
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
                    headers: ContainerSettings.toHeaders(settings)
                };

                this.invoke(opts, function (err, res, _) {
                    callback(err, _this.readSettings(res));
                });
            }
        }
    });

    return SwiftContainer;
})();

module.exports = SwiftContainer;