import{r as p,h as u,w as b,o as c,b as w,d as e,n as g,e as v,v as m,j as x,t as h,g as f,J as y,k as _}from"./app.10fb5b53.js";const k={class:"inline-flex justify-center md:justify-end items-center mb-2"},j={key:0,class:"flex space-x-1 items-top"},C=["disabled"],B=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11 19l-7-7 7-7m8 14l-7-7 7-7"})],-1),M=[B],$=["disabled"],P=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 19l-7-7 7-7"})],-1),V=[P],J={class:"flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-1"},N=e("div",{class:"px-2 text-gray-600 lg:text-sm"},"\u0E2B\u0E19\u0E49\u0E32 ",-1),S=["max"],D={class:"px-2 text-gray-600 lg:text-sm"},K=["disabled"],q=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1),z=[q],E=["disabled"],O=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 5l7 7-7 7M5 5l7 7-7 7"})],-1),T=[O],U={class:"ml-2 text-sm text-gray-600 place-self-center hidden md:block"},F={__name:"Paginations",props:{pagination:{type:Object,required:!0,default:{}}},setup(o){const r=o,l=p(r.pagination.current_page),s=d=>{y.get(_().url,{page:d},{preserveState:!0,preserveScroll:!0})},i=u(()=>r.pagination.current_page-1<=0),a=u(()=>r.pagination.current_page+1>r.pagination.last_page);return b(()=>r.pagination.current_page,(d,t)=>{l.value=d}),(d,t)=>(c(),w("div",k,[o.pagination.last_page>1?(c(),w("div",j,[e("button",{disabled:i.value,class:g([{"opacity-50":i.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 lg:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:t[0]||(t[0]=n=>s(1))},M,10,C),e("button",{disabled:i.value,class:g([{"opacity-50":i.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:t[1]||(t[1]=n=>s(o.pagination.current_page-1))},V,10,$),e("div",J,[N,v(e("input",{type:"number",onKeydown:t[2]||(t[2]=x(n=>s(l.value),["enter"])),onChange:t[3]||(t[3]=n=>s(l.value)),"onUpdate:modelValue":t[4]||(t[4]=n=>l.value=n),min:"1",max:o.pagination.last_page,class:"px-2 w-16 h-11 text-center rounded border border-gray-400 shadow-sm lg:h-9 lg:w-16 lg:text-sm focus:ring-blue-500 focus:border-blue-500"},null,40,S),[[m,l.value]]),e("div",D,"\u0E08\u0E32\u0E01 "+h(o.pagination.last_page),1)]),e("button",{disabled:a.value,class:g([{"opacity-50":a.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:t[5]||(t[5]=n=>s(o.pagination.current_page+1))},z,10,K),e("button",{disabled:a.value,class:g([{"opacity-50":a.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:t[6]||(t[6]=n=>s(o.pagination.last_page))},T,10,E)])):f("",!0),e("div",U,"\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 "+h(o.pagination.total)+" \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",1)]))}};export{F as _};
