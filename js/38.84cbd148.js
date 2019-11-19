(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{390:function(n,e,a){"use strict";a.r(e),a.d(e,"default",function(){return P});var t=a(7),s=a.n(t),o=a(8),l=a.n(o),i=a(9),r=a.n(i),c=a(27),d=a.n(c),m=a(10),u=a.n(m),v=a(48),b=a.n(v),P=function(n){function e(){var n,t;s()(this,e);for(var o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];return t=l()(this,(n=r()(e)).call.apply(n,[this].concat(i))),b()(d()(t),"document",function(){return{document:a(659),className:"tabs-page"}}),t}return u()(e,n),e}(a(610).a)},610:function(n,e,a){"use strict";a.d(e,"a",function(){return T});var t=a(7),s=a.n(t),o=a(11),l=a.n(o),i=a(8),r=a.n(i),c=a(9),d=a.n(c),m=a(10),u=a.n(m),v=a(0),b=a.n(v),P=a(613),f=a.n(P),p=a(614),N=a.n(p),T=(a(615),a(611),function(n){function e(){return s()(this,e),r()(this,d()(e).apply(this,arguments))}return u()(e,n),l()(e,[{key:"render",value:function(){var n=this.document(localStorage.getItem("LANGUAGE")||"zh-CN"),e=n.document,a=n.className;if("string"==typeof e){var t=new f.a.Renderer;t.table=function(n,e){return'<div class="grid-container"><table class="grid"><thead>'.concat(n,"</thead><tbody>").concat(e,"</tbody></table></div>")},t.code=function(n,e){var a=!(!e||!N.a.getLanguage(e))?N.a.highlight(e,n).value:n;return'<pre><code class="hljs '.concat(e,'">').concat(a,"</code></pre>")};var s=f()(e,{renderer:t});return b.a.createElement("div",{className:a,dangerouslySetInnerHTML:{__html:s}})}return b.a.createElement("span",null)}}]),e}(v.Component))},611:function(n,e,a){},659:function(n,e){n.exports='# 标签页 Tabs\n\n\n\n## 基本用法\n```jsx\nimport { Tabs } from \'zarm\';\nconst { Panel } = Tabs;\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <Tabs onChange={(i) => { console.log(i); }}>\n          <Panel title="选项卡1">\n            <div className="content">选项卡1内容</div>\n          </Panel>\n          <Panel title="选项卡2">\n            <div className="content">选项卡2内容</div>\n          </Panel>\n        </Tabs>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## 可滑动\n```jsx\nimport { Tabs } from \'zarm\';\nconst { Panel } = Tabs;\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <Tabs canSwipe onChange={(i) => { console.log(i); }}>\n          <Panel title="选项卡1">\n            <div className="content">试试点我左滑</div>\n          </Panel>\n          <Panel title="选项卡2">\n            <div className="content">试试点我右滑</div>\n          </Panel>\n        </Tabs>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## 指定默认选项\n```jsx\nimport { Tabs } from \'zarm\';\nconst { Panel } = Tabs;\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <Tabs defaultValue={1}>\n          <Panel title="选项卡1">\n            <div className="content">选项卡1内容</div>\n          </Panel>\n          <Panel title="选项卡2">\n            <div className="content">选项卡2内容</div>\n          </Panel>\n          <Panel title="选项卡3">\n            <div className="content">选项卡3内容</div>\n          </Panel>\n        </Tabs>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## 指定线条宽度\n```jsx\nimport { Tabs } from \'zarm\';\nconst { Panel } = Tabs;\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <Tabs lineWidth={60}>\n          <Panel title="选项卡1">\n            <div className="content">选项卡1内容</div>\n          </Panel>\n          <Panel title="选项卡2">\n            <div className="content">选项卡2内容</div>\n          </Panel>\n          <Panel title="选项卡3">\n            <div className="content">选项卡3内容</div>\n          </Panel>\n        </Tabs>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## 禁用指定选项\n```jsx\nimport { Tabs } from \'zarm\';\nconst { Panel } = Tabs;\n\nclass Demo extends React.Component {\n  render() {\n    return (\n      <div>\n        <Tabs>\n          <Panel title="选项卡1">\n            <div className="content">选项卡1内容</div>\n          </Panel>\n          <Panel title="选项卡2" disabled>\n            <div className="content">选项卡2内容</div>\n          </Panel>\n          <Panel title="选项卡3">\n            <div className="content">选项卡3内容</div>\n          </Panel>\n        </Tabs>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## API\n\n### Tabs\n| 属性 | 类型 | 默认值 | 说明 |\n| :--- | :--- | :--- | :--- |\n| value | string | - | 值 |\n| defaultValue | string | - | 初始值 |\n| disabled | boolean | false | 是否禁用 |\n| canSwipe | boolean | false | 是否支持滑动切换 |\n| lineWidth | number \\| string | - | 线条宽度 |\n| onChange | (index?: number) => void | - | 值变化时触发的回调函数 |\n\n\n### Panel\n| 属性 | 类型 | 默认值 | 说明 |\n| :--- | :--- | :--- | :--- |\n| disabled | boolean | false | 是否禁用 |\n| title | string | - | 标题 |\n'}}]);