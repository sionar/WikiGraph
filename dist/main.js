/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  getPageLinks('Boston');\n})\n\n\nfunction getPageLinks(name, payload = [], cont = '') {\n  const headerParams = '&origin=*&format=json&formatversion=2';\n  const prop = '&prop=links&plnamespace=0&pllimit=500';\n  const plcontinue = cont ? `&plcontinue=${cont}` : '';\n  const domain = 'http://en.wikipedia.org/w/api.php?action=query';\n  const searchParams = `&titles=${name}`;\n  const url = `${domain}${headerParams}${searchParams}${prop}${plcontinue}`;\n  fetch(url, {method: 'GET', mode: 'cors'})\n    .then(res => res.json())\n    .then(res => {\n      payload = payload.concat(res.query.pages[0].links);      \n      if (res.continue)\n        getPageLinks(name, payload, res.continue.plcontinue);\n      else {\n        const index = Math.floor(payload.length/50);\n        getLinkData(payload, index);\n      }\n    })    \n}\n\nfunction getLinkData(data, index, output = []) {\n  if (index === -1) {\n    return addFilteredEdges(output);\n  }\n  const headerParams = '&origin=*&format=json&formatversion=2';\n  const prop = '&prop=linkshere|pageviews&lhlimit=500';\n  const domain = 'http://en.wikipedia.org/w/api.php?action=query';\n  const titleQuery = [];\n  const links = data.slice(index*50, index*50 + 50);\n  links.forEach(link => titleQuery.push(link.title))\n  const titleQueryStr = titleQuery.join('|');\n  const searchParams = `&titles=${titleQueryStr}`\n  const url = `${domain}${headerParams}${searchParams}${prop}`;\n  fetch(url, { method: 'GET', mode: 'cors',} )\n    .then(res => res.json())\n    .then(res => {\n      output = output.concat(res.query.pages);\n      getLinkData(data, index-1, output )\n    })\n  }\n\nfunction addFilteredEdges(data) {\n  let candidates = {}\n\n  if (data.length <= 8) {\n    for (let i = 0; i < data.length; i++) {\n      candidates[data[i].pageid] = data[i];\n    }\n    edges = Object.assign(_store__WEBPACK_IMPORTED_MODULE_0__[\"edges\"], candidates);\n    return\n  }\n\n  if (data.length < 50) {\n    const shuffled = shuffle(data);\n    for (let i = 0; i < 8; i++) {\n      candidates[shuffled[i].pageid] = shuffled[i];\n    }\n    edges = Object.assign(_store__WEBPACK_IMPORTED_MODULE_0__[\"edges\"], candidates);\n    return\n  }\n\n  for (let i = 0; i < data.length; i++) {\n    if (data[i].pageviews && data[i].linkshere)\n      candidates[data[i].pageid] = data[i];\n  }\n  if (Object.keys(candidates).length < 50)\n    edges = Object.assign(_store__WEBPACK_IMPORTED_MODULE_0__[\"edges\"], candidates);  \n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: nodes, edges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nodes\", function() { return nodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"edges\", function() { return edges; });\nlet nodes = {};\nlet edges = {};\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });