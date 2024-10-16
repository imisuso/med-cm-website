import{o as r,h as x,d as o,r as h,C as g,c as a,a as e,u as i,w,v as _,D as b,F as k,f as v,E as y,k as B,t as c,b as m}from"./app-D_J6jNxv.js";import{_ as u}from"./Paginations-Bdc8MPAX.js";import{d as f}from"./th-DPrATXDJ.js";import{b as M}from"./buddhistEra-DYtM2EP1.js";import{r as j}from"./SearchIcon-B6_SV8D2.js";function V(l,p){return r(),x("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor","aria-hidden":"true"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"})])}const L={class:"px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"},z={class:"flex flex-col items-start"},C={class:"text-2xl font-medium text-white title-font mb-2 p-3 bg-gradient-to-r from-green-800 to-green-600 rounded-md shadow-md flex flex-col md:flex-row gap-2 md:items-center md:justify-between w-full"},D={class:"flex items-center"},H={class:"relative flex items-center text-gray-400 focus-within:text-gray-600"},A={key:0,class:"w-full mb-2 bg-white rounded-md border border-gray-400 border-l-4 border-l-teal-600"},E={class:"text-gray-500 italic inline-flex items-center px-2 text-xs"},F={class:"flex flex-col items-start shadow-md rounded-md"},N={key:0,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",class:"h-5 w-5 text-red-500 shrink-0 ml-2",width:"256",height:"256",viewBox:"0 0 256 256","xml:space":"preserve"},O=["href"],S={class:"leading-relaxed text-md text-black font-bold p-2 hover:text-indigo-700 cursor-pointer"},$={layout:y},G=Object.assign($,{__name:"AnnounceAllPublish",props:{announcements:{type:Object,default:{}},filters:{type:Object}},setup(l){let n=h(l.filters.search);return g(n,d=>{B.get(route("announce_all_publish"),{search:d},{preserveState:!0,replace:!0})}),f.extend(M),(d,s)=>(r(),a("div",L,[e("div",z,[e("div",C,[e("div",D,[o(i(V),{class:"h-6 w-6"}),s[1]||(s[1]=e("div",{class:"flex items-center ml-2"},"ข่าวประชาสัมพันธ์",-1))]),e("div",H,[o(i(j),{class:"w-5 h-5 absolute ml-3 pointer-events-none"}),w(e("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>b(n)?n.value=t:n=t),type:"text",placeholder:"ค้นหาข่าวประชาสัมพันธ์",autocomplete:"off","aria-label":"Search Announce",class:"pr-3 pl-10 w-full md:w-72 lg:w-96 rounded-2xl font-semibold placeholder-gray-500 text-black border-none ring-2 ring-gray-300 focus:ring-gray-500 focus-ring-2"},null,512),[[_,i(n)]])])]),o(u,{pagination:l.announcements,class:"mt-2 mb-4 self-center md:self-end"},null,8,["pagination"]),(r(!0),a(k,null,v(l.announcements.data,t=>(r(),a("div",{key:t.id,class:"flex flex-wrap md:flex-nowrap w-full"},[t.publish_status?(r(),a("div",A,[e("a",E,c(i(f)(t.publish_date).locale("th").format("D MMMM BBBB เวลา H:mm")),1),e("div",F,[t.pinned?(r(),a("svg",N,s[2]||(s[2]=[e("g",{transform:"translate(128 128) scale(0.72 0.72)",style:{}},[e("g",{style:{stroke:"none","stroke-width":"0","stroke-dasharray":"none","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"10",fill:"none","fill-rule":"nonzero",opacity:"1"},transform:"translate(-175.05 -175.05000000000004) scale(3.89 3.89)"},[e("path",{d:"M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z",style:{stroke:"none","stroke-width":"1","stroke-dasharray":"none","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"10",fill:"rgb(175,0,0)","fill-rule":"nonzero",opacity:"1"},transform:" matrix(1 0 0 1 0 0) ","stroke-linecap":"round"})])],-1)]))):m("",!0),e("a",{href:d.route("announce_details",t.slug),target:"_blank"},[e("p",S,c(t.topic),1)],8,O)])])):m("",!0)]))),128)),o(u,{pagination:l.announcements,class:"mt-4 self-center md:self-end"},null,8,["pagination"])])]))}});export{G as default};
