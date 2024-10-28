import{r as b,A as u,C as v,o as w,c,a as t,n as d,w as m,v as x,Y as f,t as p,b as h,k as y,Q as k}from"./app-DEgVFtT5.js";const C={class:"inline-flex justify-center md:justify-end items-center mb-2"},j={key:0,class:"flex space-x-1 items-top"},B=["disabled"],M=["disabled"],$={class:"flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-1"},P=["max"],V={class:"px-2 text-gray-600 lg:text-sm"},N=["disabled"],S=["disabled"],D={class:"ml-2 text-sm text-gray-600 place-self-center hidden md:block"},q={__name:"Paginations",props:{pagination:{type:Object,required:!0,default:{}}},setup(n){const r=n,l=b(r.pagination.current_page),s=g=>{y.get(k().url,{page:g},{preserveState:!0,preserveScroll:!0})},i=u(()=>r.pagination.current_page-1<=0),a=u(()=>r.pagination.current_page+1>r.pagination.last_page);return v(()=>r.pagination.current_page,(g,e)=>{l.value=g}),(g,e)=>(w(),c("div",C,[n.pagination.last_page>1?(w(),c("div",j,[t("button",{disabled:i.value,class:d([{"opacity-50":i.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 lg:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:e[0]||(e[0]=o=>s(1))},e[7]||(e[7]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11 19l-7-7 7-7m8 14l-7-7 7-7"})],-1)]),10,B),t("button",{disabled:i.value,class:d([{"opacity-50":i.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:e[1]||(e[1]=o=>s(n.pagination.current_page-1))},e[8]||(e[8]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 19l-7-7 7-7"})],-1)]),10,M),t("div",$,[e[9]||(e[9]=t("div",{class:"px-2 text-gray-600 lg:text-sm"},"หน้า ",-1)),m(t("input",{type:"number",onKeydown:e[2]||(e[2]=f(o=>s(l.value),["enter"])),onChange:e[3]||(e[3]=o=>s(l.value)),"onUpdate:modelValue":e[4]||(e[4]=o=>l.value=o),min:"1",max:n.pagination.last_page,class:"px-2 w-16 h-11 text-center rounded border border-gray-400 shadow-sm lg:h-9 lg:w-16 lg:text-sm focus:ring-blue-500 focus:border-blue-500"},null,40,P),[[x,l.value]]),t("div",V,"จาก "+p(n.pagination.last_page),1)]),t("button",{disabled:a.value,class:d([{"opacity-50":a.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:e[5]||(e[5]=o=>s(n.pagination.current_page+1))},e[10]||(e[10]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1)]),10,N),t("button",{disabled:a.value,class:d([{"opacity-50":a.value},"inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"]),onClick:e[6]||(e[6]=o=>s(n.pagination.last_page))},e[11]||(e[11]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-4 h-4 lg:h-3 lg:w-3",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 5l7 7-7 7M5 5l7 7-7 7"})],-1)]),10,S)])):h("",!0),t("div",D,"รวมทั้งหมด "+p(n.pagination.total)+" รายการ",1)]))}};export{q as _};
