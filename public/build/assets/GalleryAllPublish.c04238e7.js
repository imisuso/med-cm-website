import{r as g,w as p,o as i,b as n,d as e,a as s,u as a,V as _,e as x,v as b,i as w,F as y,f as v,q as c,D as m,t as u,s as B,_ as j,J as k}from"./app.289a7401.js";import{_ as f}from"./Paginations.a1cea1ce.js";import{d as h}from"./th.6f4ebd2a.js";import{b as M}from"./buddhistEra.6a16849e.js";import{r as V}from"./SearchIcon.3f5a8397.js";const D={class:"px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"},N={class:"flex flex-col items-start"},O={class:"text-2xl font-medium text-white title-font mb-2 p-3 bg-gradient-to-r from-green-800 to-green-600 rounded-md shadow-md flex flex-col md:flex-row gap-2 md:items-center md:justify-between w-full"},S={class:"flex items-center"},A=e("div",{class:"flex items-center ml-2"},"\u0E23\u0E39\u0E1B\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21",-1),E={class:"relative flex items-center text-gray-400 focus-within:text-gray-600"},F={class:"grid gap-8 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full"},J={class:""},T=["src"],$={class:"p-5 border border-b-0"},q={class:"mb-3 text-sm font-semibold tracking-wide uppercase"},C={class:"text-gray-600 underline"},G={class:"mb-2 text-gray-700"},L=B(" \u0E04\u0E25\u0E34\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E2D\u0E31\u0E25\u0E1A\u0E31\u0E49\u0E21 "),P={layout:j},Q=Object.assign(P,{__name:"GalleryAllPublish",props:{galleries:{type:Object,default:{}},filters:{type:Object}},setup(r){let l=g(r.filters.search);return p(l,o=>{k.get(route("gallery_all_publish"),{search:o},{preserveState:!0,replace:!0})}),h.extend(M),(o,d)=>(i(),n("div",D,[e("div",N,[e("div",O,[e("div",S,[s(a(_),{class:"h-6 w-6"}),A]),e("div",E,[s(a(V),{class:"w-5 h-5 absolute ml-3 pointer-events-none"}),x(e("input",{"onUpdate:modelValue":d[0]||(d[0]=t=>w(l)?l.value=t:l=t),type:"text",placeholder:"\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E23\u0E39\u0E1B\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21",autocomplete:"off","aria-label":"Search Announce",class:"pr-3 pl-10 w-full md:w-72 lg:w-96 rounded-2xl font-semibold placeholder-gray-500 text-black border-none ring-2 ring-gray-300 focus:ring-gray-500 focus-ring-2"},null,512),[[b,a(l)]])])]),s(f,{pagination:r.galleries,class:"mt-2 mb-4 self-center md:self-end"},null,8,["pagination"]),e("div",F,[(i(!0),n(y,null,v(r.galleries.data,t=>(i(),n("div",{key:t.id,class:"overflow-hidden transition-shadow duration-300 bg-white rounded shadow-lg"},[e("div",J,[s(a(m),{href:o.route("show_gallery",t.id)},{default:c(()=>[e("img",{class:"object-contain bg-gray-300 backdrop-blur-lg drop-shadow-lg border rounded-md w-full md:h-40",src:t.cover_url,alt:""},null,8,T)]),_:2},1032,["href"])]),e("div",$,[e("p",q,[e("span",C,u(a(h)(t.event_date).locale("th").format("D MMMM BBBB")),1)]),e("p",G,u(t.desc),1),s(a(m),{href:o.route("show_gallery",t.id),class:"inline-flex items-center font-semibold transition-colors duration-200 text-blue-500 hover:text-blue-700"},{default:c(()=>[L]),_:2},1032,["href"])])]))),128))]),s(f,{pagination:r.galleries,class:"mt-4 self-center md:self-end"},null,8,["pagination"])])]))}});export{Q as default};
