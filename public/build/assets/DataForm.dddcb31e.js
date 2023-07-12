import{r as d,P as B,J as T,o as m,b as p,d as e,t as n,a as i,q as f,u as l,n as b,D as y,i as x,g as w,s as k,a7 as R}from"./app.32775810.js";import{T as z}from"./ToggleSwitch.c4acff6e.js";import{l as A,s as S}from"./lodash.89fdcd90.js";import{t as D}from"./style.22ff02b7.js";import{r as E}from"./ReplyIcon.c552dcff.js";import{r as F,a as L}from"./EyeIcon.829f203a.js";const P={class:"flex flex-col p-4 w-full"},q={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},I={class:"text-2xl font-bold"},J={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},O=k(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 "),M={class:"flex flex-col border rounded-lg shadow-lg p-4"},W={class:"flex justify-center md:justify-start"},G=["src"],H=["src"],K={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},Q=e("label",{for:"user_id",class:"col-span-6 md:col-span-1 mr-2 self-end"},"\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 :",-1),X={class:"flex items-center"},Y=["src"],Z=e("label",{for:"role_name",class:"col-span-6 md:col-span-1 mr-2 self-end"},"\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48 :",-1),ee={"slot:singleLabel":"props"},se={"slot:option":"props"},te=e("label",{for:"status",class:"col-span-2 md:col-span-1 mr-2 self-center"},"\u0E2A\u0E16\u0E32\u0E19\u0E30 :",-1),oe={class:"col-span-4"},le={id:"status",class:"flex items-center my-2 sm:my-0"},ae={class:"text-blue-600"},re={class:"text-blue-600"},ne={class:"flex flex-row mt-2 space-x-4"},ie=k(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),ce={layout:R},he=Object.assign(ce,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},user:{type:Object},person:{type:Array,default:[]},roles:{type:Array,default:[]}},setup(c){const o=c,g=d(null),C=d(base_url);switch(o.action){case"insert":g.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"edit":g.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":g.value="\u0E25\u0E1A";break}const r=B({user_id:o.user?o.user.id:null,role_name:o.user&&o.user.roles.length?o.user.roles[0].name:null,status:o.user?o.user.status:!0}),u=o.user?o.person[0]:d(null),_=o.user&&o.user.roles.length?d(o.user.roles[0]):d(null),h=(s,a,t)=>{D({title:a,description:t},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},V=({name:s})=>`${s}`,j=A.exports.throttle(s=>{T.get(route("admin.user.create"),{term:s},{preserveState:!0,preserveScroll:!0,replace:!0})},300),N=s=>{r.user_id=s.id},U=s=>{r.role_name=s.name},$=()=>{r.status=!r.status},v=()=>{let s="";o.action==="edit"?r.patch(route("admin.user.update",r.user_id),{preserveState:!1,preserveScroll:!0,onSuccess:()=>{h("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:a=>{for(let t in a)s=s+`- ${a[t]}<br/>`;h("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",s)},onFinish:()=>{r.processing=!1}}):r.post(route("admin.user.store",r.user_id),{preserveState:!1,preserveScroll:!0,onSuccess:()=>{h("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:a=>{for(let t in a)s=s+`- ${a[t]}<br/>`;h("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",s)},onFinish:()=>{r.processing=!1}})};return(s,a)=>(m(),p("div",P,[e("div",q,[e("div",I,n(g.value)+"\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",1),i(l(y),{href:s.route("admin.user.index"),method:"get",as:"button",type:"button"},{default:f(()=>[e("button",J,[i(l(E),{class:b(["h-6 w-6 mr-2"])}),O])]),_:1},8,["href"])]),e("div",M,[e("div",W,[l(u)?(m(),p("img",{key:1,src:l(u).image_url,alt:"No Picture",class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300"},null,8,H)):(m(),p("img",{key:0,src:`${C.value}/fallbackimage/default-blank-image.jpg`,alt:"No Picture",class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300"},null,8,G))]),e("div",K,[Q,i(l(S),{id:"user_id",modelValue:l(u),"onUpdate:modelValue":a[0]||(a[0]=t=>x(u)?u.value=t:null),"deselect-label":"Can't remove this value","track-by":"id",label:"lname_th",internalSearch:!1,placeholder:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",class:"col-span-6 md:col-span-5",disabled:!!c.user,"show-labels":!1,options:c.person,searchable:!c.user,"allow-empty":!1,onSearchChange:l(j),onSelect:N},{singleLabel:f(t=>[e("span",null,[e("strong",null,n(t.option.fname_th)+" - "+n(t.option.lname_th)+" ["+n(t.option.division.name_th)+"]",1)])]),option:f(t=>[e("div",X,[e("img",{class:"h-14 w-12 p-1",src:t.option.image_url,alt:"Not Available"},null,8,Y),e("strong",null,n(t.option.fname_th)+" - "+n(t.option.lname_th)+" ["+n(t.option.division.name_th)+"]",1)])]),_:1},8,["modelValue","disabled","options","searchable","onSearchChange"]),Z,i(l(S),{id:"role_name",modelValue:l(_),"onUpdate:modelValue":a[1]||(a[1]=t=>x(_)?_.value=t:null),"deselect-label":"Can't remove this value","track-by":"name",label:"name",placeholder:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A",class:"col-span-6 md:col-span-5","custom-label":V,"show-labels":!1,options:c.roles,searchable:!1,"allow-empty":!1,onSelect:U},{default:f(()=>[e("template",ee,[e("span",null,n(o.option.name),1)]),e("template",se,[e("span",null,[e("strong",null,n(o.option.name),1)])])]),_:1},8,["modelValue","options"]),te,e("div",oe,[e("div",le,[e("div",ae,[i(l(F),{class:b(["h-4 w-4"])})]),i(z,{status:l(r).status,onButtonIsToggle:$},null,8,["status"]),e("div",re,[i(l(L),{class:b(["h-4 w-4"])})])])])])]),e("div",ne,[c.action==="insert"?(m(),p("button",{key:0,type:"button",onClick:v,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")):w("",!0),c.action==="edit"?(m(),p("button",{key:1,type:"button",onClick:v,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02")):w("",!0),i(l(y),{href:s.route("admin.user.index"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:f(()=>[ie]),_:1},8,["href"])])]))}});export{he as default};
