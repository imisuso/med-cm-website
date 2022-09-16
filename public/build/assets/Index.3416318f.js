import{r as b,w,K as f,o,b as d,d as e,e as p,v as y,u as a,i as g,a9 as x,F as m,f as u,t,a as v,a7 as k,h as B}from"./app.de014cca.js";import{d as _}from"./th.c6e9410a.js";import{b as j}from"./buddhistEra.221f1eb3.js";import{_ as M}from"./Paginations.5518929d.js";const D={class:"flex flex-col p-4 w-full"},O={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},S=e("div",{class:"text-2xl font-bold w-full md:w-1/3"},"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",-1),U={class:"grid grid-cols-2 gap-6 mb-2"},V={class:"col-span-2 sm:col-span-1"},F=e("label",{for:"type",class:"block text-sm font-medium text-gray-700"},"Type :",-1),q=["value"],T={class:"col-span-2 sm:col-span-1"},E=e("label",{for:"section",class:"block text-sm font-medium text-gray-700"},"Section :",-1),H=["value"],I={key:0},N={class:"grid grid-cols-2 border p-2 rounded-md shadow-md"},K={class:"col-span-2 text-sm text-gray-700 italic"},L={class:"col-span-2"},R={class:"col-span-2"},$={class:"col-span-2"},z={class:"flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-1 md:space-y-0 items-start md:items-center text-sm mt-2"},A={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},C={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},G={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},J={key:1},P={class:"grid grid-cols-2 border p-2 rounded-md shadow-md"},Q={class:"col-span-2 text-sm text-gray-700 italic"},W={class:"col-span-2"},X={class:"col-span-2"},Y={class:"col-span-2"},Z={class:"flex space-x-2 items-center text-sm mt-2"},ee={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},se={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},te={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},oe={layout:k},ce=Object.assign(oe,{__name:"Index",props:{logs:{type:Object,required:!0,default:{}},sections:{type:Object,required:!0,default:{}},types:{type:Object,required:!0,default:{}},filters:{type:Object}},setup(i){let n=b(i.filters.search);w(n,h=>{B.Inertia.get(route("admin.log.index"),{search:h},{preserveState:!0,replace:!0})});const l=f({section:"login",type:"info"});return _.extend(j),(h,r)=>(o(),d("div",D,[e("div",O,[S,p(e("input",{type:"text","onUpdate:modelValue":r[0]||(r[0]=s=>g(n)?n.value=s:n=s),class:"text rounded-md border-gray-400 w-full",placeholder:"\u0E04\u0E49\u0E19\u0E08\u0E32\u0E01 Type \u0E2B\u0E23\u0E37\u0E2D Section \u0E2B\u0E23\u0E37\u0E2D Details"},null,512),[[y,a(n)]])]),e("div",U,[e("div",V,[F,p(e("select",{"onUpdate:modelValue":r[1]||(r[1]=s=>a(l).type=s),id:"type",class:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(o(!0),d(m,null,u(i.types,(s,c)=>(o(),d("option",{key:c,value:s.type},t(s.type),9,q))),128))],512),[[x,a(l).type]])]),e("div",T,[E,p(e("select",{"onUpdate:modelValue":r[2]||(r[2]=s=>a(l).section=s),id:"section",class:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(o(!0),d(m,null,u(i.sections,(s,c)=>(o(),d("option",{key:c,value:s.section},t(s.section),9,H))),128))],512),[[x,a(l).section]])])]),(o(!0),d(m,null,u(i.logs.data,(s,c)=>(o(),d("div",{key:c,class:"bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600 mb-1"},[s.person?(o(),d("div",I,[e("div",N,[e("div",K,t(a(_)(s.created_at).locale("th").format("D/MM/BBBB H:mm")),1),e("div",L,t(s.person.fname_th)+" "+t(s.person.lname_th),1),e("div",R,t(s.details),1),e("div",$,[e("div",z,[e("div",A,t(s.type),1),e("div",C,t(s.action),1),e("div",G,t(s.section),1)])])])])):(o(),d("div",J,[e("div",P,[e("div",Q,t(a(_)(s.created_at).locale("th").format("D/MM/BBBB H:mm")),1),e("div",W,"Unknow-User ("+t(s.user)+")",1),e("div",X,t(s.details),1),e("div",Y,[e("div",Z,[e("div",ee,t(s.type),1),e("div",se,t(s.action),1),e("div",te,t(s.section),1)])])])]))]))),128)),v(M,{pagination:i.logs,class:"mt-1"},null,8,["pagination"])]))}});export{ce as default};