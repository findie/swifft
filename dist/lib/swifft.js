"use strict";

var _slice = require("babel-runtime/helpers/slice")["default"];

var _applyConstructor = require("babel-runtime/helpers/apply-constructor")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var SwifftAccount = _interopRequire(require("./swifft_account.js"));

module.exports = {

    create: function create() {
        return _applyConstructor(SwifftAccount, _slice.call(arguments));
    }

};