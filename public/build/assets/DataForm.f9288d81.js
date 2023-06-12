import{r as _,P as R,h as V,o as i,b as n,d as s,t as d,a as u,s as w,u as l,n as c,q as y,D as k,e as $,v as S,g as m,i as A,F as C,f as F,a7 as L}from"./app.d39ae179.js";import{s as D}from"./lodash.3289a77c.js";import{t as N}from"./style.23244c32.js";import{r as z}from"./ReplyIcon.35d03ae1.js";import{r as B}from"./FastForwardIcon.286e5fbc.js";const E={class:"flex flex-col p-4 w-full"},U={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},q={class:"text-2xl font-bold"},I={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},M={class:"flex flex-col border rounded-lg shadow-lg p-4"},O={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},T=s("label",{for:"role-name",class:"col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold"},"\u0E0A\u0E37\u0E48\u0E2D Role :",-1),P={class:"col-span-6 md:col-span-5"},W={key:0,class:"mt-2 text-xs text-red-600"},G=s("label",{for:"role-label",class:"col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 :",-1),H={class:"col-span-6 md:col-span-5"},J={key:0,class:"mt-2 text-xs text-red-600"},K={class:"grid grid-cols-6 gap-2 md:gap-6 mt-2 mb-6 p-2 rounded-lg"},Q=s("label",{for:"abilities",class:"col-span-6 md:col-span-1 mr-2 self-center justify-self-start sm:justify-self-end font-semibold"},"Ability :",-1),X={key:0,class:"col-start-1 sm:col-start-2 col-span-6 text-xs text-red-600"},Y={class:"bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-100 px-2 py-1 rounded-lg font-normal text-sm tracking-wide text-gray-800 shadow-lg"},Z=s("div",{class:"font-semibold text-lg underline tracking-wide"},"\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 :",-1),ee={class:"flex flex-col sm:flex-row sm:items-center"},se={class:"border-green-700 text-white bg-green-600 px-1 pb-1 rounded-md mr-1"},te={class:"flex items-start sm:items-center"},oe={class:"flex flex-row mt-2 space-x-4"},re=["disabled"],le=["disabled"],ae={layout:L},me=Object.assign(ae,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},abilities:{type:Array,default:[]},role:{type:Object,default:{}}},setup(p){const a=p,b=_(null);switch(_(base_url),a.action){case"insert":b.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"edit":b.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":b.value="\u0E25\u0E1A";break}const t=R({role_id:a.role?a.role.id:null,role_name:a.role?a.role.name:null,role_label:a.role?a.role.label:null,abilities:a.role?a.role.abilities:[]}),f=t.abilities?_(t.abilities):_([]),g=(e,o,r)=>{N({title:o,description:r},{showIcon:!0,transition:"zoom",position:"top-right",type:e,timeout:3e3})},j=({name:e,label:o})=>`${e}`,x=()=>{t.abilities=f},h=V(()=>t.role_name&&t.role_label&&t.abilities),v=()=>{let e="";a.action==="edit"?t.patch(route("admin.role.update",t.role_id),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Role \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:o=>{for(let r in o)e=e+`- ${o[r]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",e)},onFinish:()=>{t.processing=!1}}):t.post(route("admin.role.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Role \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:o=>{for(let r in o)e=e+`- ${o[r]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",e)},onFinish:()=>{t.processing=!1}})};return(e,o)=>(i(),n("div",E,[s("div",U,[s("div",q,d(b.value)+" Role",1),u(l(k),{href:e.route("admin.role.index"),method:"get",as:"button",type:"button"},{default:w(()=>[s("button",I,[u(l(z),{class:c(["h-6 w-6 mr-2"])}),y(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Role ")])]),_:1},8,["href"])]),s("div",M,[s("div",O,[T,s("div",P,[s("div",null,[$(s("input",{type:"text",id:"role-name","onUpdate:modelValue":o[0]||(o[0]=r=>l(t).role_name=r),class:c(["focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md",[e.$page.props.errors.role_name?"border-red-600":"border-gray-300"]])},null,2),[[S,l(t).role_name]])]),e.$page.props.errors.role_name?(i(),n("div",W,d(e.$page.props.errors.role_name),1)):m("",!0)]),G,s("div",H,[s("div",null,[$(s("textarea",{id:"role-label","onUpdate:modelValue":o[1]||(o[1]=r=>l(t).role_label=r),class:c(["focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md",[e.$page.props.errors.role_label?"border-red-600":"border-gray-300"]])},null,2),[[S,l(t).role_label]])]),e.$page.props.errors.role_label?(i(),n("div",J,d(e.$page.props.errors.role_label),1)):m("",!0)])]),s("div",K,[Q,u(l(D),{class:c(["col-span-6 md:col-span-5 mt-4 border",[e.$page.props.errors.abilities?"border-red-600":""]]),id:"abilities",modelValue:l(f),"onUpdate:modelValue":o[2]||(o[2]=r=>A(f)?f.value=r:null),"track-by":"id","show-labels":!0,"custom-label":j,"close-on-select":!1,"clear-on-select":!1,options:p.abilities,multiple:!0,searchable:!1,"allow-empty":!1,selectLabel:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01",selectedLabel:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27",deselectLabel:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E33\u0E2D\u0E2D\u0E01","preselect-first":!0,"hide-selected":!0,onSelect:x,onRemove:x},null,8,["class","modelValue","options"]),e.$page.props.errors.abilities?(i(),n("div",X,d(e.$page.props.errors.abilities),1)):m("",!0)]),s("div",Y,[Z,(i(!0),n(C,null,F(l(t).abilities,r=>(i(),n("div",{class:"flex items-center py-1",key:r.id},[s("div",ee,[s("div",se,d(r.name),1),s("div",te,[u(l(B),{class:c(["mr-1 text-green-700 w-6 h-6 shrink-0"])}),y(" "+d(r.label),1)])])]))),128))])]),s("div",oe,[p.action==="insert"?(i(),n("button",{key:0,disabled:!h.value,type:"button",onClick:v,class:c(["font-medium rounded-lg text-sm px-5 py-2.5 text-center",[h.value?"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300":"text-gray-500 bg-white focus:ring-4 focus:ring-gray-300 border border-gray-200"]])}," \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ",10,re)):m("",!0),p.action==="edit"?(i(),n("button",{key:1,disabled:!h.value,type:"button",onClick:v,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02",8,le)):m("",!0),u(l(k),{href:e.route("admin.role.index"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:w(()=>[y(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")]),_:1},8,["href"])])]))}});export{me as default};
