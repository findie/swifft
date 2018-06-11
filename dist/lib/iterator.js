"use strict";

var _core = require("babel-runtime/core-js")["default"];

var entries = function entries(target) {

    return Object.create(target, (function () {
        var _Object$create = {};
        _Object$create[_core.Symbol.iterator] = {
            value: function value() {
                var _this = this;

                var target = _core.Object.getPrototypeOf(this);
                var keys = _core.Object.keys(target);

                return {
                    next: function () {

                        if (keys.length) {
                            var key = keys.shift();
                            return {
                                value: [key, _this[key]],
                                done: false
                            };
                        }

                        return { done: true };
                    }
                };
            }
        };
        return _Object$create;
    })());
};

module.exports = {

    entries: entries

};