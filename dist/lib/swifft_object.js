"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var ObjectSettings = require("./settings").ObjectSettings;

var SwiftObject = (function () {
    function SwiftObject(_ref) {
        var name = _ref.name;
        var account = _ref.account;
        var container = _ref.container;

        _classCallCheck(this, SwiftObject);

        this.name = name;
        this.account = account;
        this.container = container;
    }

    _createClass(SwiftObject, {
        pathname: {
            get: function () {
                return "" + this.container.pathname + "/" + this.name;
            }
        },
        readSettings: {
            value: function readSettings(res) {
                return _core.Object.assign({
                    account: this.account.id,
                    container: this.container.name,
                    object: this.name
                }, ObjectSettings.fromHeaders(res.headers));
            }
        },
        invoke: {
            value: function invoke(options, callback) {
                options.uri = _core.Object.assign({}, { pathname: this.pathname }, options.uri);
                this.account.invoke(options, callback);
            }
        },
        get: {
            value: function get(callback) {
                var _this = this;

                this.invoke({}, function (err, res, payload) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, payload, _this.readSettings(res));
                });
            }
        },
        getStream: {
            value: function getStream(range, callback) {
                var _this = this;

                if (typeof range === "function") {
                    callback = range;
                    range = undefined;
                }

                var opts = {
                    method: "GET",
                    stream: true,
                    headers: {}
                };

                if (range) {
                    opts.headers.range = range;
                }

                this.invoke(opts, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, res, _this.readSettings(res));
                });
            }
        },
        getRange: {
            value: function getRange(range, callback) {
                var _this = this;

                var opts = {
                    method: "GET",
                    headers: { range: range }
                };

                this.invoke(opts, function (err, res, payload) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, payload, _this.readSettings(res));
                });
            }
        },
        create: {
            value: function create(content, settings, callback) {
                var _this = this;

                if (typeof settings === "function") {
                    callback = settings;
                    settings = {};
                }

                var opts = {
                    method: "PUT",
                    payload: content,
                    headers: ObjectSettings.toHeaders(settings)
                };

                if (settings.insecure) {
                    opts.rejectUnauthorized = false;
                }

                this.invoke(opts, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, _this.readSettings(res));
                });
            }
        },
        copy: {
            value: function copy(destination, callback) {
                var _this = this;

                var _destination$container = destination.container;
                var container = _destination$container === undefined ? this.container.name : _destination$container;
                var _destination$object = destination.object;
                var object = _destination$object === undefined ? this.name : _destination$object;

                var opts = {
                    method: "COPY",
                    headers: {
                        Destination: "" + container + "/" + object
                    }
                };

                this.invoke(opts, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, _this.readSettings(res));
                });
            }
        },
        "delete": {
            value: function _delete(callback) {
                var _this = this;

                this.invoke({ method: "DELETE" }, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, _this.readSettings(res));
                });
            }
        },
        getMetadata: {
            value: function getMetadata(callback) {
                var _this = this;

                var opts = {
                    method: "HEAD"
                };

                this.invoke(opts, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, _this.readSettings(res));
                });
            }
        },
        updateMetadata: {
            value: function updateMetadata(settings, callback) {
                var _this = this;

                var opts = {
                    method: "POST",
                    headers: ObjectSettings.toHeaders(settings)
                };

                this.invoke(opts, function (err, res, _) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(err, _this.readSettings(res));
                });
            }
        }
    });

    return SwiftObject;
})();

module.exports = SwiftObject;