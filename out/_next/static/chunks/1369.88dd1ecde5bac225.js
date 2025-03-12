"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1369],{81369:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=d;var n=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=a(e)&&"function"!=typeof e)return{default:e};if((t=f(t))&&t.has(e))return t.get(e);var r,n,u={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(r in e)"default"!==r&&({}).hasOwnProperty.call(e,r)&&((n=o?Object.getOwnPropertyDescriptor(e,r):null)&&(n.get||n.set)?Object.defineProperty(u,r,n):u[r]=e[r]);return u.default=e,t&&t.set(e,u),u}(r(2265)),u=c(r(83382)),o=c(r(40718)),i=["type","width","height","series","options"];function c(e){return e&&e.__esModule?e:{default:e}}function f(e){var t,r;return"function"!=typeof WeakMap?null:(t=new WeakMap,r=new WeakMap,(f=function(e){return e?r:t})(e))}function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r,n=arguments[t];for(r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)),n}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){y(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function y(e,t,r){var n;return(n=function(e,t){if("object"!=a(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);if(r=r.call(e,t||"default"),"object"!=a(r))return r;throw TypeError("@@toPrimitive must return a primitive value.")}(n=t,"string"),(t="symbol"==a(n)?n:n+"")in e)?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new WeakSet;if(e!==t){if("object"!==a(e)||null===e||"object"!==a(t)||null===t)return!1;if(!r.has(e)&&!r.has(t)){r.add(e),r.add(t);var n=Object.keys(e),u=Object.keys(t);if(n.length!==u.length)return!1;for(var o=0;o<n.length;o++){var i=n[o];if(!u.includes(i)||!b(e[i],t[i],r))return!1}}}return!0}function d(e){function t(e){return e&&"object"===a(e)&&!Array.isArray(e)}var r,o,c,f=e.type,s=void 0===f?"line":f,f=e.width,O=void 0===f?"100%":f,f=e.height,h=void 0===f?"auto":f,g=e.series,j=e.options,f=function(e,t){if(null==e)return{};var r,n=function(e,t){if(null==e)return{};var r,n={};for(r in e)if(({}).hasOwnProperty.call(e,r)){if(t.includes(r))continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols)for(var u=Object.getOwnPropertySymbols(e),o=0;o<u.length;o++)r=u[o],t.includes(r)||({}).propertyIsEnumerable.call(e,r)&&(n[r]=e[r]);return n}(e,i),v=(0,n.useRef)(null),w=(0,n.useRef)(null),m=(0,n.useRef)(),P=((0,n.useEffect)(function(){m.current=j;var e=v.current;return w.current=new u.default(e,P()),w.current.render(),function(){w.current&&"function"==typeof w.current.destroy&&w.current.destroy()}},[]),(0,n.useEffect)(function(){var e=!b(w.current.w.config.series,g),t=!b(m.current,j)||h!==w.current.opts.chart.height||O!==w.current.opts.chart.width;(e||t)&&(!e||t?w.current.updateOptions(P()):w.current.updateSeries(g)),m.current=j},[j,g,h,O]),function(){return _(j,{chart:{type:s,height:h,width:O},series:g})}),_=function(e,r){var n=p({},e);return t(e)&&t(r)&&Object.keys(r).forEach(function(u){t(r[u])&&u in e?n[u]=_(e[u],r[u]):Object.assign(n,y({},u,r[u]))}),n},e=(r=f,o=Object.keys(d.propTypes),c=p({},r),o.forEach(function(e){delete c[e]}),c);return n.default.createElement("div",l({ref:v},e))}d.propTypes={type:o.default.string.isRequired,series:o.default.array.isRequired,options:o.default.object.isRequired,width:o.default.oneOfType([o.default.string,o.default.number]),height:o.default.oneOfType([o.default.string,o.default.number])}}}]);