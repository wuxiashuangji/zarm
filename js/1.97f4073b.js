webpackJsonp([1],{332:function(e,n,t){"use strict";function a(){return k.map(function(e,n){return f.a.createElement("div",{className:"swipe-item-pic",key:+n},f.a.createElement("img",{src:e,alt:""}))})}Object.defineProperty(n,"__esModule",{value:!0});var l=t(87),c=t.n(l),o=t(88),r=t.n(o),i=t(89),m=t.n(i),u=t(90),s=t.n(u),p=t(91),E=t.n(p),d=t(5),f=t.n(d),g=t(338),w=t(341),h=t(339),y=t(340),b=t(590),k=(t.n(b),[t(591),t(592),t(593)]),v=function(e){function n(){return r()(this,n),s()(this,(n.__proto__||c()(n)).apply(this,arguments))}return E()(n,e),m()(n,[{key:"render",value:function(){var e=this;return f.a.createElement(g.a,{className:"swipe-page"},f.a.createElement(w.a,{title:"图片轮播 Swipe"}),f.a.createElement("main",null,f.a.createElement(y.n,null,f.a.createElement(y.n.Header,{title:"基本"}),f.a.createElement(y.n.Body,null,f.a.createElement(y.w,{onChangeEnd:function(e){console.log(e)}},a()))),f.a.createElement(y.n,null,f.a.createElement(y.n.Header,{title:"纵向"}),f.a.createElement(y.n.Body,null,f.a.createElement(y.w,{direction:"top",height:"48vw"},a()))),f.a.createElement(y.n,null,f.a.createElement(y.n.Header,{title:"循环轮播"}),f.a.createElement(y.n.Body,null,f.a.createElement(y.w,{ref:function(n){e.swipe=n},loop:!0,direction:"left",onChangeEnd:function(e){console.log(e)}},a()),f.a.createElement("div",{className:"controls"},f.a.createElement(y.d,{block:!0,size:"sm",onClick:function(){e.swipe.onJumpTo(0)}},"无动画切换指定页"),f.a.createElement(y.d,{block:!0,size:"sm",onClick:function(){e.swipe.onSlideTo(2)}},"滑动到指定页")))),f.a.createElement(y.n,null,f.a.createElement(y.n.Header,{title:"自动循环轮播"}),f.a.createElement(y.n.Body,null,f.a.createElement(y.w,{autoPlay:!0,loop:!0,direction:"left",onChangeEnd:function(e){console.log(e)}},a())))),f.a.createElement(h.a,null))}}]),n}(d.Component);n.default=v},590:function(e,n){},591:function(e,n,t){e.exports=t.p+"images/1.a3651992.png"},592:function(e,n,t){e.exports=t.p+"images/2.97af865c.png"},593:function(e,n,t){e.exports=t.p+"images/3.cbbc9abc.png"}});