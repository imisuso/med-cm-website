import{H as S,r as _,A as j,C as H,o,b as n,d as e,F as c,t as h,x as z,e as E,I as L,a as V,p as M,f as y,n as $,g as r,c as m,E as T,_ as q}from"./app.4b06ee76.js";import{_ as P,a as A,b as I,c as D,d as R,e as F,f as O,g as N}from"./BtContact.7ae7cdb8.js";import"./PersonService.3e6438c6.js";import"./style.8b0cc4ed.js";import"./index.4ef892bf.js";const U={class:"w-full flex items-center justify-between border bg-stone-400 p-2"},G=z(" Loading... "),J={key:0},K={key:1},Q=["disabled"],W=["disabled"],X={class:"right"},Y=z(" Show all pages "),Z={class:"app-content"},ee={__name:"EduContentPdfViewer",props:{pdfFile:{type:String,required:!0},allPages:{type:Boolean}},setup(l){const k=l,b=_(),u=_(!0),d=_(1),v=_(1),x=_(k.pdfFile),p=_(k.allPages?k.allPages:!1);j(()=>{d.value=p.value?null:1});const f=()=>{u.value=!1,v.value=b.value.pageCount};return(C,a)=>{const i=H("VuePdfEmbed");return o(),n(c,null,[e("div",U,[u.value?(o(),n(c,{key:0},[G],64)):(o(),n(c,{key:1},[e("div",null,[p.value?(o(),n("span",J,h(v.value)+" page(s) ",1)):(o(),n("span",K,[e("button",{disabled:d.value<=1,onClick:a[0]||(a[0]=t=>d.value--)},"\u276E",8,Q),z(" "+h(d.value)+" / "+h(v.value)+" ",1),e("button",{disabled:d.value>=v.value,onClick:a[1]||(a[1]=t=>d.value++)},"\u276F",8,W)]))]),e("label",X,[E(e("input",{"onUpdate:modelValue":a[2]||(a[2]=t=>p.value=t),type:"checkbox"},null,512),[[L,p.value]]),Y])],64))]),e("div",Z,[V(i,{ref_key:"pdfRef",ref:b,source:x.value,page:d.value,width:720,onRendered:f},null,8,["source","page"])])],64)}}};var te=S(ee,[["__scopeId","data-v-a35d6004"]]);const oe={class:"flex flex-wrap justify-center"},se={class:"w-full md:mx-5"},ne={class:"flex items-center justify-between mt-5 ml-2 text-2xl text-orange-800 font-bold"},ie={class:"flex space-x-4 mx-5"},ae=e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"},null,-1),re=[ae],le=e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 10h16M4 14h16M4 18h16"},null,-1),de=[le],ce={class:"flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col"},_e={key:0,class:"mb-2 mx-2 last:mr-0 flex-auto text-left"},he=["onClick"],ue=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-black mr-2",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{d:"M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"})],-1),ve={class:"border-b-2"},me={class:"px-4 py-5 flex-auto"},pe={class:"tab-content tab-space"},fe={key:0},ke={key:0,class:"mb-5"},be={class:"flex items-center"},ye={class:"text-blue-600 font-bold text-lg"},xe=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-blue-600 ml-2",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})],-1),we={class:"ql-container ql-snow"},ge=["innerHTML"],ze={key:1},Ce={key:0,class:"mb-5"},Be={class:"flex items-center"},$e={class:"text-blue-600 font-bold text-lg"},Ve=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-blue-600 ml-2",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})],-1),Se={class:"flex flex-col space-y-4"},je={class:"flex items-center place-self-start"},He=T('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve"><g transform="translate(128 128) scale(0.72 0.72)" style=""><g style="stroke:none;stroke-width:0;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:none;fill-rule:nonzero;opacity:1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"><path d="M 11.194 73.946 v 11.506 c 0 2.508 2.04 4.548 4.548 4.548 h 58.517 c 2.508 0 4.548 -2.04 4.548 -4.548 V 20.496 c 0 -1.214 -0.473 -2.356 -1.332 -3.216 L 61.526 1.332 C 60.667 0.473 59.525 0 58.31 0 H 15.742 c -2.508 0 -4.548 2.04 -4.548 4.548 V 43.16 l 0 0 V 73.946 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(220,223,225);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 11.194 62.716 v 11.23 v 11.506 c 0 2.508 2.04 4.548 4.548 4.548 h 58.517 c 2.508 0 4.548 -2.04 4.548 -4.548 V 62.716 H 11.194 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(234,84,64);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><polygon points="60.27,18.41 78.81,36.88 78.73,19.73 " style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(196,203,210);fill-rule:nonzero;opacity:1;" transform="  matrix(1 0 0 1 0 0) "></polygon><path d="M 77.474 17.28 L 61.526 1.332 c -0.675 -0.676 -1.529 -1.102 -2.453 -1.258 v 15.382 c 0 2.358 1.919 4.277 4.277 4.277 h 15.382 C 78.576 18.81 78.15 17.956 77.474 17.28 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(171,178,184);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 28.384 54.013 c -0.975 0 -1.617 -0.521 -1.969 -0.927 l -0.153 -0.237 c -0.731 -1.587 -1.05 -4.074 1.585 -6.904 c 2.191 -2.352 5.948 -4.403 10.226 -5.974 c 1.533 -2.849 2.967 -5.907 4.113 -8.825 c -2.735 -4.496 -3.877 -9.224 -2.75 -12.321 c 0.598 -1.644 1.835 -2.678 3.484 -2.913 l 0.141 -0.01 c 1.802 0 3.046 1.04 3.505 2.927 c 0.643 2.649 -0.341 7.154 -2.165 12.069 c 0.722 1.102 1.562 2.202 2.52 3.269 c 0.895 1.08 1.81 2.053 2.725 2.923 c 4.618 -0.64 8.813 -0.58 11.377 0.388 c 2.61 0.985 3.199 2.638 3.234 3.852 v 0.02 c 0.013 1.579 -0.773 2.774 -2.158 3.279 c -2.785 1.017 -8.033 -0.816 -13.155 -5.45 c -3.123 0.496 -6.419 1.315 -9.465 2.381 c -3.188 5.785 -6.785 10.645 -9.375 11.982 C 29.443 53.882 28.872 54.013 28.384 54.013 z M 28.016 51.87 c 0.16 0.141 0.458 0.261 1.17 -0.105 c 1.955 -1.009 4.701 -4.577 7.346 -9.059 c -3.032 1.31 -5.612 2.874 -7.222 4.602 C 27.828 48.9 27.403 50.395 28.016 51.87 z M 51.633 38.827 c 4.195 3.348 8.097 4.538 9.778 3.923 c 0.396 -0.145 0.85 -0.432 0.845 -1.375 c -0.01 -0.337 -0.058 -1.316 -1.94 -2.026 C 58.329 38.6 55.191 38.467 51.633 38.827 z M 43.521 33.146 c -0.81 1.969 -1.731 3.967 -2.717 5.907 c 2.102 -0.644 4.271 -1.172 6.397 -1.567 c -0.606 -0.631 -1.206 -1.302 -1.795 -2.013 C 44.731 34.722 44.101 33.943 43.521 33.146 z M 43.132 17.904 c -0.882 0.147 -1.477 0.673 -1.816 1.605 c -0.719 1.975 -0.145 5.453 1.781 9.167 c 1.34 -3.902 2.018 -7.339 1.524 -9.374 C 44.334 18.119 43.742 17.917 43.132 17.904 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(234,84,64);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 33.092 68.571 h -4.374 c -0.552 0 -1 0.447 -1 1 v 8.091 v 5.541 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -4.541 h 3.374 c 2.117 0 3.838 -1.722 3.838 -3.838 v -2.415 C 36.93 70.293 35.208 68.571 33.092 68.571 z M 34.93 74.824 c 0 1.014 -0.825 1.838 -1.838 1.838 h -3.374 v -6.091 h 3.374 c 1.014 0 1.838 0.824 1.838 1.838 V 74.824 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(255,255,255);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 45.351 84.203 H 41.27 c -0.552 0 -1 -0.447 -1 -1 V 69.571 c 0 -0.553 0.448 -1 1 -1 h 4.082 c 2.278 0 4.13 1.853 4.13 4.13 v 7.371 C 49.481 82.35 47.629 84.203 45.351 84.203 z M 42.27 82.203 h 3.082 c 1.174 0 2.13 -0.956 2.13 -2.131 v -7.371 c 0 -1.175 -0.956 -2.13 -2.13 -2.13 H 42.27 V 82.203 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(255,255,255);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 61.282 68.571 H 54.07 c -0.553 0 -1 0.447 -1 1 v 13.632 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 v -5.816 h 3.723 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 55.07 v -4.815 h 6.212 c 0.553 0 1 -0.447 1 -1 S 61.835 68.571 61.282 68.571 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:rgb(255,255,255);fill-rule:nonzero;opacity:1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></g></svg>',1),Ee={class:"px-2"},Le=["onClick"],Me={class:"hidden md:block"},Te={key:1},qe={class:"flex items-center"},Pe={class:"text-blue-600 font-bold text-lg"},Ae=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-blue-600 ml-2",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})],-1),Ie={class:"ql-container ql-snow"},De=["innerHTML"],Re={layout:q},Ke=Object.assign(Re,{__name:"BranchDetails",props:{branch:{type:Object,required:!0},branch_main_menu:{type:Array,required:!0},branch_sub_menu:{type:Array,required:!0}},setup(l){const k=l;M(()=>{u.value=k.branch_main_menu,d.value=k.branch_sub_menu});const b=["\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B"],u=_([]),d=_([]),v=_();_(base_url);const x=(a,i)=>{v.value=a,u.value[i].isActive=!u.value[i].isActive},p=a=>{u.value.forEach(i=>{i.isActive=a})},f=a=>{let i;return i=d.value.find(t=>t.main_header_id===a),i},C=(a,i)=>{axios({url:route("edu_content_download_pdf"),method:"GET",params:{pdf_file:a,t:new Date().getTime()},responseType:"arraybuffer"}).then(t=>{let w=new Blob([t.data],{type:"application/pdf"}),s=document.createElement("a");s.href=window.URL.createObjectURL(w),s.download=i,s.click()})};return(a,i)=>(o(),n("div",oe,[e("div",se,[e("div",ne,[e("div",null," \u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"+h(l.branch.name_th),1),e("div",ie,[(o(),n("svg",{onClick:i[0]||(i[0]=t=>p(!0)),class:"h-6 w-6 text-emerald-500 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},re)),(o(),n("svg",{onClick:i[1]||(i[1]=t=>p(!1)),class:"h-6 w-6 text-emerald-500 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},de))])]),e("ul",ce,[(o(!0),n(c,null,y(u.value,(t,w)=>(o(),n(c,{key:t.main_header_id},[t.status?(o(),n("li",_e,[e("a",{class:$(["transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-104 text-xl font-bold uppercase px-5 py-2 shadow-lg rounded leading-normal flex items-center cursor-pointer",{"text-blue-600 bg-white":v.value!==t.main_header_id,"text-white bg-blue-600":v.value===t.main_header_id}]),onClick:s=>x(t.main_header_id,w)},[ue,e("div",ve,h(t.main_header_name_th),1)],10,he),e("div",{class:$(["relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded",[t.isActive?"block":"hidden"]])},[e("div",me,[e("div",pe,[t.component_name==="BtAbout"?(o(),n("div",fe,[(o(!0),n(c,null,y(d.value,s=>(o(),n(c,{key:s.sub_header_id},[s.status&&s.main_header_id===1?(o(),n("div",ke,[e("div",be,[e("div",ye,h(s.sub_header_name_th),1),xe]),e("div",we,[e("div",{class:"ql-editor",innerHTML:s.detail_html},null,8,ge)])])):r("",!0)],64))),128))])):r("",!0),t.component_name==="BtEdu"?(o(),n("div",ze,[(o(!0),n(c,null,y(d.value,s=>(o(),n(c,{key:s.sub_header_id},[s.status&&s.main_header_id===2&&!b.includes(s.sub_header_name_th)?(o(),n("div",Ce,[e("div",Be,[e("div",$e,h(s.sub_header_name_th),1),Ve]),e("div",Se,[s!=null&&s.attach_files?(o(!0),n(c,{key:0},y(s.attach_files,(g,B)=>(o(),n("div",{key:B,class:"flex flex-col items-center border mt-2"},[e("div",je,[He,e("div",Ee,h(g.orig_name),1),e("button",{onClick:Fe=>C(g.unique_name,g.orig_name),class:"border rounded-md shadow-md bg-emerald-400 px-2 py-1 my-1"},"Download",8,Le)]),e("div",Me,[V(te,{allPages:!1,pdfFile:`${s.json_array_field_transform[B].url}`},null,8,["pdfFile"])])]))),128)):r("",!0)])])):s.status&&s.main_header_id===2?(o(),n("div",Te,[e("div",qe,[e("div",Pe,h(s.sub_header_name_th),1),Ae]),e("div",Ie,[e("div",{class:"ql-editor",innerHTML:s.detail_html},null,8,De)])])):r("",!0)],64))),128))])):r("",!0),t.component_name==="BtProfessor"?(o(),m(P,{key:2,division_id:parseInt(l.branch.division_id)},null,8,["division_id"])):r("",!0),t.component_name==="BtDoctor"?(o(),m(A,{key:3,division_id:parseInt(l.branch.division_id)},null,8,["division_id"])):r("",!0),t.component_name==="BtOfficer"?(o(),m(I,{key:4,division_id:parseInt(l.branch.division_id)},null,8,["division_id"])):r("",!0),t.component_name==="BtResearch"?(o(),m(D,{key:5,division_id:parseInt(l.branch.division_id),branchSubMenu:f(t.main_header_id),display_content:""},null,8,["division_id","branchSubMenu"])):r("",!0),t.component_name==="BtBranchService"?(o(),m(R,{key:6,division_id:parseInt(l.branch.division_id),branchSubMenu:f(t.main_header_id),display_content:""},null,8,["division_id","branchSubMenu"])):r("",!0),t.component_name==="BtAcademicService"?(o(),m(F,{key:7,division_id:parseInt(l.branch.division_id),branchSubMenu:f(t.main_header_id),display_content:""},null,8,["division_id","branchSubMenu"])):r("",!0),t.component_name==="BtLink"?(o(),m(O,{key:8,division_id:parseInt(l.branch.division_id),branchSubMenu:f(t.main_header_id),display_content:""},null,8,["division_id","branchSubMenu"])):r("",!0),t.component_name==="BtContact"?(o(),m(N,{key:9,division_id:parseInt(l.branch.division_id),branchSubMenu:f(t.main_header_id),display_content:""},null,8,["division_id","branchSubMenu"])):r("",!0)])])],2)])):r("",!0)],64))),128))])])]))}});export{Ke as default};
