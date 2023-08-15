import{o as n,c as x,a as l,r as f,J as P,b as a,d as o,q as S,u as i,n as _,p as h,C as O,e as v,a8 as D,F as y,f as g,t as T,M as V,a7 as q,O as $}from"./app.f0bf0af2.js";import{_ as F}from"./PersonInteractiveCardList.2e6391b4.js";import{S as N}from"./sweetalert2.all.e249dc53.js";import{P as j}from"./PersonService.a48da31f.js";import{t as z}from"./style.cfd7b61d.js";import{r as M}from"./ReplyIcon.708e119f.js";import"./ToggleSwitch.117d2673.js";import"./EyeIcon.3a26ad57.js";function A(d,c){return n(),x("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor","aria-hidden":"true"},[l("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})])}const E={class:"flex flex-col p-4 w-full"},L={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},H=o("div",{class:"text-2xl font-bold"},"\u0E40\u0E23\u0E35\u0E22\u0E07\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23",-1),I={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},J={class:"mt-0 mb-2 md:col-span-2"},U={class:"shadow overflow-hidden sm:rounded-md"},G={class:"px-4 py-5 bg-white sm:p-6"},K={class:"grid grid-cols-6 gap-3"},Q={class:"col-span-6 sm:col-span-6"},R=o("label",{for:"person_types",class:"block text-sm font-medium text-gray-700"},"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23:",-1),W=["value"],X={class:"flex flex-col sm:flex-row"},Y={class:"flex flex-col w-full"},Z={layout:q},de=Object.assign(Z,{__name:"PersonOrder",props:{person_types:{type:Array,required:!0},division_id:{type:Number,required:!0},division_slug:{type:String,required:!0}},setup(d){const c=d,b=f(new j),r=f([]),u=P({type:null}),m=(s,t,e)=>{z({title:t,description:e},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},w=()=>{N.fire({title:"\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23?",icon:"question",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{s.isConfirmed&&C()})},k=()=>{b.value.listPersonByDivisionAndType(c.division_id,u.type).then(s=>{r.value=s})},B=s=>{r.value=r.value.sort((t,e)=>e.profiles.leader-t.profiles.leader||t.display_order-e.display_order)},C=()=>{$.post(route("admin.person.update_display_order"),{person_list:r.value,division_slug:c.division_slug},{onSuccess:()=>{m("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:s=>{let t="";for(let e in s)t=t+`- ${s[e]}<br/>`;m("danger","\u0E1E\u0E1A\u0E1B\u0E31\u0E0D\u0E2B\u0E32",t)},onFinish:()=>{}})};return(s,t)=>(n(),a("div",E,[o("div",L,[H,l(i(O),{href:s.route("admin.person"),method:"get",as:"button",type:"button"},{default:S(()=>[o("button",I,[l(i(M),{class:_(["h-6 w-6 mr-2"])}),h(" \u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23 ")])]),_:1},8,["href"])]),o("div",J,[o("div",U,[o("div",G,[o("div",K,[o("div",Q,[R,v(o("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>i(u).type=e),onChange:k,id:"person_types",class:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(n(!0),a(y,null,g(d.person_types,(e,p)=>(n(),a("option",{key:p,value:e.type},T(e.person_type),9,W))),128))],544),[[D,i(u).type]])])])])])]),o("div",X,[v(o("button",{onClick:w,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[l(i(A),{class:_(["h-6 w-6 mr-2"])}),h(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[V,r.value.length>=1]])]),o("div",Y,[(n(!0),a(y,null,g(r.value,(e,p)=>(n(),x(F,{key:p,personDetails:e,"order-input":!0,onOrderPerson:ee=>B()},null,8,["personDetails","onOrderPerson"]))),128))])]))}});export{de as default};
