import{r as u,K as C,o as n,b as i,d as e,a as h,s as c,u as p,L as M,e as v,a8 as S,F as y,f as x,t as $,N as D,c as b,T as V,x as w,a6 as F,h as N}from"./app.4b06ee76.js";import{_ as T}from"./PersonInteractiveCardList.319cfb95.js";import{_ as j}from"./Modal.243f3469.js";import{P as L}from"./PersonService.3e6438c6.js";import{t as q}from"./style.8b0cc4ed.js";import"./ToggleSwitch.92a8b3f6.js";import"./TraceLogService.8b831283.js";const z={class:"flex flex-col p-4 w-full"},A={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},E=e("div",{class:"text-2xl font-bold"},"\u0E40\u0E23\u0E35\u0E22\u0E07\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23",-1),H=e("button",{class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})]),w(" \u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23 ")],-1),I={class:"mt-0 mb-2 md:col-span-2"},K={class:"shadow overflow-hidden sm:rounded-md"},U={class:"px-4 py-5 bg-white sm:p-6"},G={class:"grid grid-cols-6 gap-3"},J={class:"col-span-6 sm:col-span-6"},Q=e("label",{for:"person_types",class:"block text-sm font-medium text-gray-700"},"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E32\u0E01\u0E23:",-1),R=["value"],W={class:"flex flex-col sm:flex-row"},X=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Y=w(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),Z=[X,Y],ee={class:"flex flex-col w-full"},oe=e("div",{class:"text-gray-900 text-xl font-medium dark:text-white"}," \u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ",-1),te={layout:F},ce=Object.assign(te,{__name:"PersonOrder",props:{person_types:{type:Array,required:!0},division_id:{type:Number,required:!0},division_slug:{type:String,required:!0}},setup(m){const f=m,k=u(new L),r=u([]),g=u(!1),d=C({type:null}),_=(s,o,t)=>{q({title:o,description:t},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},a=s=>{g.value=s},P=()=>{k.value.listPersonByDivisionAndType(f.division_id,d.type).then(s=>{r.value=s})},B=s=>{r.value=r.value.sort((o,t)=>t.profiles.leader-o.profiles.leader||o.display_order-t.display_order)},O=()=>{N.Inertia.post(route("admin.person.update_display_order"),{person_list:r.value,division_slug:f.division_slug},{onSuccess:()=>{_("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:s=>{let o="";for(let t in s)o=o+`- ${s[t]}<br/>`;_("danger","\u0E1E\u0E1A\u0E1B\u0E31\u0E0D\u0E2B\u0E32",o)},onFinish:()=>{}}),a(!1)};return(s,o)=>(n(),i("div",z,[e("div",A,[E,h(p(M),{href:s.route("admin.person"),method:"get",as:"button",type:"button"},{default:c(()=>[H]),_:1},8,["href"])]),e("div",I,[e("div",K,[e("div",U,[e("div",G,[e("div",J,[Q,v(e("select",{"onUpdate:modelValue":o[0]||(o[0]=t=>p(d).type=t),onChange:P,id:"person_types",class:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(n(!0),i(y,null,x(m.person_types,(t,l)=>(n(),i("option",{key:l,value:t.type},$(t.person_type),9,R))),128))],544),[[S,p(d).type]])])])])])]),e("div",W,[v(e("button",{onClick:o[1]||(o[1]=t=>a(!0)),class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},Z,512),[[D,r.value.length>1]])]),e("div",ee,[(n(!0),i(y,null,x(r.value,(t,l)=>(n(),b(T,{key:l,personDetails:t,"order-input":!0,onOrderPerson:se=>B()},null,8,["personDetails","onOrderPerson"]))),128))]),(n(),b(V,{to:"body"},[h(j,{isModalOpen:g.value},{header:c(()=>[oe]),footer:c(()=>[e("button",{onClick:O,type:"button",class:"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800"},"\u0E15\u0E01\u0E25\u0E07"),e("button",{onClick:o[2]||(o[2]=t=>a(!1)),type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"},"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01")]),_:1},8,["isModalOpen"])]))]))}});export{ce as default};
