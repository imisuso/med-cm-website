import{r as x,w as g,o as a,b as r,d as e,e as k,v as B,u as b,i as j,F as w,f as y,t as o,a as v,c as M,q as _,T as O,a7 as T,J as $,L as h}from"./app.289a7401.js";import{d as f}from"./th.6f4ebd2a.js";import{b as q}from"./buddhistEra.6a16849e.js";import{_ as C}from"./Paginations.a1cea1ce.js";import{_ as D}from"./Modal.eab5344e.js";const L={class:"flex flex-col p-4 w-full"},H={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},S=e("div",{class:"text-2xl font-bold w-full md:w-1/3"},"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",-1),U={class:"grid grid-cols-3 gap-2 sm:gap-6 mb-2"},V={class:"col-span-3 sm:col-span-1"},A={class:"col-span-3 sm:col-span-1"},E={class:"col-span-3 sm:col-span-1"},F={key:0},J={class:"grid grid-cols-2 border p-2 rounded-md shadow-md"},N={class:"col-span-2 text-sm text-black font-semibold"},z={class:"col-span-2 text-sm text-gray-700 italic"},I={class:"col-span-2"},R={class:"col-span-2"},G={class:"col-span-2"},K={class:"flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-1 md:space-y-0 items-start md:items-center text-sm mt-2"},P={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},Q={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-amber-700"},W={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-sky-700"},X={key:1},Y={class:"grid grid-cols-2 border p-2 rounded-md shadow-md"},Z={class:"col-span-2 text-sm text-black font-semibold"},ee={class:"col-span-2 text-sm text-gray-700 italic"},te={class:"col-span-2"},se={class:"col-span-2"},oe={class:"col-span-2"},ae={class:"flex space-x-2 items-center text-sm mt-2"},re={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"},de={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-amber-700"},ie={class:"whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-sky-700"},ne=e("div",{class:"text-gray-900 text-xl font-medium"}," List \u0E17\u0E35\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A Log ",-1),ce={class:"flex flex-col justify-start"},le={layout:T},_e=Object.assign(le,{__name:"Index",props:{logs:{type:Object,required:!0,default:{}},sections:{type:Object,required:!0,default:{}},types:{type:Object,required:!0,default:{}},actions:{type:Object,required:!0,default:{}},filters:{type:Object}},setup(p){const c=p;let i=x(c.filters.search);g(i,d=>{$.get(route("admin.log.index"),{search:d},{preserveState:!0,replace:!0})}),f.extend(q);const n=x(!1),l=x([]),m=d=>{d==="type"?h(()=>{l.value=c.types.map(s=>s.type)}):d==="section"?h(()=>{l.value=c.sections.map(s=>s.section)}):d==="action"&&h(()=>{l.value=c.actions.map(s=>s.action)}),n.value=!n.value};return(d,s)=>(a(),r("div",L,[e("div",H,[S,k(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>j(i)?i.value=t:i=t),class:"text rounded-md border-gray-400 w-full",placeholder:"\u0E04\u0E49\u0E19\u0E08\u0E32\u0E01 Type, Action, Section \u0E2B\u0E23\u0E37\u0E2D Details"},null,512),[[B,b(i)]])]),e("div",U,[e("div",V,[e("label",{onClick:s[1]||(s[1]=t=>m("type")),for:"type",class:"block cursor-pointer text-sm text-white text-center font-medium bg-slate-700 tracking-wide border border-gray-700 rounded-2xl px-2"},"Type")]),e("div",A,[e("label",{onClick:s[2]||(s[2]=t=>m("action")),for:"action",class:"block cursor-pointer text-sm text-white text-center font-medium bg-amber-700 tracking-wide border border-gray-700 rounded-2xl px-2"},"Action")]),e("div",E,[e("label",{onClick:s[3]||(s[3]=t=>m("section")),for:"section",class:"block cursor-pointer text-sm text-white text-center font-medium bg-sky-700 tracking-wide border border-gray-700 rounded-2xl px-2"},"Section")])]),(a(!0),r(w,null,y(p.logs.data,(t,u)=>(a(),r("div",{key:u,class:"bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600 mb-1"},[t.person?(a(),r("div",F,[e("div",J,[e("div",N,"#"+o(t.id),1),e("div",z,o(b(f)(t.created_at).locale("th").format("D/MM/BBBB H:mm")),1),e("div",I,o(t.person.fname_th)+" "+o(t.person.lname_th),1),e("div",R,o(t.details),1),e("div",G,[e("div",K,[e("div",P,o(t.type),1),e("div",Q,o(t.action),1),e("div",W,o(t.section),1)])])])])):(a(),r("div",X,[e("div",Y,[e("div",Z,"#"+o(t.id),1),e("div",ee,o(b(f)(t.created_at).locale("th").format("D/MM/BBBB H:mm")),1),e("div",te,"Unknow-User ("+o(t.user)+")",1),e("div",se,o(t.details),1),e("div",oe,[e("div",ae,[e("div",re,o(t.type),1),e("div",de,o(t.action),1),e("div",ie,o(t.section),1)])])])]))]))),128)),v(C,{pagination:p.logs,class:"mt-1"},null,8,["pagination"]),(a(),M(O,{to:"body"},[v(D,{isModalOpen:n.value},{header:_(()=>[ne]),body:_(()=>[e("div",ce,[(a(!0),r(w,null,y(l.value,(t,u)=>(a(),r("li",{key:u,class:"text-sm"},o(t),1))),128))])]),footer:_(()=>[e("button",{onClick:s[4]||(s[4]=t=>n.value=!n.value),type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},"\u0E1B\u0E34\u0E14")]),_:1},8,["isModalOpen"])]))]))}});export{_e as default};
