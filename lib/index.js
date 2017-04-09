(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aurelia-framework"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["aurelia-framework", "redux"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("aurelia-framework"), require("redux")) : factory(root["aurelia-framework"], root["redux"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(5);
var aurelia_framework_1 = __webpack_require__(0);
function configureStore(reducers, middleware) {
    var create = middleware && middleware.length !== 0
        ? redux_1.compose.apply(this, middleware.map(function (x) { return redux_1.applyMiddleware(x); }))(redux_1.createStore)
        : redux_1.createStore;
    var store = create(reducers);
    // add the store to aurelia's DI
    aurelia_framework_1.Container.instance.registerSingleton('AppStore', store);
    return store;
}
exports.default = configureStore;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = __webpack_require__(0);
function connect(mapStateToProps) {
    var AppStore = aurelia_framework_1.Container.instance.get('AppStore');
    var defaultMap = function (state) { return state; };
    var mapFunction = mapStateToProps || defaultMap;
    return function (target) {
        // create or overide the attach/detached methods to implement
        // the store subscription
        var attached = target.prototype.attached;
        var detached = target.prototype.detached;
        var unsubscribe;
        target.prototype.attached = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // subscribe to store updates
            unsubscribe = AppStore.subscribe(function () {
                // get the state
                var state = mapFunction(AppStore.getState());
                // update the props if changed
                if (_this.props !== state)
                    _this.props = state;
            });
            // call the original attached
            if (typeof attached === 'function') {
                attached.call.apply(attached, [this].concat(args));
            }
        };
        target.prototype.detached = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // unsubscribe from the store
            unsubscribe();
            // call the original detached
            if (typeof detached === 'function') {
                detached.call.apply(detached, [this].concat(args));
            }
        };
        return target;
    };
}
exports.connect = connect;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = __webpack_require__(0);
function dispatch(action) {
    var store = aurelia_framework_1.Container.instance.get('AppStore');
    store.dispatch(action);
}
exports.dispatch = dispatch;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(2));
__export(__webpack_require__(3));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});