(this["webpackJsonpmusic-app"]=this["webpackJsonpmusic-app"]||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var A,c,r,i=n(7),a=n.n(i),o=n(8),s=n(2),u=n.n(s),l=n(14),d=n.n(l),f=n(9),g=n(6),j=(n(39),n(3)),h=n(4),v=(n(40),n(1)),b=function(e){var t=e.icon,n=e.message,A=void 0===n?"Nothing found":n,c=e.description,r=void 0===c?"Please do something to remove this":c;return Object(v.jsxs)("div",{className:"empty",children:[Object(v.jsx)("div",{className:"empty__img",children:t||Object(v.jsx)(h.c,{size:120})}),Object(v.jsx)("div",{className:"empty__message",children:A}),Object(v.jsx)("div",{className:"empty__description",children:r})]})},p=(n(42),function(e){var t=e.size,n=void 0===t?48:t,A=e.active,c=e.onClick,r=e.children;return Object(v.jsx)("button",{style:{"--button-size":"".concat(n,"px")},className:"button__wrapper ".concat(A?"button__wrapper--active":""),onClick:function(){return c&&c()},children:Object(v.jsx)("div",{className:"button__content",children:r})})}),O=function(e){return e?new Date(1e3*e).toISOString().substr(14,5):""},x=(n(43),0),m=function(e){var t=e.value,n=void 0===t?0:t,A=e.size,c=void 0===A?240:A,r=e.children,i=e.audio,a=e.onChange,o=e.onTouch,u=e.onTouchEnd,l="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,d=Object(s.useRef)(null),f=Object(s.useRef)(null),g=Object(s.useRef)(null),h=Object(s.useState)(!1),b=Object(j.a)(h,2),p=b[0],m=b[1],w=function(e){e.preventDefault(),o&&o(),m(!0)},y=function(e){e.preventDefault(),u&&u(),m(!1)},_=function(e){if(p){var t=function(e){var t={x:0,y:0};if("touchstart"===e.type||"touchmove"===e.type||"touchend"===e.type||"touchcancel"===e.type){var n=e.changedTouches[0];t.x=n.pageX,t.y=n.pageY}else"mousedown"!==e.type&&"mouseup"!==e.type&&"mousemove"!==e.type&&"mouseover"!==e.type&&"mouseout"!==e.type&&"mouseenter"!==e.type&&"mouseleave"!==e.type||(t.x=e.pageX,t.y=e.pageY);return t}(e),n=f.current.getBoundingClientRect(),A=document.body.getBoundingClientRect(),c=t.x-(n.x-A.x),r=t.y-(n.y-A.y),i=n.width/2,o=Math.atan2(c-i,r-i),s=Math.ceil(-o/(Math.PI/180)+180),u=s;x<=90&&(u=90),x>=270&&(u=270);var l=E(u);a&&a(l),x=s}},E=function(e){return Math.abs(150-Math.ceil(100*e/180))};return Object(s.useLayoutEffect)((function(){var e;!function(e){var t=c/2,n=d.current,A=g.current,r=c/10*.5,i=Math.floor((t-r/2)*Math.sin(e*Math.PI/180))+t,a=Math.floor((t-r/2)*-Math.cos(e*Math.PI/180))+t;A.style.transform="rotate(".concat(e-270,"deg)"),n.style.transform="translate(".concat(i-r,"px, ").concat(a-r,"px)")}((e=n,Math.abs(Math.ceil(e/100*180)-270)))})),Object(v.jsxs)("div",{ref:f,className:"slider",onMouseUp:function(e){return!l&&y(e)},onTouchEnd:function(e){return l&&y(e)},onMouseMove:function(e){return!l&&_(e)},onTouchMove:function(e){return l&&_(e)},onMouseDown:function(e){return!l&&w(e)},onTouchStart:function(e){return l&&w(e)},style:{"--size":"".concat(c,"px"),"--dial-size":"".concat(c/10,"px")},children:[Object(v.jsx)("input",{type:"range",min:"0",max:"100",className:"slider__range"}),Object(v.jsx)("div",{className:"slider__track",children:Object(v.jsx)("div",{className:"slider__blocker",ref:g})}),Object(v.jsx)("div",{className:"slider__info",children:r}),Object(v.jsx)("div",{className:"slider__dial",tabIndex:0,ref:d}),Object(v.jsx)("div",{className:"slider__start"}),Object(v.jsx)("div",{className:"slider__end"}),Object(v.jsx)("div",{className:"slider__currtime",children:i&&i.currentTime?O(i.currentTime):""}),Object(v.jsx)("div",{className:"slider__totaltime",children:i&&i.duration?O(i.duration):""})]})},w=(n(44),function(e){var t=e.size,n=void 0===t?24:t,A=e.title,c=void 0===A?"":A,r=e.leftIcon,i=e.rightIcon,a=e.onLeftIconClick,o=e.onRightIconClick;return Object(v.jsxs)("div",{className:"header",children:[null!==r&&Object(v.jsx)("div",{className:"header__menu__left",children:Object(v.jsx)("div",{className:"header__icon",onClick:function(){return a&&a()},children:r||Object(v.jsx)(h.b,{size:n})})}),null!==r&&Object(v.jsx)("div",{className:"header__spacer"}),Object(v.jsx)("div",{className:"header__title",children:c}),Object(v.jsx)("div",{className:"header__spacer"}),null!==i&&Object(v.jsx)("div",{className:"header__menu__right",children:Object(v.jsx)("div",{className:"header__icon",onClick:function(){return o&&o()},children:i||Object(v.jsx)(h.f,{size:n})})}),null===i&&Object(v.jsx)("div",{style:{width:64}})]})}),y=function(e){var t=e.audio,n=e.playing,i=e.onError,a=e.short,o=void 0===a?2:a,u=e.width,l=void 0===u?400:u,d=e.app,f=void 0!==d&&d,j=e.className,h=void 0===j?"":j,b=Object(g.c)((function(e){return e.app})).view,p=Object(g.c)((function(e){return e.settings})),O=Object(s.useRef)(null);return Object(s.useLayoutEffect)((function(){var e=function(){r&&(cancelAnimationFrame(r),r=void 0)};if(t){var a=p.light?"#EDEEF4":"#191C2D",s=p.light?"#BBBED9":"#36395E";n?function(e){try{var n=O.current.getContext("2d");void 0===A&&(A=new AudioContext);var a=A.createAnalyser();a.fftSize=2048,void 0===c&&(c=A.createMediaElementSource(t)),c.connect(a),c.connect(A.destination);var s=700,u=300;a.fftSize=2048;var l=a.frequencyBinCount,d=new Uint8Array(l);n.clearRect(0,0,s,u);var f=function(){var e=function(){return 255*Math.random()};return"rgb(".concat(e(),",").concat(e(),",").concat(e(),")")},g=function(){r=void 0,j(),h()},j=function(){r||(r=requestAnimationFrame(g))},h=function(){a.getByteTimeDomainData(d),n.fillStyle=null!==e&&void 0!==e?e:"#36395E",n.fillRect(0,0,s,u),n.lineWidth=2,n.beginPath();for(var t=700/l,A=0,c=0;c<l;c++){var r=d[c]/128*u/o;n.strokeStyle=f(),0===c?n.moveTo(A,r):n.lineTo(A,r),A+=t}n.lineTo(s,150),n.stroke()};j()}catch(v){i&&i(v)}}(f?a:s):e()}return function(){return e()}}),[t,n,p.light,f,b]),Object(v.jsx)("canvas",{style:{visibility:n?"visible":"hidden"},height:300,width:l>700?700:l,className:h,ref:O})},_=function(){var e=Object(s.useState)({width:void 0,height:void 0}),t=Object(j.a)(e,2),n=t[0],A=t[1],c=Object(s.useState)(null),r=Object(j.a)(c,2),i=r[0],a=r[1],o=Object(s.useRef)(null),u=Object(s.useCallback)((function(){var e=o.current;e&&e.disconnect()}),[]),l=Object(s.useCallback)((function(){o.current=new ResizeObserver((function(e){var t=Object(j.a)(e,1)[0].contentRect,n=t.width,c=t.height;return A({width:n,height:c})})),i&&o.current.observe(i)}),[i]);return Object(s.useLayoutEffect)((function(){return l(),function(){return u()}}),[l,u]),Object(s.useMemo)((function(){return[a,n]}),[a,n])},E=n(5),B=n(16),D=function(e){var t=Object(s.useState)({}),n=Object(j.a)(t,2),A=n[0],c=n[1];return Object(s.useEffect)((function(){Object(o.a)(a.a.mark((function t(){var n,A;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={},A=e.map((function(e){var t=document.createElement("audio");return t.src=URL.createObjectURL(e),new Promise((function(n){t.addEventListener("loadedmetadata",(function(){n(Object(B.a)({},e.name,t.duration))}),!1)}))})),t.next=4,Promise.all(A);case 4:t.sent.forEach((function(e){n=Object(E.a)(Object(E.a)({},n),e)})),c((function(){return n}));case 7:case"end":return t.stop()}}),t)})))()}),[e]),A},C="ADD_SONGS",Q="REMOVE_SONGS",N="PLAY_SONG",I="PAUSE_SONG",k="RESUME_SONG",P="SET_GRID",S="SET_THEME",M="SET_REPEAT",z="SET_VISUALIZER",H="SET_VIEW",Y=n(22),T=function(e){return{type:N,index:e}},G=function(e){return{type:H,value:e}},R=Object(f.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{view:"home"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case H:return Object(E.a)(Object(E.a)({},e),{},{view:t.value});default:return e}},songs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:return[].concat(Object(Y.a)(e),Object(Y.a)(t.songs)).filter((function(e,t,n){return n.findIndex((function(t){return t.name===e.name}))===t}));case Q:return e.filter((function(e,n){return n!==t.index}));default:return e}},settings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{visualizer:!0,repeat:"all",light:!0,grid:!0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case P:return Object(E.a)(Object(E.a)({},e),{},{grid:t.value});case M:return Object(E.a)(Object(E.a)({},e),{},{repeat:t.value});case S:return Object(E.a)(Object(E.a)({},e),{},{light:t.value});case z:return Object(E.a)(Object(E.a)({},e),{},{visualizer:t.value});default:return Object(E.a)({},e)}},playState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{playing:!1,index:-1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return{playing:!0,index:t.index};case I:return Object(E.a)(Object(E.a)({},e),{},{playing:!1});case k:return Object(E.a)(Object(E.a)({},e),{},{playing:!0});default:return e}}}),L=n(10),U=n(26),F=window.navigator,W="mediaSession"in navigator,V=function(){function e(){Object(L.a)(this,e)}return Object(U.a)(e,null,[{key:"updatePositionState",value:function(e){F.mediaSession.setPositionState({duration:e.duration,position:e.currentTime,playbackRate:e.playbackRate})}}]),e}();V.addNewSong=function(){var e=Object(o.a)(a.a.mark((function e(t,n){var A,c,r,i,o,s,u,l,d,f,g,j;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!W){e.next=14;break}return c=n.next,r=n.prev,i=n.play,o=n.pause,e.next=5,V.getMetadata(t);case 5:s=e.sent,u=null!==(A=s.tags)&&void 0!==A?A:{},l=u.title,d=u.year,f=u.artist,g=u.album,j=V.getPicture(s),F.mediaSession.metadata=new window.MediaMetadata({title:null!==l&&void 0!==l?l:t.name,artist:null!==f&&void 0!==f?f:"Unknown",album:null!==g&&void 0!==g?g:"Unknown",year:d,artwork:[{src:j,sizes:"96x96",type:"image/png"},{src:j,sizes:"128x128",type:"image/png"},{src:j,sizes:"192x192",type:"image/png"},{src:j,sizes:"256x256",type:"image/png"},{src:j,sizes:"384x384",type:"image/png"},{src:j,sizes:"512x512",type:"image/png"}]}),F.mediaSession.setActionHandler("previoustrack",r),F.mediaSession.setActionHandler("nexttrack",c),F.mediaSession.setActionHandler("play",i),F.mediaSession.setActionHandler("pause",o),F.mediaSession.setActionHandler("stop",o);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.error(e.t0.message);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t,n){return e.apply(this,arguments)}}(),V.getMetadata=function(e){return new Promise((function(t){window.jsmediatags.read(e,{onSuccess:function(e){t(e)},onError:function(e){console.log(e),t({})}})}))},V.getPicture=function(e){if(null!==e){var t,n=(null!==(t=e.tags)&&void 0!==t?t:{}).picture,A=(n=void 0===n?{}:n).data,c=void 0===A?void 0:A,r=n.format,i=void 0===r?void 0:r;if(c&&i){var a=new Uint8Array(c).reduce((function(e,t){return e+String.fromCharCode(t)}),""),o=btoa(a);return"data:".concat(i,";base64,").concat(o)}}return"data:image/png;base64,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"};n(45);var J=function(e){var t=e.onChange,n=e.type,A=void 0===n?"text":n,c=e.placeholder,r=void 0===c?"Search...":c,i=Object(s.useState)(!1),a=Object(j.a)(i,2),o=a[0],u=a[1];return Object(v.jsxs)("div",{className:"input__wrapper ".concat(o?"input__wrapper--focus":"").trim(),children:[Object(v.jsx)("input",{type:A,placeholder:r,onFocus:function(){return u(!0)},onBlur:function(){return u(!1)},onChange:function(e){return t&&t(e.target.value)}}),Object(v.jsx)("div",{className:"input__icon",children:Object(v.jsx)(h.g,{size:24})})]})},K=(n(46),function(e){var t=e.onSearch,n=e.showSearch,A=e.playlist;return Object(v.jsxs)("div",{className:"home",children:[n&&Object(v.jsx)("div",{className:"home__input",children:Object(v.jsx)(J,{type:"search",placeholder:"Search",onChange:function(e){return t&&t(e)}})}),A]})}),X=n(21),q=(n(47),function(e){var t=e.show,n=e.onClose,A=Object(g.b)(),c=Object(g.c)((function(e){return e.settings})),r=[{id:1,key:"grid",name:"Grid style song list",onClick:function(){return A((e=!c.grid,{type:P,value:e}));var e}},{id:2,key:"visualizer",name:"Show visualizer",onClick:function(){return A((e=!c.visualizer,{type:z,value:e}));var e}},{id:3,key:"light",name:"Light theme",onClick:function(){return A((e=!c.light,{type:S,value:e}));var e}}];return Object(v.jsxs)("div",{className:"menu ".concat(t?"menu--show":"").trim(),children:[Object(v.jsx)(w,{title:"Settings",leftIcon:null,rightIcon:Object(v.jsx)("div",{style:{transform:"rotate(45deg) translateY(2px)"},children:Object(v.jsx)(h.f,{size:24})}),onRightIconClick:function(){return n&&n()}}),Object(v.jsx)("div",{className:"menu__content",children:r.map((function(e){var t=e.id,n=e.key,A=e.name,r=e.onClick;return Object(v.jsxs)("div",{title:A,onClick:function(){return r()},className:"menu__item",children:[Object(v.jsx)("div",{className:"menu__item__name",children:A}),Object(v.jsx)("div",{className:"menu__item--spacer",children:" "}),c[n]?Object(v.jsx)(X.a,{size:24}):Object(v.jsx)(X.b,{size:24})]},t)}))})]})}),Z=n(12),$=n(17),ee=(n(48),window.navigator),te="vibrate"in navigator,ne=function e(){Object(L.a)(this,e)};ne.do=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return!!te&&(ee.vibrate([]),ee.vibrate([e]))};var Ae=function(e){var t,n,A=e.song,c=e.size,r=e.range,i=e.audio,u=e.playing,l=e.onNext,d=e.onPrev,f=e.onPlay,b=e.onError,O=e.onPause,x=e.onChange,w=e.onShuffle,_=Object(g.c)((function(e){return e.settings})),E=Object(s.useState)(null),B=Object(j.a)(E,2),D=B[0],C=B[1],Q=Object(s.useState)({scroll:"100%",client:"100%"}),N=Object(j.a)(Q,2),I=N[0],k=N[1],P=Object(s.useRef)(null),S=Object(g.b)(),z=_.light?"black":"white",H=(D||{}).tags,Y=void 0===H?{}:H,T=null!==(t=Y.title)&&void 0!==t?t:function(e){var t="No title";return e&&e.name&&(t=e.name),t.split(".")[0]}(A),G=null!==(n=Y.artist)&&void 0!==n?n:"Unknown Artist",R=V.getPicture(D),L=function(){var e,t;S((t=null!==(e={all:"one",one:"none",none:"all"}[_.repeat])&&void 0!==e?e:"all",{type:M,value:t}))},U=function(e){ne.do(),e()};return Object(s.useLayoutEffect)((function(){null!==P.current&&k({scroll:P.current.scrollWidth,client:P.current.clientWidth}),Object(o.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!A){e.next=5;break}return e.next=3,V.getMetadata(A);case 3:t=e.sent,C(t);case 5:case"end":return e.stop()}}),e)})))()}),[A,T]),Object(v.jsxs)("div",{className:"track",children:[Object(v.jsx)(m,{value:r,audio:i,onTouch:function(){return O&&O()},onTouchEnd:function(){return f&&f()},onChange:function(e){return x&&x(e)},children:Object(v.jsx)("div",{className:"track__slider__img",children:Object(v.jsx)("img",{alt:T,src:R})})}),Object(v.jsxs)("div",{className:"track__content",children:[Object(v.jsxs)("div",{className:"track__details",children:[Object(v.jsx)("h1",{ref:P,style:{"--scroll-width":"".concat(I.scroll,"px"),"--client-width":"".concat(I.client,"px")},className:I.scroll>I.client?"overflowed":"",children:T}),Object(v.jsx)("p",{children:G})]}),Object(v.jsxs)("div",{className:"track__controls",children:[Object(v.jsx)("div",{className:"track__controls__btn",onClick:function(){return U((function(){return w&&w()}))},children:Object(v.jsx)($.c,{size:24,color:z})}),Object(v.jsx)("div",{className:"track__controls__btn",onClick:function(){return U((function(){return d&&d()}))},children:Object(v.jsx)(Z.a,{size:28,color:z})}),Object(v.jsx)("div",{className:"track__controls__btn",children:Object(v.jsx)(p,{size:64,active:u,onClick:function(){return U((function(){return u?O&&O():f&&f()}))},children:u?Object(v.jsx)(h.d,{size:22}):Object(v.jsx)(h.e,{size:22})})}),Object(v.jsx)("div",{className:"track__controls__btn",onClick:function(){return U((function(){return l&&l()}))},children:Object(v.jsx)(Z.b,{size:28,color:z})}),Object(v.jsx)("div",{className:"track__controls__btn",onClick:function(){return U((function(){return L()}))},children:"one"===_.repeat?Object(v.jsx)($.b,{size:24,color:z}):Object(v.jsxs)(v.Fragment,{children:["none"===_.repeat&&Object(v.jsx)("div",{className:"track__controls__cross"}),Object(v.jsx)($.a,{size:24,color:z})]})})]})]}),_.visualizer&&Object(v.jsx)(y,{app:!0,audio:i,playing:u,width:c.width,className:"track__visualizer",onError:function(){return b&&b()}})]})},ce=(n(49),function(e){var t=e.songs,n=e.onClick,A=e.onDelete,c=e.grid,r=void 0!==c&&c,i=e.filteredSongs,a=e.playState,o=void 0===a?{}:a,s=o.index,u=o.playing,l=D(t),d=function(e){return l[e]?O(l[e]):""},f=function(e){return!!t[s]&&t[s].name.toLowerCase()===e.toLowerCase()},g=function(e){return t.findIndex((function(t){return t.name.toLowerCase()===e.toLowerCase()}))};return Object(v.jsx)("div",{className:"playlist ".concat(r?"playlist--grid":""," ").concat(s>-1?"playlist--bottom-padded":"").trim(),children:i.map((function(e,t){var c=e.name;return Object(v.jsxs)("div",{className:"playlist__item ".concat(f(c)?"playlist__item--selected":""),children:[r&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("div",{title:c,className:"playlist__name",children:c}),Object(v.jsx)("div",{className:"playlist__duration",children:d(c)})]}),Object(v.jsx)("div",{className:"playlist__icon",onClick:function(){return n&&n(g(c))},children:f(c)&&u?Object(v.jsx)(h.d,{size:18}):Object(v.jsx)(h.e,{size:18})}),!r&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("div",{title:c,className:"playlist__name",children:c}),Object(v.jsx)("div",{style:{flexGrow:1}}),Object(v.jsx)("div",{className:"playlist__duration",children:d(c)})]}),Object(v.jsx)("div",{className:"playlist__icon playlist__icon--right",onClick:function(){return A&&A(g(c))},children:Object(v.jsx)(h.h,{size:18})})]},t)}))})}),re=(n(50),function(e){var t=e.song,n=e.size,A=e.audio,c=e.onPlay,r=e.onPause,i=e.onClick,a=e.onError,o=e.percent,s=e.playing,u=e.open,l=void 0===u||u,d=e.width,f=void 0===d?300:d,j=Object(g.c)((function(e){return e.settings})),b=function(){var e="No title";return t&&t.name&&(e=t.name),e.split(".")[0]};return Object(v.jsx)("div",{className:"nowplaying ".concat(l?"nowplaying--open":"").trim(),children:Object(v.jsxs)("div",{style:{width:f},className:"nowplaying__container",children:[Object(v.jsxs)("div",{onClick:function(){return i&&i()},className:"nowplaying__title__wrapper",children:[Object(v.jsx)("div",{className:"nowplaying__icon",children:Object(v.jsx)(Z.c,{size:32})}),Object(v.jsx)("div",{title:b(),className:"nowplaying__title",children:b()})]}),Object(v.jsx)("div",{className:"nowplaying__button",children:Object(v.jsx)(p,{onClick:function(){return s?r&&r():c&&c()},children:s?Object(v.jsx)(h.d,{size:18}):Object(v.jsx)(h.e,{size:18})})}),Object(v.jsx)("div",{style:{width:"".concat(100-Number(o),"%")},className:"nowplaying__progress"}),Object(v.jsx)("div",{className:"nowplaying__progress__placeholder"}),Object(v.jsx)("div",{className:"nowplaying__visualizer",children:j.visualizer&&Object(v.jsx)(y,{short:10,audio:A,playing:s,width:n.width,onError:function(){return a&&a()}})})]})})});n(51);var ie=function(){var e=Object(s.useRef)({playing:!1,index:-1}),t=_(),n=Object(j.a)(t,2),A=n[0],c=n[1],r=Object(s.useRef)(null),i=Object(s.useRef)(null),u=Object(g.b)(),l=Object(g.c)((function(e){return e.app})).view,d=Object(g.c)((function(e){return e.songs})),f=Object(g.c)((function(e){return e.settings})),p=Object(g.c)((function(e){return e.playState})),O=Object(s.useState)(0),x=Object(j.a)(O,2),m=x[0],y=x[1],E=Object(s.useState)(!1),B=Object(j.a)(E,2),D=B[0],N=B[1],P=Object(s.useState)(""),S=Object(j.a)(P,2),M=S[0],z=S[1];Object(s.useMemo)((function(){return function(){var e={"--padding":"24px","--bg-color":"#191b2d","--bg-color-accent":"#35395f","--bg-color-accent-2":"#20233a","--bg-color-secondary":"#4a5085","--color-primary":"rgba(255, 255, 255, 1)","--color-secondary":"rgba(255, 255, 255, 0.78)","--color-disabled":"rgba(255, 255, 255, 0.46)","--color-dim":"rgba(255, 255, 255, 0.06)"},t={"--padding":"24px","--bg-color":"#edeef5","--bg-color-accent":"#bbbed9","--bg-color-accent-2":"#d4d6e7","--bg-color-secondary":"#c7cae0","--color-primary":"rgba(0, 0, 0, 1)","--color-secondary":"rgba(0, 0, 0, 0.86)","--color-disabled":"rgba(0, 0, 0, 0.56)","--color-dim":"rgba(53, 57, 95, 0.06)"},n=arguments.length>0&&void 0!==arguments[0]&&arguments[0]?t:e,A=document.querySelector(":root"),c=Object.keys(n);A&&n&&c.forEach((function(e){var t=n[e];t&&e.startsWith("--")&&A.style.setProperty(e,String(t))}))}(f.light)}),[f.light]);var H=Object(s.useCallback)((function(){return M?d.filter((function(e){return e.name.toLowerCase().includes(M.toLowerCase())})):d}),[M,d]),Y=function(){return!!d.length},R=function(){return i.current},L=function(){var e=Object(o.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!i.current){e.next=9;break}return e.prev=1,e.next=4,R().play();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.trace(e.t0);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(o.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!i.current||!d[t]){e.next=7;break}return(n=R()).src=URL.createObjectURL(d[t]),e.next=6,n.play();case 6:V.addNewSong(d[t],{next:function(){return F(!0)},prev:function(){return W(!0)},play:function(){return X()},pause:function(){return J()},stop:function(){return J()}});case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),u(T(0));case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(Y()){J();var t=function(){return u(T((p.index+1)%d.length))};setTimeout((function(){e?t():"one"===f.repeat?X():("all"===f.repeat||p.index+1!==d.length)&&t()}),100)}},W=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Y()&&(J(),setTimeout((function(){if("one"!==f.repeat||e){var t=p.index-1,n=t<0?d.length-1:t;u(T(n))}else X()}),100))},J=function(){Y()&&u({type:I})},X=function(){Y()&&u({type:k})},Z=function(e){e===p.index&&u(T(-2)),setTimeout((function(){u(function(e){return{type:Q,index:e}}(e))}),100)};return Object(s.useEffect)((function(){if(JSON.stringify(e.current)!==JSON.stringify(p)&&Y()){var t=p.playing,n=p.index,A=e.current.index;t?-1===n?u(T(0)):n===A?L():-2===n?R().src="":U(n):i.current&&R().pause()}e.current=p}),[p]),Object(v.jsx)("div",{ref:A,className:"app__wrapper",children:Object(v.jsxs)("div",{className:"app__container",children:["home"===l?Object(v.jsx)(w,{title:"playlist",onRightIconClick:function(){r.current&&r.current.click()},onLeftIconClick:function(){return N(!D)}}):Object(v.jsx)(w,{title:"Track",rightIcon:null,leftIcon:Object(v.jsx)("div",{style:{transform:"translateX(-2px)"},children:Object(v.jsx)(h.a,{size:24})}),onLeftIconClick:function(){return u(G("home"))}}),Object(v.jsx)(q,{show:D,onClose:function(){return N(!1)}}),"home"===l&&Object(v.jsx)(K,{showSearch:!0,onSearch:function(e){return z(e)},playlist:0===H().length?Object(v.jsx)(b,{message:"No songs found",description:M&&d.length>0?"To widen your search, change or remove keyword":"When you are ready, go ahead and add few songs"}):Object(v.jsx)(ce,{songs:d,grid:f.grid,playState:p,filteredSongs:H(),onDelete:function(e){return Z(e)},onClick:function(e){return e===p.index?p.playing?J():X():u(T(e))}})}),"track"===l&&Object(v.jsx)(Ae,{size:c,range:m,audio:R(),playing:p.playing,onPlay:function(){return X()},onPause:function(){return J()},onNext:function(){return F(!0)},onPrev:function(){return W(!0)},onShuffle:function(){Y()&&u(T(Math.floor(Math.random()*d.length)))},song:d[p.index],onChange:function(e){return function(e){var t=R().duration*(e/100);isNaN(t)||(R().currentTime=t)}(e)}}),Object(v.jsxs)("div",{className:"app__content",children:[Object(v.jsx)("input",{hidden:!0,multiple:!0,type:"file",ref:r,accept:"audio/mp3,audio/wav,audio/ogg",onChange:function(e){return u(function(e){return{type:C,songs:e}}(e.target.files))}}),Object(v.jsx)("audio",{hidden:!0,controls:!0,ref:i,onEnded:function(){Y()&&F()},onTimeUpdate:function(){return function(){var e=100*R().currentTime/R().duration||0;y(Math.round(e))}()}})]}),Object(v.jsx)(re,{size:c,percent:m,width:c.width,audio:R(),playing:p.playing,song:d[p.index],onPlay:function(){return X()},onPause:function(){return J()},onClick:function(){return u(G("track"))},open:"home"===l&&p.index>-1})]})})},ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,A=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),A(e),c(e),r(e),i(e)}))},oe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function se(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var ue=n(13),le=n.n(ue);le.a.config({name:"Music PWA",storeName:"db"});var de=function e(){Object(L.a)(this,e)};de.set=function(e,t,n){return le.a.setItem(e,t,n)},de.get=function(e,t){return le.a.getItem(e,t)},de.delete=function(e,t){return le.a.removeItem(e,t)};var fe=window;Object(o.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,de.get("state");case 3:null===(t=e.sent)&&(t=void 0),(n=Object(f.c)(R,t,fe.__REDUX_DEVTOOLS_EXTENSION__&&fe.__REDUX_DEVTOOLS_EXTENSION__())).subscribe((function(){de.set("state",{songs:n.getState().songs,settings:n.getState().settings})})),d.a.render(Object(v.jsx)(u.a.StrictMode,{children:Object(v.jsx)(g.a,{store:n,children:Object(v.jsx)(ie,{})})}),document.getElementById("root")),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))(),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");oe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var A=n.headers.get("content-type");404===n.status||null!=A&&-1===A.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):se(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):se(t,e)}))}}(),ae()}},[[52,1,2]]]);
//# sourceMappingURL=main.c6d69a58.chunk.js.map
