(function(e){function t(t){for(var r,o,i=t[0],c=t[1],s=t[2],l=0,f=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(u,o)&&u[o]&&f.push(u[o][0]),u[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(f.length)f.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==u[i]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},u={app:0},a=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d207425":"cd60f290","chunk-2d22996d":"b705c90e","chunk-4ace51d2":"34fe8d45","chunk-4fe4512f":"36961045"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-4ace51d2":1,"chunk-4fe4512f":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d207425":"31d6cfe0","chunk-2d22996d":"31d6cfe0","chunk-4ace51d2":"b8258ecb","chunk-4fe4512f":"613313dc"}[e]+".css",u=c.p+r,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var s=a[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],l=s.getAttribute("data-href");if(l===r||l===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||u,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),n(a)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=a);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"min-h-screen max-w-screen-lg m-auto",attrs:{id:"app"}},[n("prompt"),n("router-view")],1)},u=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isVisible?n("div",{staticClass:"absolute top-4 right-4 z-10 px-10 py-4 border",class:["error"===e.type&&"border-red-600 text-red-600 bg-red-200","success"===e.type&&"border-green-600 text-green-600 bg-green-200"]},[n("h1",[e._v(e._s(e.msg))])]):e._e()},i=[],c={name:"Prompt",data:function(){return{isVisible:!1,msg:"Message",type:"error",time:5e3}},watch:{isVisible:function(e){var t=this;e&&setTimeout((function(){t.isVisible=!1}),this.time)}},mounted:function(){this.$root.$on("showPrompt",this.showPrompt)},methods:{showPrompt:function(e){this.msg=e.msg,this.type=e.type||"error",this.isVisible=!0}}},s=c,l=n("2877"),f=Object(l["a"])(s,a,i,!1,null,null,null),d=f.exports,p={components:{Prompt:d}},h=p,m=(n("034f"),Object(l["a"])(h,o,u,!1,null,null,null)),b=m.exports,g=n("8c4f"),v=n("ed08");r["a"].use(g["a"]);var y=new g["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:function(){return n.e("chunk-4ace51d2").then(n.bind(null,"bb51"))},meta:{walletRequired:!0}},{path:"/transactions",name:"transactions",component:function(){return n.e("chunk-4fe4512f").then(n.bind(null,"0d43"))},meta:{walletRequired:!0}},{path:"/wallet-signin",name:"profile-wallet",component:function(){return n.e("chunk-2d207425").then(n.bind(null,"a088"))},meta:{walletRequired:!1}},{path:"/error-404",name:"error",component:function(){return n.e("chunk-2d22996d").then(n.bind(null,"dda8"))}},{path:"*",redirect:"/error-404"}]});y.beforeEach((function(e,t,n){var r=Object(v["b"])("walletId");if(!0!==e.meta.walletRequired)return!1===e.meta.walletRequired?(r&&y.push(y.currentRoute.query.to||"/"),n()):n();r?n():y.push({name:"profile-wallet",query:{to:e.path}})}));var w=y;n("ba8c");r["a"].config.productionTip=!1,new r["a"]({router:w,render:function(e){return e(b)}}).$mount("#app")},"85ec":function(e,t,n){},ba8c:function(e,t,n){},ed08:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return s}));var r=function(e){var t=localStorage.getItem(e);return!!t&&JSON.parse(t)},o=function(e,t){return localStorage.setItem(e,JSON.stringify(t))},u=function(e){return localStorage.removeItem(e)},a=n("bc3a"),i=n.n(a),c="/api",s=i.a.create({baseURL:c}),l=function(e){return e?new Date(e).toString():"-"}}});
//# sourceMappingURL=app.aa969498.js.map