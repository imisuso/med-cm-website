import{r as _,K as R,j as V,b as i,d as s,t as d,a as u,s as w,u as l,e as k,v as $,n as c,g as m,i as L,F,f as A,a5 as C,o as n,L as j,x as y}from"./app.a5a8ce67.js";import{s as N}from"./lodash.f7add98d.js";import{t as z}from"./style.2fd41274.js";import{r as B}from"./ReplyIcon.3cddda8d.js";import{r as D}from"./FastForwardIcon.61e24d52.js";const E={class:"flex flex-col p-4 w-full"},U={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},I={class:"text-2xl font-bold"},M={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},O=y(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Role "),T={class:"flex flex-col border rounded-lg shadow-lg p-4"},q={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},K=s("label",{for:"role-name",class:"col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold"},"\u0E0A\u0E37\u0E48\u0E2D Role :",-1),W={class:"col-span-6 md:col-span-5"},G={key:0,class:"mt-2 text-xs text-red-600"},H=s("label",{for:"role-label",class:"col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 :",-1),J={class:"col-span-6 md:col-span-5"},P={key:0,class:"mt-2 text-xs text-red-600"},Q={class:"grid grid-cols-6 gap-2 md:gap-6 mt-2 mb-6 p-2 rounded-lg"},X=s("label",{for:"abilities",class:"col-span-6 md:col-span-1 mr-2 self-center justify-self-start sm:justify-self-end font-semibold"},"Ability :",-1),Y={key:0,class:"col-start-1 sm:col-start-2 col-span-6 text-xs text-red-600"},Z={class:"bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-100 px-2 py-1 rounded-lg font-normal text-sm tracking-wide text-gray-800 shadow-lg"},ee=s("div",{class:"font-semibold text-lg underline tracking-wide"},"\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 :",-1),se={class:"flex flex-col sm:flex-row sm:items-center"},te={class:"border-green-700 text-white bg-green-600 px-1 pb-1 rounded-md mr-1"},oe={class:"flex items-start sm:items-center"},re={class:"flex flex-row mt-2 space-x-4"},le=["disabled"],ae=["disabled"],ie=y(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),ne={layout:C},be=Object.assign(ne,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},abilities:{type:Array,default:[]},role:{type:Object,default:{}}},setup(p){const a=p,b=_(null);switch(_(base_url),a.action){case"insert":b.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"edit":b.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":b.value="\u0E25\u0E1A";break}const t=R({role_id:a.role?a.role.id:null,role_name:a.role?a.role.name:null,role_label:a.role?a.role.label:null,abilities:a.role?a.role.abilities:[]}),f=t.abilities?_(t.abilities):_([]),g=(e,o,r)=>{z({title:o,description:r},{showIcon:!0,transition:"zoom",position:"top-right",type:e,timeout:3e3})},S=({name:e,label:o})=>`${e}`,x=()=>{t.abilities=f},h=V(()=>t.role_name&&t.role_label&&t.abilities),v=()=>{let e="";a.action==="edit"?t.patch(route("admin.role.update",t.role_id),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Role \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:o=>{for(let r in o)e=e+`- ${o[r]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",e)},onFinish:()=>{t.processing=!1}}):t.post(route("admin.role.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Role \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:o=>{for(let r in o)e=e+`- ${o[r]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",e)},onFinish:()=>{t.processing=!1}})};return(e,o)=>(n(),i("div",E,[s("div",U,[s("div",I,d(b.value)+" Role",1),u(l(j),{href:e.route("admin.role.index"),method:"get",as:"button",type:"button"},{default:w(()=>[s("button",M,[u(l(B),{class:c(["h-6 w-6 mr-2"])}),O])]),_:1},8,["href"])]),s("div",T,[s("div",q,[K,s("div",W,[s("div",null,[k(s("input",{type:"text",id:"role-name","onUpdate:modelValue":o[0]||(o[0]=r=>l(t).role_name=r),class:c(["focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md",[e.$page.props.errors.role_name?"border-red-600":"border-gray-300"]])},null,2),[[$,l(t).role_name]])]),e.$page.props.errors.role_name?(n(),i("div",G,d(e.$page.props.errors.role_name),1)):m("",!0)]),H,s("div",J,[s("div",null,[k(s("textarea",{id:"role-label","onUpdate:modelValue":o[1]||(o[1]=r=>l(t).role_label=r),class:c(["focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md",[e.$page.props.errors.role_label?"border-red-600":"border-gray-300"]])},null,2),[[$,l(t).role_label]])]),e.$page.props.errors.role_label?(n(),i("div",P,d(e.$page.props.errors.role_label),1)):m("",!0)])]),s("div",Q,[X,u(l(N),{class:c(["col-span-6 md:col-span-5 mt-4 border",[e.$page.props.errors.abilities?"border-red-600":""]]),id:"abilities",modelValue:l(f),"onUpdate:modelValue":o[2]||(o[2]=r=>L(f)?f.value=r:null),"track-by":"id","show-labels":!0,"custom-label":S,"close-on-select":!1,"clear-on-select":!1,options:p.abilities,multiple:!0,searchable:!1,"allow-empty":!1,selectLabel:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01",selectedLabel:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27",deselectLabel:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E33\u0E2D\u0E2D\u0E01","preselect-first":!0,"hide-selected":!0,onSelect:x,onRemove:x},null,8,["class","modelValue","options"]),e.$page.props.errors.abilities?(n(),i("div",Y,d(e.$page.props.errors.abilities),1)):m("",!0)]),s("div",Z,[ee,(n(!0),i(F,null,A(l(t).abilities,r=>(n(),i("div",{class:"flex items-center py-1",key:r.id},[s("div",se,[s("div",te,d(r.name),1),s("div",oe,[u(l(D),{class:c(["mr-1 text-green-700 w-6 h-6 shrink-0"])}),y(" "+d(r.label),1)])])]))),128))])]),s("div",re,[p.action==="insert"?(n(),i("button",{key:0,disabled:!l(h),type:"button",onClick:v,class:c(["font-medium rounded-lg text-sm px-5 py-2.5 text-center",[l(h)?"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300":"text-gray-500 bg-white focus:ring-4 focus:ring-gray-300 border border-gray-200"]])}," \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ",10,le)):m("",!0),p.action==="edit"?(n(),i("button",{key:1,disabled:!l(h),type:"button",onClick:v,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02",8,ae)):m("",!0),u(l(j),{href:e.route("admin.role.index"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:w(()=>[ie]),_:1},8,["href"])])]))}});export{be as default};