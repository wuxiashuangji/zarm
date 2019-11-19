(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{388:function(n,e,t){"use strict";t.r(e),t.d(e,"default",function(){return h});var o=t(7),r=t.n(o),l=t(8),c=t.n(l),i=t(9),a=t.n(i),s=t(27),u=t.n(s),p=t(10),d=t.n(p),m=t(48),g=t.n(m),h=function(n){function e(){var n,o;r()(this,e);for(var l=arguments.length,i=new Array(l),s=0;s<l;s++)i[s]=arguments[s];return o=c()(this,(n=a()(e)).call.apply(n,[this].concat(i))),g()(u()(o),"document",function(){return{document:t(657),className:"swipe-action-page"}}),o}return d()(e,n),e}(t(610).a)},610:function(n,e,t){"use strict";t.d(e,"a",function(){return w});var o=t(7),r=t.n(o),l=t(11),c=t.n(l),i=t(8),a=t.n(i),s=t(9),u=t.n(s),p=t(10),d=t.n(p),m=t(0),g=t.n(m),h=t(613),f=t.n(h),C=t(614),v=t.n(C),w=(t(615),t(611),function(n){function e(){return r()(this,e),a()(this,u()(e).apply(this,arguments))}return d()(e,n),c()(e,[{key:"render",value:function(){var n=this.document(localStorage.getItem("LANGUAGE")||"zh-CN"),e=n.document,t=n.className;if("string"==typeof e){var o=new f.a.Renderer;o.table=function(n,e){return'<div class="grid-container"><table class="grid"><thead>'.concat(n,"</thead><tbody>").concat(e,"</tbody></table></div>")},o.code=function(n,e){var t=!(!e||!v.a.getLanguage(e))?v.a.highlight(e,n).value:n;return'<pre><code class="hljs '.concat(e,'">').concat(t,"</code></pre>")};var r=f()(e,{renderer:o});return g.a.createElement("div",{className:t,dangerouslySetInnerHTML:{__html:r}})}return g.a.createElement("span",null)}}]),e}(m.Component))},611:function(n,e,t){},657:function(n,e){n.exports='# 滑动操作 SwipeAction\n\n\n\n## 基本用法\n```jsx\nimport { SwipeAction, Button, Cell } from \'zarm\';\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <SwipeAction\n          right={[\n            <Button size="lg" shape="rect" theme="primary" onClick={() => console.log(\'右按钮1\')}>右按钮1</Button>,\n            <Button size="lg" shape="rect" theme="danger" onClick={() => console.log(\'右按钮2\')}>右按钮2</Button>,\n          ]}\n        >\n          <Cell>左滑看看</Cell>\n        </SwipeAction>\n\n        <SwipeAction\n          left={[\n            <Button size="lg" shape="rect" theme="primary" onClick={() => console.log(\'左按钮1\')}>左按钮1</Button>,\n            <Button size="lg" shape="rect" theme="danger" onClick={() => console.log(\'左按钮2\')}>左按钮2</Button>,\n          ]}\n        >\n          <Cell>右滑看看</Cell>\n        </SwipeAction>\n\n        <SwipeAction\n          autoClose\n          left={[\n            <Button size="lg" shape="rect" theme="primary" onClick={() => console.log(\'左按钮1\')}>左按钮1</Button>,\n            <Button size="lg" shape="rect" theme="danger" onClick={() => console.log(\'左按钮2\')}>左按钮2</Button>,\n          ]}\n          right={[\n            <Button size="lg" shape="rect" theme="danger" onClick={() => console.log(\'右按钮1\')}>右按钮2</Button>,\n          ]}\n          onOpen={() => console.log(\'open\')}\n          onClose={() => console.log(\'close\')}\n        >\n          <Cell>左右都能滑动（自动关闭）</Cell>\n        </SwipeAction>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| :--- | :--- | :--- | :--- |\n| left | object[] | [] | 左侧按钮组 |\n| right | object[] | [] | 右侧按钮组 |\n| moveDistanceRatio | number | 0.5 | 移动距离比例临界点 |\n| moveTimeSpan | number | 300 | 移动时间跨度临界点 |\n| animationDuration | number | 300 | 动画执行时间，单位：毫秒 |\n| offset | number | 10 | 回弹偏移的距离 |\n| autoClose | boolean | true | 点击按钮后是否自动关闭 | \n| disabled | boolean | false | 是否允许滑动 |\n| onOpen | () => void | - | 滑开时触发的回调函数 |\n| onClose | () => void | - | 关闭时触发的回调函数 |\n'}}]);