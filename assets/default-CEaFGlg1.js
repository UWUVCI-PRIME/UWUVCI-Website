import{p as I,m as w,a as R,b as P,c as S,g as x,r as B,s as v,d as L,t as g,u as U,e as n,f as F,h as z,i as a,j as A,k as H,w as M,l as _,o as f,n as N,q as i,V as T,v as o,x as d,y as E,z as D,A as W,F as j,B as q}from"./index-qY4ueuh0.js";import{m as G,a as O,b as Y,u as Z,c as $,d as J,e as K,V as Q}from"./VIcon-d_1zBXN2.js";const X=I({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...G(),...w(),...O(),...R(),...Y(),...P({tag:"footer"}),...S()},"VFooter"),ee=x()({name:"VFooter",props:X(),setup(e,r){let{slots:m}=r;const c=B(),s=v(),{themeClasses:u}=L(e),{backgroundColorClasses:t,backgroundColorStyles:k}=Z(g(e,"color")),{borderClasses:y}=$(e),{elevationClasses:p}=J(e),{roundedClasses:b}=K(e),h=v(32),{resizeRef:V}=U(l=>{l.length&&(h.value=l[0].target.clientHeight)}),C=n(()=>e.height==="auto"?h.value:parseInt(e.height,10));return F(()=>e.app,()=>{const l=H({id:e.name,order:n(()=>parseInt(e.order,10)),position:n(()=>"bottom"),layoutSize:C,elementSize:n(()=>e.height==="auto"?void 0:C.value),active:n(()=>e.app),absolute:g(e,"absolute")});M(()=>{c.value=l.layoutItemStyles.value,s.value=l.layoutIsReady})}),z(()=>a(e.tag,{ref:V,class:["v-footer",u.value,t.value,y.value,p.value,b.value,e.class],style:[k.value,e.app?c.value:{height:A(e.height)},e.style]},m)),e.app?s.value:{}}}),te={id:"vue"},ae={class:"menu-item"},oe={class:"menu-item"},se=["href","title"],le={class:"text-caption text-disabled",style:{position:"absolute",right:"16px"}},ne=o("span",{class:"d-sm-inline-block"},"NicoAICP",-1),ce={__name:"default",setup(e){const r=[{title:"UWUVCI GitHub",icon:"mdi-github",href:"https://github.com/UWUVCI-PRIME/"},{title:"UWUVCI Discord",icon:["M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"],href:"https://discord.gg/ultimate-wiiu-vc-injectors-386898225161961493"},{title:"UWUVCI Reddit",icon:"mdi-reddit",href:"https://www.reddit.com/r/uwuvci/"}];return(m,c)=>{const s=_("router-link"),u=_("router-view");return f(),N(T,null,{default:i(()=>[a(E,null,{default:i(()=>[o("nav",te,[o("div",ae,[a(s,{to:"/"},{default:i(()=>[d("Home")]),_:1})]),o("div",oe,[a(s,{to:"/ndscompat"},{default:i(()=>[d("NDS Compatibility")]),_:1})])]),a(u)]),_:1}),a(ee,{height:"40",app:""},{default:i(()=>[(f(),D(j,null,W(r,t=>o("a",{key:t.title,href:t.href,title:t.title,class:"d-inline-block mx-2 social-link",rel:"noopener noreferrer",target:"_blank",color:"black"},[a(Q,{class:"ico",icon:t.icon,size:t.icon==="$vuetify"?24:16},null,8,["icon","size"])],8,se)),64)),o("div",le,[d(" © "+q(new Date().getFullYear())+" ",1),ne])]),_:1})]),_:1})}}};export{ce as default};
