(this["webpackJsonp3-chat-app"]=this["webpackJsonp3-chat-app"]||[]).push([[0],{35:function(e,s,t){"use strict";t.r(s);var a=t(12),n=t(34),c=t(14),o=t(32),g=t.n(o),l=t(33),u=t(5),j=Object(l.io)(),i=function(){var e=Object(c.useState)({msgValue:"",messages:""}),s=Object(n.a)(e,2),t=s[0],o=s[1];j.on("connection",(function(){console.log("connected")})),j.on("message",(function(e){console.log("data",e),o(Object(a.a)(Object(a.a)({},t),{},{messages:t.messages+"\n"+e.message}))}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"chat app"}),Object(u.jsx)("textarea",{value:t.messages,style:{width:"500px",height:"500px"},readOnly:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{onChange:function(e){o(Object(a.a)(Object(a.a)({},t),{},{msgValue:e.target.value}))},value:t.msgValue,type:"text",placeholder:"message text"}),Object(u.jsx)("button",{onClick:function(){j.emit("message",{message:t.msgValue}),o({messages:t.messages+"\n"+t.msgValue,msgValue:""})},children:"send"})]})};g.a.render(Object(u.jsx)(i,{}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.dbe7f32e.chunk.js.map