#!/usr/bin/env node
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var Fs = _interopRequire(require("fs"));

var minimist = _interopRequire(require("minimist"));

var Swifft = _interopRequire(require("../index.js"));

var argv = minimist(process.argv.slice(2), {
    alias: {
        os_auth_url: "a",
        os_tenant_id: "i",
        os_tenant_name: "n",
        os_username: "u",
        os_password: "p",
        os_endpoint_type: "e",
        region: "r"
    },
    "default": {}
});

var COMMANDS = {

    stat: function stat(target) {
        return function stat() {
            // Superfluous command arguments are a noop.
            if (arguments.length) {
                return stat;
            }

            target.getMetadata(function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
            });
        };
    },

    list: function list(target) {
        return function list() {
            // Superfluous command arguments are a noop.
            if (arguments.length) {
                return list;
            }

            target.list(function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(result);
            });
        };
    },

    download: function download(target) {
        return function download() {
            // Superfluous command arguments are a noop.
            if (arguments.length) {
                return download;
            }

            target.getStream(function (err, stream, settings) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (settings.contentType === "text/plain") {
                    stream.setEncoding("utf8");
                }

                stream.pipe(process.stdout);
            });
        };
    },

    post: function post(arg) {},

    "delete": function _delete(arg) {}

};

var swifft = Swifft.create(argv);

var command = function command(cmd) {

    switch (cmd) {
        case "list":
            return function (container) {
                var operation = COMMANDS.list(swifft);

                if (container) {
                    swifft = swifft.container(container);
                    operation = COMMANDS.list(swifft);
                    return operation;
                }

                operation();
            };

        case "stat":
            return function (container) {
                var operation = COMMANDS.stat(swifft);

                if (container) {
                    swifft = swifft.container(container);
                    operation = COMMANDS.stat(swifft);

                    return function (object) {
                        if (object) {
                            swifft = swifft.object(object);
                            operation = COMMANDS.stat(swifft);
                            return operation;
                        }

                        operation();
                    };
                }

                operation();
            };

        case "download":
            return function (container) {
                swifft = swifft.container(container);

                return function (object) {
                    swifft = swifft.object(object);
                    return COMMANDS.download(swifft);
                };
            };

        default:
            console.log("Usage...");
    }
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = _core.$for.getIterator(argv._), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var current = _step.value;

        command = command(current);
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

command();

/*
 // These defaults live in the lib/swifft_account.js implementation.
 'os_auth_url':      process.env.OS_AUTH_URL,
 'os_tenant_id':     process.env.OS_TENANT_ID,
 'os_tenant_name':   process.env.OS_TENANT_NAME,
 'os_username':      process.env.OS_USERNAME,
 'os_password':      process.env.OS_PASSWORD,
 'os_endpoint_type': process.env.OS_ENDPOINT_TYPE,
 'region':           process.env.OS_REGION_NAME
 */