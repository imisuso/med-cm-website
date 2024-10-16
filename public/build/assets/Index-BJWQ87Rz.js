import{r as a,T as C,C as D,c as f,a as e,w as M,v as $,u as d,D as B,d as u,e as i,h as z,j as F,F as O,f as V,_ as L,k as b,o as c,i as _,t as l,g as S}from"./app-D_J6jNxv.js";import{_ as T}from"./Modal-DbfpfNCa.js";import{_ as H}from"./Paginations-Bdc8MPAX.js";import{t as N}from"./style-Cced5V6y.js";const E={class:"flex flex-col p-4 w-full"},I={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},U={class:"flex space-x-2 mb-2"},q={class:"flex flex-row justify-start items-center"},A=["src"],R={class:"text-gray-900 text-md font-medium"},G=["src"],J={class:"flex w-full items-center justify-between ml-2"},K={class:"flex items-baseline"},P={class:"text-md mr-2"},Q={class:"text-md font-normal text-black"},W={class:"text-gray-600 text-sm"},X={class:"text-gray-600"},Y={class:"flex flex-col space-y-2 items-end sm:space-y-0 sm:flex-row sm:items-center space-x-1 ml-2"},Z=["onClick"],ee={layout:L},ie=Object.assign(ee,{__name:"Index",props:{divisions:{type:Object,required:!0},filters:{type:Object}},setup(g){const p=g,w="/fallbackimage/default-blank-image.jpg",x=a(null),y=a(base_url),v=a(!1);let n=a(p.filters.search);const r=C({id:null,name_th:null});D(n,s=>{b.get(route("admin.division"),{search:s},{preserveState:!0,replace:!0})});const h=(s,t,o)=>{N({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},m=s=>{v.value=s,s||r.reset()},k=s=>{x.value=s.image?s.image_url:`${y.value}${w}`,r.id=s.id,r.name_th=s.name_th,m(!0)},j=()=>{b.delete(route("admin.division.delete",r.id),{preserveState:!0,onSuccess:()=>{h("success","สำเร็จ","ลบข้อมูล สาขา/หน่วยงาน เรียบร้อย")},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;h("danger","พบปัญหา",t)},onFinish:()=>{r.processing=!1}}),m(!1)};return(s,t)=>(c(),f("div",E,[e("div",I,[t[3]||(t[3]=e("div",{class:"text-2xl font-bold"},"จัดการสาขา / หน่วยงาน",-1)),M(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>B(n)?n.value=o:n=o),class:"text rounded-md border-gray-400",placeholder:"ค้นหาจากชื่อหน่วย/สาขา"},null,512),[[$,d(n)]])]),e("div",U,[u(d(_),{href:s.route("admin.division.create"),method:"get",as:"button",type:"button",class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:i(()=>t[4]||(t[4]=[e("div",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})])],-1),e("div",null,"เพิ่ม",-1)])),_:1},8,["href"])]),(c(),z(F,{to:"body"},[u(T,{isModalOpen:v.value},{header:i(()=>t[5]||(t[5]=[e("div",{class:"text-gray-900 text-xl font-medium"}," คุณต้องการลบข้อมูลของ สาขา/หน่วยงาน ",-1)])),body:i(()=>[e("div",q,[e("img",{src:x.value,alt:"",class:"h-20 w-20 rounded-full object-cover mr-4"},null,8,A),e("div",R,l(d(r).name_th),1)])]),footer:i(()=>[e("button",{onClick:t[1]||(t[1]=o=>j()),type:"button",class:"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"ลบ"),e("button",{onClick:t[2]||(t[2]=o=>m(!1)),type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},"ยกเลิก")]),_:1},8,["isModalOpen"])])),(c(!0),f(O,null,V(p.divisions.data,o=>(c(),f("div",{key:o.id,class:"flex flex-col items-center space-y-4 sm:flex-row w-full px-4 py-2 mb-4 mx-auto bg-gradient-to-l from-sky-100 rounded-lg shadow-md"},[e("div",null,[e("img",{src:`${o.image_url}`,class:"h-20 w-20 rounded-full object-cover mr-4"},null,8,G)]),e("div",J,[e("div",K,[e("p",P,l(o.division_id)+".",1),e("span",Q,[S(l(o.name_th)+" ",1),e("p",W,"("+l(o.name_en)+")",1),e("p",X,"ประเภท : "+l(o.division_type),1)])]),e("div",Y,[u(d(_),{href:s.route("admin.division.edit",o.id),class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10"},{default:i(()=>t[6]||(t[6]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1)])),_:2},1032,["href"]),e("button",{onClick:te=>k(o),class:"flex items-center mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-full border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10"},t[7]||(t[7]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)]),8,Z)])])]))),128)),u(H,{pagination:g.divisions},null,8,["pagination"])]))}});export{ie as default};