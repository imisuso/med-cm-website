import{r as j,E as F,G as B,o as i,d as l,e,t as p,j as z,k as M,u,L as V,F as g,f as b,m as d,g as w,H as L}from"./app.5ef6262d.js";import{t as E}from"./style.41f80f12.js";const H={class:"flex flex-col p-4 w-full"},S={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},N={class:"flex items-center text-2xl font-bold space-x-2"},$=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})],-1),D=d(" \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1F\u0E25\u0E4C\u0E41\u0E19\u0E1A "),I=[$,D],A={class:"flex"},O=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),P=d(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),R=[O,P],T=e("button",{class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),d(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),d(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]),d(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],-1),U={key:0,class:"col-span-6"},q={class:"my-1"},G={class:"flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md"},J={class:"flex flex-col"},K={class:"p-2"},Q=e("strong",null,"\u0E0A\u0E37\u0E48\u0E2D\u0E44\u0E1F\u0E25\u0E4C : ",-1),W={class:"flex items-center m-2 sm:m-0"},X=["onClick"],Y=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 hover:fill-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1),Z=[Y],ee={class:"flex justify-center"},te=["src"],se={class:"col-span-6"},oe={class:"my-1"},ne={class:"flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md"},re={class:"flex flex-col"},ie={class:"p-2"},le=e("strong",null,"\u0E0A\u0E37\u0E48\u0E2D\u0E44\u0E1F\u0E25\u0E4C : ",-1),de={class:"flex items-center m-2 sm:m-0"},ce=e("span",{class:"p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white"},"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C",-1),ae=["id","onChange"],he=["onClick"],me=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 hover:fill-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1),ue=[me],_e={key:0,class:"flex justify-center"},fe=["src"],ve={__name:"EduContentEditor",props:{sub_header:{type:Object,required:!0}},setup(_){var x,v;const c=_;j(base_url);const r=F([]),a=B({id:c.sub_header.id,old_attachments:(v=(x=c.sub_header)==null?void 0:x.attach_files)!=null?v:[]}),y=()=>{r.push({name:"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C",size:0}),L(()=>{var t="file-"+(r.length-1);document.getElementById(t).click()})},h=(t,o)=>{t.splice(o,1)},k=(t,o,n)=>{let s=n.target.files[0];o.File=s,o.name=s.name,o.size=s.size,o.embedSrc=URL.createObjectURL(s),o.size>1024*1024*5&&(h(r,t),m("warning","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1F\u0E25\u0E4C\u0E41\u0E19\u0E1A\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49","\u0E44\u0E1F\u0E25\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (> 5MB)")),s.type.match("application/pdf")||(h(r,t),m("warning","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1F\u0E25\u0E4C\u0E41\u0E19\u0E1A\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49","\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E2B\u0E49\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30 PDF \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19"))},m=(t,o,n)=>{E({title:o,description:n},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},C=()=>{a.transform(t=>({...t,division_id:c.sub_header.division_id,atFiles:r.map(o=>o.File)})).post(route("admin.update_edu_branch_content",a.id),{preserveState:!1,onSuccess:()=>{m("success","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",`\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E1F\u0E25\u0E4C PDF ${c.sub_header.sub_header_name_th} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22`)},onError:t=>{m("danger",t.msg,t.sysmsg)},onFinish:()=>{}})};return(t,o)=>(i(),l("div",H,[e("div",S,[e("div",N,[e("div",null,"\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E19 ("+p(_.sub_header.sub_header_name_th)+")",1),e("button",{onClick:y,class:"flex add items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"},I)]),e("div",A,[e("button",{onClick:C,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},R),z(u(V),{href:t.route("admin.show_branch_main_menu",c.sub_header.division_id),method:"post",as:"button",type:"button","preserve-scroll":""},{default:M(()=>[T]),_:1},8,["href"])])]),u(a).old_attachments?(i(),l("div",U,[e("ul",null,[(i(!0),l(g,null,b(u(a).old_attachments,(n,s)=>(i(),l("li",{key:s},[e("div",q,[e("div",G,[e("div",J,[e("div",K,[Q,d(p(n.orig_name),1)])]),e("div",W,[e("a",{href:"#",onClick:f=>h(u(a).old_attachments,s),class:"flex items-center text-sm text-red-600 px-2 py-2"},Z,8,X)])]),e("div",ee,[e("embed",{src:`${_.sub_header.json_array_field_transform[s].url}`,width:"800px",height:"800px"},null,8,te)])])]))),128))])])):w("",!0),e("div",se,[e("ul",null,[(i(!0),l(g,null,b(r,(n,s)=>(i(),l("li",{key:s},[e("div",oe,[e("div",ne,[e("div",re,[e("div",ie,[le,d(p(n.name),1)])]),e("div",de,[e("label",null,[ce,e("input",{id:"file-"+s,type:"file",accept:".pdf",onChange:f=>k(s,n,f),style:{display:"none"}},null,40,ae)]),e("a",{href:"#",onClick:f=>h(r,s),class:"flex items-center text-sm text-red-600 px-2 py-2"},ue,8,he)])]),r[s].name!=="\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C"?(i(),l("div",_e,[e("embed",{src:n.embedSrc,width:"800px",height:"800px"},null,8,fe)])):w("",!0)])]))),128))])])]))}};export{ve as default};
