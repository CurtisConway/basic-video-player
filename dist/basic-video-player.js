!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){n(2),e.exports=n(5)},function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r),i=n(3),o=s()(i),a=n(4),l=s()(a);function u(e){var t=Number(e),n={hours:Math.floor(t/3600),minutes:Math.floor(t%3600/60),seconds:Math.floor(t%3600%60)},r="";function s(e){return e>-1&&e<10?"0"+e:e}return Object.keys(n).forEach(function(e){(n[e]>0||"hours"!==e)&&(r+="seconds"!==e?s(n[e])+":":s(n[e]))}),r}Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("player"),t=new o.default(e,{poster:"https://d292x7cpdimrbp.cloudfront.net/video/poster.jpg",sources:[{src:"https://d292x7cpdimrbp.cloudfront.net/video/1080.mp4",type:"video/mp4",label:"1080"},{src:"https://d292x7cpdimrbp.cloudfront.net/video/720.mp4",type:"video/mp4",label:"720"},{src:"https://d292x7cpdimrbp.cloudfront.net/video/480.mp4",type:"video/mp4",label:"480"}],hlsManifestUrl:"https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8"}),n=document.getElementById("bv__play__pause"),r=document.getElementById("bv__progress"),s=document.querySelector(".bv__progress__bar"),i=document.getElementById("bv__current__progress"),a=document.getElementById("bv__current__buffered"),c=document.getElementById("bv__rate"),d=document.getElementById("bv__sources"),f=document.getElementById("bv__currentTime"),m=document.getElementById("bv__duration"),h=document.getElementById("bv__volume__button"),p=document.getElementById("bv__volume__range"),v=document.querySelector(".bv__range__handle"),b=(document.getElementById("bv__settings"),document.getElementById("bv__settings__drawer")),y=document.querySelector(".bv__container"),E=void 0;function g(){E=setInterval(function(){t.isPlaying&&(i.style.transform="translateX(-"+(100-100*t.currentProgress)+"%)")},100)}document.addEventListener("click",function(e){var n,r=e.target;r.matches("#bv__play__pause")&&(t.isPlaying?t.pause():t.play()),r.matches("#bv__forward")&&(t.currentTime+=10),r.matches("#bv__backward")&&(t.currentTime-=10),r.matches("#bv__volume__button")&&(t.isMuted=!t.isMuted,p.value=t.isMuted?0:100*t.currentVolume,v.style.width=(t.isMuted?0:100*t.currentVolume)+"%",h.classList.toggle("muted")),r.matches("#bv__settings")&&(b.classList.contains("bv__hidden")?((n=b).classList.add("bv__animated","fadeInRight"),n.classList.remove("bv__hidden"),setTimeout(function(){n.classList.remove("bv__animated","fadeInRight")},400)):function(e){e.classList.add("bv__animated","fadeOutRight"),setTimeout(function(){e.classList.add("bv__hidden"),e.classList.remove("bv__animated","fadeOutRight")},400)}(b)),r.matches("#bv__fullscreen")&&(console.log(l.default.enabled),l.default.enabled&&l.default.toggle(y))}),t.MediaElement.controls=!1,t.MediaElement.addEventListener("timeupdate",function(e){r.setAttribute("value",100*t.currentProgress),f.innerHTML=u(Math.floor(t.currentTime)),m.innerHTML=u(t.totalDuration)}),g();function _(e){var n=M(e)/100;t.currentTime=Math.floor(t.totalDuration*n),t.play(),g(),s.classList.remove("active"),["mousemove","touchmove"].forEach(function(e){document.removeEventListener(e,L)}),["mouseup","touchend"].forEach(function(e){document.removeEventListener(e,_)})}function L(e){var t=100-M(e);i.style.transform="translateX(-"+t+"%)"}function M(e){return((e.clientX||(e.touches[0]?e.touches[0].clientX:e.changedTouches[0].clientX))-function(e){for(var t={x:0,y:0};e;){if("BODY"===e.tagName){var n=e.scrollLeft||document.documentElement.scrollLeft,r=e.scrollTop||document.documentElement.scrollTop;t.x+=e.offsetLeft-n+e.clientLeft,t.y+=e.offsetTop-r+e.clientTop}else t.x+=e.offsetLeft-e.scrollLeft+e.clientLeft,t.y+=e.offsetTop-e.scrollTop+e.clientTop;e=e.offsetParent}return t}(s).x)/s.clientWidth*100}["dragstart","dragend"].forEach(function(e){s.addEventListener(e,function(e){return e.preventDefault(),!1})}),["mousedown","touchstart"].forEach(function(e){s.addEventListener(e,function(e){t.pause(),clearInterval(E),s.classList.add("active"),["mousemove","touchmove"].forEach(function(e){document.addEventListener(e,L)}),["mouseup","touchend"].forEach(function(e){document.addEventListener(e,_)})})}),t.MediaElement.addEventListener("play",function(e){n.classList.add("bv__playing"),n.setAttribute("title","Pause")}),t.MediaElement.addEventListener("pause",function(e){n.classList.remove("bv__playing"),n.setAttribute("title","Play")}),setInterval(function(){t.buffered.length&&(a.style.transform="translateX(-"+(100-t.buffered.end(0))+"%)")},250),c.addEventListener("change",function(e){t.playbackRate=e.target.value}),p.value=100*t.currentVolume,v.style.width=100*t.currentVolume+"%",p.addEventListener("input",function(e){e.target.value>0?(t.currentVolume=e.target.value/100,t.isMuted=!1,h.classList.remove("muted")):(t.currentVolume=0,t.isMuted=!0,h.classList.add("muted")),v.style.width=e.target.value+"%",t.currentVolume<.3&&t.currentVolume>0?h.classList.add("low"):h.classList.remove("low")}),t.MediaElement.addEventListener("init",function(e){setTimeout(function(){document.querySelector(".bv__container").classList.remove("bv__loading")},200),t.playbackQualities.forEach(function(e){var n=document.createElement("option");n.setAttribute("value",e.src),n.innerHTML=e.label;var r=-1===t.currentPlaybackQuality?t.HLSInstance.startLevel:t.currentPlaybackQuality;e.src===r&&n.setAttribute("selected","selected"),d.appendChild(n)}),d.addEventListener("change",function(e){t.currentPlaybackQuality=e.target.value})})})},function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return r});class r{constructor(e,{poster:t,sources:n,defaultSource:r=0,hlsManifestUrl:s}){this.MediaElement=e,this.MediaElement.controls=!0,this.MediaElement.playsinline=!0,this.sources=n,this.poster=t,this.isPlaying=!1,this.loading=!0,this.defaultSource=r,this.HLSManifestURL=s,this.HLSisSupported=null,this.HLSInstance=null,this.MediaElement.addEventListener("play",()=>{this.isPlaying=!0}),this.MediaElement.addEventListener("pause",()=>{this.isPlaying=!1}),this.init().then(e=>{this.loading=!1,this.MediaElement.dispatchEvent(new CustomEvent("init"))})}get currentSource(){return this.MediaElement.src}set currentSource(e){this.MediaElement.src=e||""}get poster(){return this.MediaElement.poster}set poster(e){this.MediaElement.poster=e}get currentVolume(){return this.MediaElement.volume}set currentVolume(e){this.MediaElement.volume=e||.5}get buffered(){return this.MediaElement.buffered}get isMuted(){return this.MediaElement.muted}set isMuted(e){this.MediaElement.muted=e||!1}get isLoading(){return this.loading}get isReady(){return 4===this.MediaElement.readyState}get readyState(){return this.MediaElement.readyState}get totalDuration(){return this.MediaElement.duration}get currentTime(){return this.MediaElement.currentTime}set currentTime(e){this.MediaElement.currentTime=e||0}get currentProgress(){return this.MediaElement.duration?this.currentTime/this.MediaElement.duration:0}get playbackRate(){return this.MediaElement.playbackRate}set playbackRate(e){this.MediaElement.playbackRate=e||1}get playbackQualities(){return null!=this.HLSInstance?this.HLSInstance.levels.map((e,t)=>({label:e.name,src:t})):this.sources.map((e,t)=>({label:e.label,src:t}))}get currentPlaybackQuality(){if(null!=this.HLSInstance)return this.HLSInstance.currentLevel;return this.sources.map(e=>e.src).indexOf(this.currentSource)}set currentPlaybackQuality(e){if(null!=this.HLSInstance)this.HLSInstance.currentLevel=e;else{const t=this.currentTime,n=this.playbackRate;this.currentSource=this.sources[e].src,this.playbackRate=n,this.currentTime=t,this.isPlaying&&this.play()}}forceLoad(){return new Promise((e,t)=>{let n=0;this.MediaElement.load();const r=setInterval(()=>{n++,this.isReady&&(e(this.isReady),clearInterval(r)),n>3e3&&(t("Timed Out"),clearInterval(r))},100)})}init(){return new Promise(e=>{this.HLSManifestURL?r.loadHlsJs().then(t=>{t&&(this.HLSisSupported=window.Hls.isSupported(),this.HLSisSupported?this.attachHls(this.HLSManifestURL).then(t=>{e(!0)}):e(!1))}):(this.currentSource=this.sources[this.defaultSource]?this.sources[this.defaultSource].src:"",e(!0))})}play(){this.MediaElement.play().catch(()=>{console.log(this.readyState)})}pause(){this.MediaElement.pause()}static loadHlsJs(){return new Promise(e=>{if(document.getElementById("hlsJS"))e(!0);else{const t=document.createElement("script");t.setAttribute("id","hlsJS"),t.setAttribute("src","https://cdn.jsdelivr.net/npm/hls.js@latest"),document.body.appendChild(t),t.addEventListener("load",()=>{e(!0)})}})}attachHls(e){return this.HLSInstance=new Hls,new Promise(t=>{this.HLSInstance.attachMedia(this.MediaElement),this.HLSInstance.on(Hls.Events.ERROR,(e,t)=>{this.MediaElement.dispatchEvent(new CustomEvent("HLSError",t))}),this.HLSInstance.on(Hls.Events.MEDIA_ATTACHED,()=>{this.HLSInstance.loadSource(e),this.HLSInstance.on(Hls.Events.MANIFEST_PARSED,(e,n)=>{t({event:e,data:n})})})})}}},function(e,t,n){
/*!
* screenfull
* v4.0.0 - 2018-12-15
* (c) Sindre Sorhus; MIT License
*/
!function(){"use strict";var t="undefined"!=typeof window&&void 0!==window.document?window.document:{},n=e.exports,r="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,s=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,s=n.length,i={};r<s;r++)if((e=n[r])&&e[1]in t){for(r=0;r<e.length;r++)i[n[0][r]]=e[r];return i}return!1}(),i={change:s.fullscreenchange,error:s.fullscreenerror},o={request:function(e){return new Promise(function(n){var i=s.requestFullscreen,o=function(){this.off("change",o),n()}.bind(this);e=e||t.documentElement,/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)?e[i]():e[i](r?Element.ALLOW_KEYBOARD_INPUT:{}),this.on("change",o)}.bind(this))},exit:function(){return new Promise(function(e){var n=function(){this.off("change",n),e()}.bind(this);t[s.exitFullscreen](),this.on("change",n)}.bind(this))},toggle:function(e){return this.isFullscreen?this.exit():this.request(e)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var r=i[e];r&&t.addEventListener(r,n,!1)},off:function(e,n){var r=i[e];r&&t.removeEventListener(r,n,!1)},raw:s};s?(Object.defineProperties(o,{isFullscreen:{get:function(){return Boolean(t[s.fullscreenElement])}},element:{enumerable:!0,get:function(){return t[s.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(t[s.fullscreenEnabled])}}}),n?e.exports=o:window.screenfull=o):n?e.exports=!1:window.screenfull=!1}()},function(e,t,n){var r=n(6);"string"==typeof r&&(r=[[e.i,r,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,s);r.locals&&(e.exports=r.locals)},function(e,t,n){},function(e,t,n){var r,s,i={},o=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===s&&(s=r.apply(this,arguments)),s}),a=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),l=null,u=0,c=[],d=n(8);function f(e,t){for(var n=0;n<e.length;n++){var r=e[n],s=i[r.id];if(s){s.refs++;for(var o=0;o<s.parts.length;o++)s.parts[o](r.parts[o]);for(;o<r.parts.length;o++)s.parts.push(y(r.parts[o],t))}else{var a=[];for(o=0;o<r.parts.length;o++)a.push(y(r.parts[o],t));i[r.id]={id:r.id,refs:1,parts:a}}}}function m(e,t){for(var n=[],r={},s=0;s<e.length;s++){var i=e[s],o=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[o]?r[o].parts.push(a):n.push(r[o]={id:o,parts:[a]})}return n}function h(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var s=a(e.insertAt.before,n);n.insertBefore(t,s)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function v(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return b(t,e.attrs),h(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,s,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var o=u++;n=l||(l=v(t)),r=_.bind(null,n,o,!1),s=_.bind(null,n,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,s=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&s;(t.convertToAbsoluteUrls||i)&&(r=d(r));s&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var o=new Blob([r],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}.bind(null,n,t),s=function(){p(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),s=function(){p(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else s()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=m(e,t);return f(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var o=n[s];(a=i[o.id]).refs--,r.push(a)}e&&f(m(e,t),t);for(s=0;s<r.length;s++){var a;if(0===(a=r[s]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete i[a.id]}}}};var E,g=(E=[],function(e,t){return E[e]=t,E.filter(Boolean).join("\n")});function _(e,t,n,r){var s=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=g(t,s);else{var i=document.createTextNode(s),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var s,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(s=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(s)+")")})}}]);