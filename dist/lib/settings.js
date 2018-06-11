"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

var _core = require("babel-runtime/core-js")["default"];

var entries = require("./iterator.js").entries;

var ACCOUNT_SETTINGS = _core.Object.freeze({
    tempUrlKey: "X-Account-Meta-Temp-URL-Key",
    tempUrlkey2: "X-Account-Meta-Temp-URL-Key-2",
    contentType: "Content-Type",
    detectContentType: "X-Detect-Content-Type "
});

var ACCOUNT_METADATA = _core.Object.freeze({
    "x-account-object-count": "objectCount",
    "x-account-container-count": "containerCount",
    "x-account-bytes-used": "bytesUsed",
    "x-account-meta-temp-url-key": "tempUrlKey",
    "x-account-meta-temp-url-key-2 ": "tempUrlKey2",
    "content-length": "contentLength",
    "content-type": "contentType",
    "x-trans-id": "transId"
});

var CONTAINER_SETTINGS = _core.Object.freeze({
    readACL: "X-Container-Read",
    writeACL: "X-Container-Write",
    syncTo: "X-Container-Sync-To",
    syncKey: "X-Container-Sync-Key",
    location: "X-Versions-Location",
    contentType: "Content-Type",
    detectContentType: "X-Detect-Content-Type",
    ifNoneMatch: "If-None-Match"
});

var CONTAINER_METADATA = _core.Object.freeze({
    "x-container-object-count": "objectCount",
    "x-container-bytes-used": "bytesUsed",
    "x-container-read": "readACL",
    "x-container-write": "writeACL",
    "x-container-sync-to ": "syncTo",
    "x-container-sync-key ": "syncKey",
    "x-versions-location": "location",
    "accept-ranges": "acceptRanges",
    "content-length": "contentLength",
    "content-type": "contentType",
    "x-trans-id": "transId"
});

var OBJECT_SETTINGS = _core.Object.freeze({
    deleteAt: "X-Delete-At",
    contentDisposition: "Content-Disposition",
    contentEncoding: "Content-Encoding",
    deleteAfter: "X-Delete-After",
    contentType: "Content-Type",
    detectContentType: "X-Detect-Content-Type",
    range: "range"
});

var OBJECT_METADATA = _core.Object.freeze({
    "last-modified": "lastModified",
    "content-length": "contentLength",
    "content-type": "contentType",
    range: "range",
    etag: "etag",
    "content-encoding": "contentEncoding",
    "content-disposition": "contentDisposition",
    "x-delete-at": "deleteAt",
    "x-object-manifest": "objectManifest",
    "x-static-large-object": "staticLargeObject",
    "x-trans-id": "transId"
});

function encode(value) {
    var buffer = new Buffer(String(value));
    return encodeURI(buffer.toString("utf8"));
}

// NOTE: A TON of duplication here. Can be cleaned up.
module.exports = {

    AccountSettings: {

        toHeaders: function toHeaders() {
            var settings = arguments[0] === undefined ? {} : arguments[0];
            var _settings$metadata = settings.metadata;
            var metadata = _settings$metadata === undefined ? {} : _settings$metadata;
            var _settings$customHeaders = settings.customHeaders;
            var customHeaders = _settings$customHeaders === undefined ? {} : _settings$customHeaders;

            var headers = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(metadata)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    headers["X-Account-Meta-" + key] = encode(value);
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(customHeaders)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    headers[key] = value;
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _core.$for.getIterator(entries(ACCOUNT_SETTINGS)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2);

                    var key = _step3$value[0];
                    var value = _step3$value[1];

                    if (key in settings) {
                        headers[value] = encode(settings[key]);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return headers;
        },

        fromHeaders: function fromHeaders() {
            var headers = arguments[0] === undefined ? {} : arguments[0];

            var settings = { metadata: {} };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    var match = key.match(/^x-account-meta-(.*)/);
                    if (match && match.length > 1) {
                        settings.metadata[match[1]] = value;
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(ACCOUNT_METADATA)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    settings[value] = headers[key];
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

            return settings;
        }

    },

    ContainerSettings: {

        toHeaders: function toHeaders() {
            var settings = arguments[0] === undefined ? {} : arguments[0];
            var _settings$metadata = settings.metadata;
            var metadata = _settings$metadata === undefined ? {} : _settings$metadata;
            var _settings$customHeaders = settings.customHeaders;
            var customHeaders = _settings$customHeaders === undefined ? {} : _settings$customHeaders;

            var headers = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(metadata)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    headers["X-Container-Meta-" + key] = encode(value);
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(customHeaders)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    headers[key] = value;
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _core.$for.getIterator(entries(CONTAINER_SETTINGS)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2);

                    var key = _step3$value[0];
                    var value = _step3$value[1];

                    if (key in settings) {
                        headers[value] = encode(settings[key]);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return headers;
        },

        fromHeaders: function fromHeaders() {
            var headers = arguments[0] === undefined ? {} : arguments[0];

            var settings = { metadata: {} };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    var match = key.match(/^x-container-meta-(.*)/);
                    if (match && match.length > 1) {
                        settings.metadata[match[1]] = value;
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(CONTAINER_METADATA)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    settings[value] = headers[key];
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

            return settings;
        }

    },

    ObjectSettings: {

        toHeaders: function toHeaders() {
            var settings = arguments[0] === undefined ? {} : arguments[0];
            var _settings$metadata = settings.metadata;
            var metadata = _settings$metadata === undefined ? {} : _settings$metadata;
            var _settings$customHeaders = settings.customHeaders;
            var customHeaders = _settings$customHeaders === undefined ? {} : _settings$customHeaders;

            var headers = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(metadata)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    headers["X-Object-Meta-" + key] = encode(value);
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(customHeaders)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    headers[key] = value;
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _core.$for.getIterator(entries(OBJECT_SETTINGS)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2);

                    var key = _step3$value[0];
                    var value = _step3$value[1];

                    if (key in settings) {
                        headers[value] = encode(settings[key]);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return headers;
        },

        fromHeaders: function fromHeaders() {
            var headers = arguments[0] === undefined ? {} : arguments[0];

            var settings = { metadata: {} };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _core.$for.getIterator(entries(headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    var match = key.match(/^x-object-meta-(.*)/);
                    if (match && match.length > 1) {
                        settings.metadata[match[1]] = value;
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _core.$for.getIterator(entries(OBJECT_METADATA)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    settings[value] = headers[key];
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

            return settings;
        }

    }

};