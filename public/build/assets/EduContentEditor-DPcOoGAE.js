import{r as C,l as j,T as F,c as l,a as e,t as x,g as i,d as B,e as z,u as h,F as v,f as g,b,q as M,o as d,i as V}from"./app-D_J6jNxv.js";import{t as E}from"./style-Cced5V6y.js";const H={class:"flex flex-col p-4 w-full"},L={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},S={class:"flex items-center text-2xl font-bold space-x-2"},N={class:"flex"},$={key:0,class:"col-span-6"},D={class:"my-1"},I={class:"flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md"},T={class:"flex flex-col"},q={class:"p-2"},A={class:"flex items-center m-2 sm:m-0"},O=["onClick"],P={class:"flex justify-center"},R=["src"],U={class:"col-span-6"},G={class:"my-1"},J={class:"flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md"},K={class:"flex flex-col"},Q={class:"p-2"},W={class:"flex items-center m-2 sm:m-0"},X=["id","onChange"],Y=["onClick"],Z={key:0,class:"flex justify-center"},ee=["src"],oe={__name:"EduContentEditor",props:{sub_header:{type:Object,required:!0}},setup(f){var _;const a=f;C(base_url);const n=j([]),c=F({id:a.sub_header.id,old_attachments:((_=a.sub_header)==null?void 0:_.attach_files)??[]}),w=()=>{n.push({name:"กรุณาเลือกไฟล์",size:0}),M(()=>{var s="file-"+(n.length-1);document.getElementById(s).click()})},u=(s,t)=>{s.splice(t,1)},y=(s,t,r)=>{let o=r.target.files[0];t.File=o,t.name=o.name,t.size=o.size,t.embedSrc=URL.createObjectURL(o),t.size>1024*1024*5&&(u(n,s),m("warning","เพิ่มไฟล์แนบไม่ได้","ไฟล์ของคุณใหญ่เกินไป (> 5MB)")),o.type.match("application/pdf")||(u(n,s),m("warning","เพิ่มไฟล์แนบไม่ได้","อนุญาตให้แนบไฟล์เฉพาะ PDF เท่านั้น"))},m=(s,t,r)=>{E({title:t,description:r},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=()=>{c.transform(s=>({...s,division_id:a.sub_header.division_id,atFiles:n.map(t=>t.File)})).post(route("admin.update_edu_branch_content",c.id),{preserveState:!1,onSuccess:()=>{m("success","จัดเก็บสำเร็จ",`จัดเก็บไฟล์ PDF ${a.sub_header.sub_header_name_th} เรียบร้อย`)},onError:s=>{m("danger",s.msg,s.sysmsg)},onFinish:()=>{}})};return(s,t)=>(d(),l("div",H,[e("div",L,[e("div",S,[e("div",null,"งานการเรียนการสอน ("+x(f.sub_header.sub_header_name_th)+")",1),e("button",{onClick:w,class:"flex add items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"},t[0]||(t[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})],-1),i(" เพิ่มไฟล์แนบ ")]))]),e("div",N,[e("button",{onClick:k,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},t[1]||(t[1]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),i(" บันทึก ")])),B(h(V),{href:s.route("admin.show_branch_main_menu",a.sub_header.division_id),method:"post",as:"button",type:"button","preserve-scroll":""},{default:z(()=>t[2]||(t[2]=[e("button",{class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),i(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),i(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]),i(" ยกเลิก ")],-1)])),_:1},8,["href"])])]),h(c).old_attachments?(d(),l("div",$,[e("ul",null,[(d(!0),l(v,null,g(h(c).old_attachments,(r,o)=>(d(),l("li",{key:o},[e("div",D,[e("div",I,[e("div",T,[e("div",q,[t[3]||(t[3]=e("strong",null,"ชื่อไฟล์ : ",-1)),i(x(r.orig_name),1)])]),e("div",A,[e("a",{href:"#",onClick:p=>u(h(c).old_attachments,o),class:"flex items-center text-sm text-red-600 px-2 py-2"},t[4]||(t[4]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 hover:fill-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)]),8,O)])]),e("div",P,[e("embed",{src:`${f.sub_header.json_array_field_transform[o].url}`,width:"800px",height:"800px"},null,8,R)])])]))),128))])])):b("",!0),e("div",U,[e("ul",null,[(d(!0),l(v,null,g(n,(r,o)=>(d(),l("li",{key:o},[e("div",G,[e("div",J,[e("div",K,[e("div",Q,[t[5]||(t[5]=e("strong",null,"ชื่อไฟล์ : ",-1)),i(x(r.name),1)])]),e("div",W,[e("label",null,[t[6]||(t[6]=e("span",{class:"p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white"},"เลือกไฟล์",-1)),e("input",{id:"file-"+o,type:"file",accept:".pdf",onChange:p=>y(o,r,p),style:{display:"none"}},null,40,X)]),e("a",{href:"#",onClick:p=>u(n,o),class:"flex items-center text-sm text-red-600 px-2 py-2"},t[7]||(t[7]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 hover:fill-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)]),8,Y)])]),n[o].name!=="กรุณาเลือกไฟล์"?(d(),l("div",Z,[e("embed",{src:r.embedSrc,width:"800px",height:"800px"},null,8,ee)])):b("",!0)])]))),128))])])]))}};export{oe as default};
