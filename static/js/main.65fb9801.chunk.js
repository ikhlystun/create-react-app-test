(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(89)},44:function(e,t,a){},46:function(e,t,a){},48:function(e,t,a){},82:function(e,t,a){},84:function(e,t,a){},86:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),r=a(24),o=a(2),l=a(3),c=a(6),u=a(4),s=a(5),m=a(13),d=a(92),p=a(94),h=a(93),b=a(91),f=a(15),g=a.n(f),v=[{id:"2384723804",img:"https://thoughtcatalog.files.wordpress.com/2018/03/bluebackground.jpg?w=1140&h=760",date:"2016-06-09T15:03:23.000Z",title:"React Is Awesome!!!",type:"a",text:"React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. \n We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM."},{id:"28932918323",img:"https://ak8.picdn.net/shutterstock/videos/1290388/thumb/1.jpg",date:"2016-04-09T18:03:23.000Z",title:"Quis occaecat",type:"a",text:"Quis occaecat duis aliqua reprehenderit excepteur nisi deserunt excepteur elit magna. Magna cillum anim veniam deserunt voluptate occaecat irure fugiat laboris proident. Tempor do magna deserunt cillum laborum cillum ut.\n\nEst sunt cupidatat in deserunt sit aliqua duis. Mollit consequat duis aliquip occaecat pariatur non do eiusmod dolore amet deserunt ullamco. Ea minim tempor exercitation do tempor nostrud dolor minim veniam laboris commodo ex duis. Do nostrud voluptate ullamco consequat anim tempor voluptate incididunt aliqua tempor.\n\nIn irure quis nostrud do. Labore laboris irure culpa reprehenderit pariatur laboris in commodo culpa enim cillum magna. Magna ipsum pariatur sunt in reprehenderit ipsum duis officia voluptate adipisicing ad officia. Duis est sint mollit amet laborum magna non quis nulla ipsum in veniam sit. Amet velit consequat esse esse ea. Ipsum non do ut cillum in adipisicing labore non commodo do laborum sunt."},{id:"13213123",img:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/441870/72cd26e14b7fcba028206a06f10548c0d5174cfc.jpg",date:"2016-06-02T11:03:23.000Z",title:"Hello my new world",type:"b",text:"Culpa dolor deserunt veniam irure amet officia excepteur labore nisi labore ad labore laborum aute. Ea irure sit exercitation ex. Aliquip dolore duis ullamco labore qui. Et anim irure laborum quis ipsum. Adipisicing culpa est ea velit veniam dolor nisi. Sit cupidatat velit commodo eu.\n\nUt nulla ut irure cillum irure sint sunt cupidatat tempor laboris incididunt elit occaecat fugiat. Reprehenderit enim cupidatat consectetur pariatur ad pariatur consequat veniam do fugiat Lorem laborum do velit. Nulla aute magna magna nisi officia et. Aute adipisicing eu eiusmod tempor exercitation sint non enim laboris dolor adipisicing.\n\nEa do sint pariatur voluptate ad culpa irure. Cillum pariatur deserunt fugiat elit. Exercitation labore amet deserunt magna. Velit veniam aute officia aliqua ipsum veniam pariatur. Aliquip ullamco fugiat officia non sunt ad consequat ipsum est esse commodo reprehenderit. Ad quis consectetur est exercitation fugiat eiusmod. Laborum reprehenderit esse qui irure."},{id:"239439284",img:"https://i.ytimg.com/vi/x8mpMSw6Wy4/maxresdefault.jpg",date:"2016-06-08T19:03:23.000Z",title:"Lorem Ipsum dolor",type:"c",text:"Commodo laborum sit nostrud reprehenderit cupidatat officia laboris. Ipsum minim culpa in enim. Voluptate dolor ea irure nisi incididunt enim magna.\n\nCupidatat quis cillum velit culpa tempor esse irure nostrud ea consectetur officia fugiat irure qui. Enim quis officia do in. Velit veniam ipsum consequat aliqua duis voluptate. Minim nisi ex aute ad.\n\nNisi Lorem ex tempor adipisicing labore. Quis occaecat fugiat pariatur labore culpa cillum laboris. Labore occaecat ut laborum sit ex do sit. Deserunt consectetur elit aute laboris est deserunt officia ullamco sit laboris officia aliquip. Aliqua ut sunt nostrud voluptate excepteur quis incididunt Lorem ut."}],j=(a(44),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.match.params.id,t=v.find(function(t){return t.id===e});window.location.href;return n.a.createElement(i.Fragment,null,n.a.createElement(g.a,{meta:[]}),n.a.createElement("div",{className:"modal"},n.a.createElement("div",{className:"modal__inner"},t?n.a.createElement(i.Fragment,null,n.a.createElement("h2",{className:"modal__title"},t.title),n.a.createElement("div",{className:"modal__body"},n.a.createElement("img",{src:t.img,alt:t.title}))):n.a.createElement("div",null,"Not found"),n.a.createElement(b.a,{className:"modal__close",to:"/"},"X"))))}}]),t}(i.Component)),E=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.post;return n.a.createElement(b.a,{to:{pathname:"/share/".concat(e.id),state:{modal:!0}},className:"btn share-btn"},"Share")}}]),t}(i.Component),O=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isLiked,a=e.onButtonClick,i=t?"Unlike":"Like";return n.a.createElement("button",{className:"btn like-btn",onClick:a},i)}}]),t}(i.Component),k=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.post,a=e.isLiked,i=e.onButtonClick;return n.a.createElement("div",{className:"buttons-group"},n.a.createElement(O,{isLiked:a,onButtonClick:i}),n.a.createElement(E,{post:t}))}}]),t}(i.Component),y=(a(46),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLiked:!1},a.handleClickIsLiked=a.handleClickIsLiked.bind(Object(m.a)(Object(m.a)(a))),a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"handleClickIsLiked",value:function(e){this.setState(function(e){return{isLiked:!e.isLiked}})}},{key:"render",value:function(){var e=this.props.post;return n.a.createElement("div",{className:"post"},n.a.createElement(b.a,{className:"post__body",to:{pathname:"/modal/".concat(e.id),state:{modal:!0}}},n.a.createElement("img",{src:e.img,alt:e.title})),n.a.createElement("div",{className:"post__bottom"},n.a.createElement(k,{post:e,isLiked:this.state.isLiked,onButtonClick:this.handleClickIsLiked.bind(this)}),n.a.createElement("div",{className:"post__title"},e.title,n.a.createElement("br",null),n.a.createElement("strong",null,"Type: ",e.type))))}}]),t}(i.Component)),_=(a(48),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.filterValue,t=[];return v.forEach(function(a){-1!==a.type.indexOf(e)&&t.push(n.a.createElement("li",{key:a.id,className:"posts-list__item"},n.a.createElement(y,{post:a})))}),n.a.createElement("ul",{className:"posts-list"},t)}}]),t}(i.Component)),C=(a(50),a(82),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.url,e.encodeUrl);e.post;return n.a.createElement("div",{className:"social"},n.a.createElement("a",{href:"https://www.facebook.com/sharer/sharer.php?u="+t,target:"_blank",rel:"noopener noreferrer",className:"social__btn social__btn--fb"},"Facebook"),n.a.createElement("a",{href:"https://twitter.com/intent/tweet/?url="+t,target:"_blank",rel:"noopener noreferrer",className:"social__btn social__btn--tw"},"Twitter"),n.a.createElement("a",{href:"http://pinterest.com/pin/create/button/?url="+t,target:"_blank",rel:"noopener noreferrer",className:"social__btn social__btn--pin"},"Pinterest"))}}]),t}(i.Component)),w=(a(84),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=window.location.href.replace("/share","/modal"),t=encodeURIComponent(e),a=this.props.match.params.id,r=v.find(function(e){return e.id===a});return n.a.createElement(i.Fragment,null,n.a.createElement(g.a,{meta:[]}),n.a.createElement("div",{className:"share-modal"},n.a.createElement("div",{className:"share-modal__inner"},n.a.createElement("h2",{className:"share-modal__title"},"Share"),n.a.createElement("div",{className:"share-modal__body"},n.a.createElement(C,{post:r,encodeUrl:t,url:e}),n.a.createElement("input",{className:"share-modal__field",value:e,readOnly:!0})),n.a.createElement(b.a,{className:"share-modal__close",to:"/"},"X"))))}}]),t}(i.Component)),N=(a(86),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleFilterValueChange=a.handleFilterValueChange.bind(Object(m.a)(Object(m.a)(a))),a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"handleFilterValueChange",value:function(e){this.props.onFilterValueChange(e.target.value)}},{key:"render",value:function(){var e={},t=v.filter(function(t){return!e[t.type]&&(e[t.type]=!0)}).map(function(e){return n.a.createElement("option",{key:e.id,value:e.type},"Type: ",e.type)});return n.a.createElement("select",{className:"select",value:this.props.filterValue,onChange:this.handleFilterValueChange},n.a.createElement("option",{value:""},"All resources"),t)}}]),t}(i.Component)),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={filterValue:""},a.handleFilterValueChange=a.handleFilterValueChange.bind(Object(m.a)(Object(m.a)(a))),a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"handleFilterValueChange",value:function(e){this.setState({filterValue:e})}},{key:"render",value:function(){var e=this;return n.a.createElement(i.Fragment,null,n.a.createElement(N,{filterValue:this.state.filterValue,onFilterValueChange:this.handleFilterValueChange}),n.a.createElement(d.a,null,n.a.createElement(p.a,null,n.a.createElement(i.Fragment,null,n.a.createElement(h.a,{path:"/",render:function(){return n.a.createElement(_,{filterValue:e.state.filterValue})}}),n.a.createElement(h.a,{path:"/share/:id",component:w}),n.a.createElement(h.a,{path:"/modal/:id",component:j})))))}}]),t}(i.Component);Object(r.render)(n.a.createElement(q,null),document.getElementById("root"))}},[[29,2,1]]]);
//# sourceMappingURL=main.65fb9801.chunk.js.map