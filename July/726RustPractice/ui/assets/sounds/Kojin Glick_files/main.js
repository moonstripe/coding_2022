import{b as f}from"./chunk-TGEE6BEF.js";import{d as r,e as m,f as a}from"./chunk-YYZTYQLY.js";function C(e,n){n=[].concat(n);let t=n[n.length-1].nextSibling;function i(o,s){e.insertBefore(o,s||t)}return e.__k={nodeType:1,parentNode:e,firstChild:n[0],childNodes:n,insertBefore:i,appendChild:i,removeChild:function(o){e.removeChild(o)}}}var S=document.getElementById("__FRSH_ISLAND_PROPS"),g=JSON.parse(S?.textContent??"[]");function v(e){function n(t){let i=t.nodeType===8&&(t.data.match(/^\s*frsh-(.*)\s*$/)||[])[1],o=null;if(i){let l=t,c=[],h=t.parentNode;for(;(t=t.nextSibling)&&t.nodeType!==8;)c.push(t);l.parentNode.removeChild(l);let[p,u]=i.split(":");a(m(e[p],g[Number(u)]),C(h,c)),o=t}let s=t.nextSibling,d=t.firstChild;o&&o.parentNode?.removeChild(o),s&&n(s),d&&n(d)}n(document.body)}var N=r.vnode;r.vnode=e=>{f(e),N&&N(e)};export{v as revive};