"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[128],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),h=a,g=u["".concat(c,".").concat(h)]||u[h]||d[h]||o;return n?r.createElement(g,i(i({ref:t},l),{},{components:n})):r.createElement(g,i({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8495:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1,slug:"/"},i="Introduction",s={unversionedId:"introduction",id:"introduction",title:"Introduction",description:"npm version Test Downloads",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/",permalink:"/payload-dependency-graph/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/"},sidebar:"docs",next:{title:"Getting Started",permalink:"/payload-dependency-graph/getting-started"}},c={},p=[{value:"Use Cases",id:"use-cases",level:2}],l={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://badge.fury.io/js/payload-dependency-graph"},(0,a.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/payload-dependency-graph.svg",alt:"npm version"}))," ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml"},(0,a.kt)("img",{parentName:"a",src:"https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml/badge.svg",alt:"Test"}))," ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/payload-dependency-graph"},(0,a.kt)("img",{parentName:"a",src:"http://img.shields.io/npm/dw/payload-dependency-graph.svg",alt:"Downloads"}))),(0,a.kt)("p",null,"This plugin creates a dependency graph between collections and globals. The graph updates automatically, because the plugin observes the changes made on any collection or globals."),(0,a.kt)("h2",{id:"use-cases"},"Use Cases"),(0,a.kt)("p",null,"The plugin is useful when it comes to cached content or relationship-based changes."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"You're caching a static page that uses nested relationship fields. If the page has fields with blocks, and these blocks are recursive and have their own relationship fields, it can be difficult to know which cache needs to be purged. For this situation, the plugin is perfect for knowing which resource is dependent on whom."),(0,a.kt)("li",{parentName:"ul"},"You're caching the API responses that contain a depth greater than 0. You can purge that cache for that specific resource when its dependencies change.")))}d.isMDXComponent=!0}}]);