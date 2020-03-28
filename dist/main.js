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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  getPageLinks('Tony');\n})\n\n\nfunction getPageLinks(name) {\n  const headerParams = '&origin=*&format=json&formatversion=2'\n  const prop = '&prop=links&plnamespace=0&pllimit=500'\n  const domain = 'http://en.wikipedia.org/w/api.php?action=query'\n  const searchParams = `&titles=${name}`\n  const url = `${domain}${headerParams}${searchParams}${prop}`;\n  fetch(url, {\n    method: 'GET',\n    mode: 'cors',\n  })\n  .then(res => res.json())\n  .then(data => getLinkPageCounts(data)) \n}\n\nfunction getLinkPageCounts(data) {\n  let titleQuery, links, titleQueryStr, searchParams, url;\n  const headerParams = '&origin=*&format=json&formatversion=2';\n  const prop = '&prop=linkshere|pageviews';\n  const domain = 'http://en.wikipedia.org/w/api.php?action=query';\n  for (let i = 0; i < data.query.pages[0].links.length/50; i++) {\n    titleQuery = [];\n    links = data.query.pages[0].links.slice(i*50,i*50 + 50);\n    links.forEach(link => titleQuery.push(link.title))\n    titleQueryStr = titleQuery.join('|');\n    searchParams = `&titles=${titleQueryStr}`\n    url = `${domain}${headerParams}${searchParams}${prop}`;\n    fetch(url, { method: 'GET', mode: 'cors',} )\n      .then(res => res.json())\n      .then(data => addFilteredEdges(data))\n    }\n  }\n\nfunction addFilteredEdges(data) {\n  const candidateEdges = data.query.pages;\n  for (let i = 0; i < candidateEdges.length; i++) {\n    if (candidateEdges[i].pageviews && candidateEdges[i].linkshere)\n      _store__WEBPACK_IMPORTED_MODULE_0__[\"edges\"][candidateEdges[i].pageid] = candidateEdges[i];\n  }\n  console.log(_store__WEBPACK_IMPORTED_MODULE_0__[\"edges\"]);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: nodes, edges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nodes\", function() { return nodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"edges\", function() { return edges; });\nconst nodes = {};\nconst edges = {};\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });