(this.webpackJsonpgomoku=this.webpackJsonpgomoku||[]).push([[0],{13:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(7),i=n.n(a),o=(n(13),n(6)),c=n(2),s=n(5);function l(){for(var e=Array(19).fill(!1).map((function(){return new Array(19).fill(!1).map((function(){return new Array(1020).fill(!1)}))})),t=0,n=0;n<19;n++)for(var r=0;r+4<19;){for(var a=r;a<r+5;a++)e[n][a][Math.floor(t/5)]=!0,t++;r++}for(var i=0;i<19;i++)for(var o=0;o+4<19;){for(var c=o;c<o+5;c++)e[c][i][Math.floor(t/5)]=!0,t++;o++}for(var s=0;s<15;s++)for(var l=0;l+4<19;){for(var u=0,d=l;d<l+5;d++)e[s+u][d][Math.floor(t/5)]=!0,u++,t++;l++}for(var b=4;b<19;b++)for(var f=0;f+4<19;){for(var x=0,p=f;p<f+5;p++)e[b-x][p][Math.floor(t/5)]=!0,x++,t++;f++}return e}function u(){return Array(2).fill(0).map((function(){return Array(1020).fill(0)}))}function d(e,t,n,r){var a,i=n[e][t].reduce((function(e,t,n){return t&&e.push(n),e}),[]),o=[],c=Object(s.a)(i);try{for(c.s();!(a=c.n()).done;){var l=a.value;o.push(r[l])}}catch(u){c.e(u)}finally{c.f()}return o.reduce((function(e,t){switch(!0){case 0===t:e+=1;break;case 1===t:e+=5;break;case 2===t:e+=20;break;case 3===t:e+=50;break;case 4===t:e+=100}return e}),0)}function b(e,t,n){var r=e[t[0]].slice(t[1]-4,t[1]+5),a=e.reduce((function(e,n,r){return r>t[0]+4||r<t[0]-4?e:e.concat([n[t[1]]])}),[]),i=e.reduce((function(e,n,r){return r>t[0]+4||r<t[0]-4?e:e.concat([n[t[1]+t[0]-r]])}),[]),o=e.reduce((function(e,n,r){return r>t[0]+4||r<t[0]-4?e:e.concat([n[t[1]-t[0]+r]])}),[]),c=function(e,t,n){var r,a=0,i=Object(s.a)(e);try{for(i.s();!(r=i.n()).done;){if(r.value===t?a+=1:a=0,a===n)break}}catch(o){i.e(o)}finally{i.f()}return a===n};return c(a,n,5)||c(r,n,5)||c(i,n,5)||c(o,n,5)?n:null}var f=n(1);var x=Object(c.a)("div",{target:"e1nun0a50"})({name:"1wahefg",styles:"width:560px;margin:0 auto;@media screen and (max-width: 768px){width:290px;}"}),p=20;function h(e){var t=e.setState,n=e.state,a=function(){var e=document.getElementById("board");e.width=2*parseInt(window.getComputedStyle(e).width,0),e.height=1*e.width;var t=e.width,r=e.height,a=(t-40)/18;if(e.getContext){var i=e.getContext("2d");i.clearRect(0,0,t,r),i.beginPath();for(var o=0;o<19;o++)i.moveTo(a*o+p,p),i.lineTo(a*o+p,t-p);for(var c=0;c<19;c++)i.moveTo(p,a*c+p),i.lineTo(t-p,a*c+p);i.stroke();var s=n.history;s[s.length-1].squares.forEach((function(e,t){e.forEach((function(e,n){"B"===e&&(i.beginPath(),i.arc(a*(n-4)+p,a*(t-4)+p,a/3,0,2*Math.PI),i.fillStyle="black",i.fill()),"W"===e&&(i.beginPath(),i.arc(a*(n-4)+p,a*(t-4)+p,a/3,0,2*Math.PI),i.fillStyle="white",i.fill())}))}))}};window.addEventListener("resize",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=null;return function(){clearTimeout(n),n=setTimeout((function(){e()}),t)}}(a));var i=Object(r.useCallback)((function(e){var r=n.mode,a=n.blackIsNext,i=n.winCombinationTab,o=document.getElementById("board"),c=(o.width-40)/18;if(!n.winner&&r[0]){var s=2*(e.pageX-o.offsetLeft)-p,l=2*(e.pageY-o.offsetTop)-p,u=s%c,d=l%c;if(!(u>c/3&&u<c-c/3)&&!(d>c/3&&d<c-c/3)){s=u<=c/3?s-u:s+(c-u),l=d<=c/3?l-d:l+(c-d);var f=JSON.parse(JSON.stringify(n)).history,x=f[n.stepNumber],h=JSON.parse(JSON.stringify(x.squares)),m=s/c+4,w=l/c+4;if(!n.history[n.stepNumber].squares[w][m]){h[w][m]=a?"B":"W";var g=i[l/c][s/c].reduce((function(e,t,n){return t&&e.push(n),e}),[]),j=JSON.parse(JSON.stringify(n)).winCountTab,v=j[n.stepNumber],y=JSON.parse(JSON.stringify(v.winCount));g.forEach((function(e){y[0][e]++,y[1][e]=7}));var O=b(h,[w,m],a?"B":"W");t({history:f.concat([{squares:h}]),winCombinationTab:i,winCountTab:j.concat([{winCount:y}]),stepNumber:f.length,blackIsNext:!a,mode:r,winner:O||null})}}}}),[n,t]);return Object(r.useEffect)((function(){a();var e=n.mode,r=n.blackIsNext,i=n.winCombinationTab;if("AI"===e[0]&&r!==e[1]&&!n.winner){var o=JSON.parse(JSON.stringify(n)).history,c=o[n.stepNumber],s=JSON.parse(JSON.stringify(c.squares)),l=JSON.parse(JSON.stringify(n)).winCountTab,u=l[n.stepNumber],f=JSON.parse(JSON.stringify(u.winCount)),x={rowIndex:0,colIndex:0,point:0},p={rowIndex:0,colIndex:0,point:0};JSON.parse(JSON.stringify(s)).map((function(e){return e.filter((function(e,t){return t>3&&t<23}))})).filter((function(e,t){return t>3&&t<23})).forEach((function(e,t){e.forEach((function(e,n){var r=e?0:d(t,n,i,f[0]);r>x.point&&(x.rowIndex=t,x.colIndex=n,x.point=r);var a=e?0:d(t,n,i,f[1]);a>p.point&&(p.rowIndex=t,p.colIndex=n,p.point=a)}))}));var h=p.point>=x.point?p.rowIndex:x.rowIndex,m=p.point>=x.point?p.colIndex:x.colIndex;s[h+4][m+4]=r?"B":"W";var w=b(s,[h+4,m+4],n.blackIsNext?"B":"W");i[h][m].reduce((function(e,t,n){return t&&e.push(n),e}),[]).forEach((function(e){f[0][e]=7,f[1][e]++})),t({history:o.concat([{squares:s}]),winCombinationTab:i,winCountTab:l.concat([{winCount:f}]),stepNumber:o.length,blackIsNext:!r,mode:e,winner:w})}})),Object(f.jsx)(x,{children:Object(f.jsx)("canvas",{id:"board",onClick:i})})}var m=Object(c.a)("div",{target:"e1qbadcd8"})({name:"1wahefg",styles:"width:560px;margin:0 auto;@media screen and (max-width: 768px){width:290px;}"}),w=Object(c.a)("div",{target:"e1qbadcd7"})({name:"1az60fc",styles:"margin-top:10px;display:flex;justify-content:space-between;align-items:flex-end;>div+div{margin-left:20px;}@media screen and (max-width: 768px){>div+div{margin-left:10px;}}"}),g=Object(c.a)("div",{target:"e1qbadcd6"})({name:"1alx34m",styles:"font-weight:bold;font-size:50px;@media screen and (max-width: 768px){font-size:36px;}"}),j=Object(c.a)("div",{target:"e1qbadcd5"})({name:"138p0az",styles:"text-align:left;font-size:16px;@media screen and (max-width: 768px){font-size:12px;}"}),v=Object(c.a)("div",{target:"e1qbadcd4"})({name:"138p0az",styles:"text-align:left;font-size:16px;@media screen and (max-width: 768px){font-size:12px;}"}),y=Object(c.a)("div",{target:"e1qbadcd3"})({name:"138p0az",styles:"text-align:left;font-size:16px;@media screen and (max-width: 768px){font-size:12px;}"}),O=Object(c.a)("div",{target:"e1qbadcd2"})({name:"1e1a1kr",styles:"text-align:center;div+div{margin-top:10px;}"}),N=Object(c.a)("div",{target:"e1qbadcd1"})({name:"pw2du0",styles:"text-align:right;width:300px;font-size:20px;@media screen and (max-width: 768px){font-size:12px;width:150px;}"}),k=Object(c.a)("input",{target:"e1qbadcd0"})({name:"19pjzos",styles:"border:none;border-bottom:2px solid black;line-height:20px;display:inline;width:100px;height:20px;padding:2px;:focus{outline:none;}@media screen and (max-width: 768px){width:50px;height:10px;}"});function C(e){var t,n=e.state,a=e.setState,i=Object(r.useRef)(null),o=Object(r.useCallback)((function(e){if("Enter"===e.key){var t=Number(i.current.value);if(i.current.value="",i.current.blur(),t<0||t>=n.history.length-1)return;var r=JSON.parse(JSON.stringify(n)).history.slice(0,t+1),o=JSON.parse(JSON.stringify(n)).winCountTab.slice(0,t+1);a({history:r,stepNumber:t,winCombinationTab:n.winCombinationTab,winCountTab:o,blackIsNext:!(t%2),mode:n.mode,winner:null})}}),[n,a]),c=n.winner,s=n.mode,l=n.stepNumber;t=c?"Winner: "+("B"===c?"Black":"White"):"Next player: "+(n.blackIsNext?"Black":"White");var u=s[0]?"Mode: ".concat(s[0]):"Mode: not chosen",d="Round: ".concat(l);return Object(f.jsxs)(m,{children:[Object(f.jsx)(g,{children:"Gomoku"}),Object(f.jsxs)(w,{children:[Object(f.jsxs)("div",{children:[Object(f.jsx)(y,{children:d}),Object(f.jsx)(j,{children:u}),Object(f.jsx)(v,{children:t})]}),Object(f.jsx)(O,{children:Object(f.jsxs)(N,{children:[Object(f.jsx)("label",{htmlFor:"history",children:"Back to history: "}),Object(f.jsx)(k,{id:"history",ref:i,onKeyDown:o})]})})]})]})}var I=Object(c.a)("div",{target:"enqr9ux6"})({name:"12rvbl0",styles:"text-align:center;box-sizing:border-box;padding:12px;height:100%"}),S=Object(c.a)("div",{target:"enqr9ux5"})("display:",(function(e){return e.$showPopup?"flex;":"none;"}),";flex-direction:column;justify-content:space-between;position:fixed;background-color:white;width:300px;height:50px;top:50%;left:50%;z-index:10;transform:translate(-50%, -50%);border:1px solid grey;padding:10px;box-shadow:3px 3px 2px 1px rgba(0, 0, 0, 0.8);button+button{margin-left:15px;}"),q=Object(c.a)("div",{target:"enqr9ux4"})({name:"ace1nk",styles:"button+button{margin-left:15px;}"}),T=Object(c.a)("button",{target:"enqr9ux3"})({name:"scouy",styles:"color:#fff;background-color:#6c757d;border-color:#6c757d"}),J=Object(c.a)("div",{target:"enqr9ux2"})({name:"1yd6hbv",styles:"margin-top:20px;button+button{margin-left:15px;}"}),z=Object(c.a)("button",{target:"enqr9ux1"})({name:"1xnyyrc",styles:"width:120px;height:30px;color:#fff;background-color:#6c757d;border-color:#6c757d"}),A=Object(c.a)("button",{target:"enqr9ux0"})({name:"1xnyyrc",styles:"width:120px;height:30px;color:#fff;background-color:#6c757d;border-color:#6c757d"});function B(){var e=Object(r.useState)(!1),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)({history:[{squares:Array(27).fill(null).map((function(){return new Array(27).fill(null)}))}],winCombinationTab:l(),winCountTab:[{winCount:u()}],stepNumber:0,blackIsNext:!0,mode:[null],winner:null}),c=Object(o.a)(i,2),s=c[0],d=c[1],b=Object(r.useCallback)((function(e){e.target.classList.contains("normal")?d({history:[{squares:Array(27).fill(null).map((function(){return new Array(27).fill(null)}))}],winCombinationTab:l(),winCountTab:[{winCount:u()}],stepNumber:0,blackIsNext:!0,mode:["normal"],winner:null}):a(!0)}),[]),x=Object(r.useCallback)((function(e){d({history:[{squares:Array(27).fill(null).map((function(){return new Array(27).fill(null)}))}],winCombinationTab:l(),winCountTab:[{winCount:u()}],stepNumber:0,blackIsNext:!0,mode:["AI",e.target.classList.contains("black")],winner:null}),a(!1)}),[]);return Object(f.jsxs)(I,{children:[Object(f.jsxs)(S,{$showPopup:n,children:[Object(f.jsx)("div",{children:"\u8acb\u9078\u64c7\u4f60\u8981\u5148\u624b\u6216\u8005\u5f8c\u624b"}),Object(f.jsxs)(q,{children:[Object(f.jsx)(T,{onClick:x,className:"black",children:"\u5148\u624b"}),Object(f.jsx)(T,{onClick:x,className:"white",children:"\u5f8c\u624b"})]})]}),Object(f.jsx)(C,{state:s,setState:d}),Object(f.jsx)(h,{state:s,setState:d}),Object(f.jsxs)(J,{children:[Object(f.jsx)(z,{onClick:b,className:"normal",children:"\u958b\u59cb\u73a9\u5bb6\u5c0d\u6230"}),Object(f.jsx)(A,{onClick:b,className:"AI",children:"\u958b\u59cb\u8207\u96fb\u8166\u5c0d\u5f08"})]})]})}i.a.render(Object(f.jsx)(B,{}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.9e134322.chunk.js.map