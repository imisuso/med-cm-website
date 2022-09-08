import{P as V}from"./PersonService.3e6438c6.js";import{H as A,o as a,b as c,p as J,r as x,a as S,F as z,f as H,d as e,t as y,q as F,J as T,K as N,M as O,C as Q,e as b,N as w,x as p,u as D,v as R}from"./app.4b06ee76.js";import{t as I}from"./style.8b0cc4ed.js";import{B as P,d as W}from"./index.4ef892bf.js";const Y={},K={class:"w-32 px-2 py-1 border rounded-xl shadow-lg bg-orange-400 text-gray-600 font-bold italic"};function G(h,_){return a(),c("div",K,"Comming Soon")}var j=A(Y,[["render",G]]);const X={key:0},Z={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},ee={class:"flex flex-shrink-0 justify-center"},te=["src"],oe={class:"flex flex-col w-full space-y-2 mb-2 text-black"},se={class:"w-full p-2 border border-black rounded-md sm:border-0"},ne={class:"flex items-center font-bold"},ie={class:"mr-1"},re={class:"mr-1"},le={class:"px-1"},ae={class:"flex items-center italic text-sm"},ce={key:0,class:"mr-1"},de={key:1,class:"mr-1"},ue=e("div",{class:"px-2"},"-",-1),Fo={__name:"BtProfessor",props:{division_id:{type:Number,required:!0}},setup(h){const _=h;J(()=>{i.value.listProfessorByDivisionId(_.division_id).then(d=>{n.value=d})});const i=x(new V),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",Z,[(a(!0),c(z,null,H(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",ee,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,te)]),e("div",oe,[e("div",se,[e("div",ne,[e("div",ie,y(r.rname_short_th),1),e("div",re,y(r.fname_th)+" "+y(r.lname_th),1),e("div",le,y(r.reward),1)]),e("div",ae,[r.position_division&&r.position_division!=="NULL"?(a(),c("div",ce,y(r.position_division),1)):(a(),c("div",de,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))]),(a(!0),c(z,null,H(u(r.cert),(k,v)=>(a(),c("div",{key:v,class:"py-1 flex items-center text-sm text-gray-600 italic"},[ue,e("div",null,y(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",X,[S(j)]))}},_e={key:0},he={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},ge={class:"flex flex-shrink-0 justify-center"},me=["src"],pe={class:"flex flex-col w-full space-y-2 mb-2 text-black"},ve={class:"w-full p-2 border border-black rounded-md sm:border-0"},fe={class:"flex items-center font-bold"},xe={class:"mr-1"},be={class:"mr-1"},ye={class:"px-1"},we={class:"flex items-center italic text-sm"},ke={key:0,class:"mr-1"},$e={key:1,class:"mr-1"},Ce=e("div",{class:"px-2"},"-",-1),Oo={__name:"BtDoctor",props:{division_id:{type:Number,required:!0}},setup(h){const _=h;J(()=>{i.value.listDoctorByDivisionId(_.division_id).then(d=>{n.value=d})});const i=x(new V),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",he,[(a(!0),c(z,null,H(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",ge,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,me)]),e("div",pe,[e("div",ve,[e("div",fe,[e("div",xe,y(r.rname_short_th),1),e("div",be,y(r.fname_th)+" "+y(r.lname_th),1),e("div",ye,y(r.reward),1)]),e("div",we,[r.position_division&&r.position_division!=="NULL"?(a(),c("div",ke,y(r.position_division),1)):(a(),c("div",$e,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))]),(a(!0),c(z,null,H(u(r.cert),(k,v)=>(a(),c("div",{key:v,class:"py-1 flex items-center text-sm text-gray-600 italic"},[Ce,e("div",null,y(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",_e,[S(j)]))}},Se={key:0},qe={key:1,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full gap-1 md:gap-2"},Me={class:"flex items-center p-2"},Le=["src"],Be={class:"flex items-center"},Te={class:"flex flex-col"},Ee={class:"px-2"},ze={key:0,class:"px-2 italic text-sm text-gray-600"},He={key:1,class:"px-2 italic text-sm text-gray-600"},Qo={__name:"BtOfficer",props:{division_id:{type:Number,required:!0}},setup(h){const _=h;J(()=>{i.value.listOfficerByDivisionId(_.division_id).then(u=>{n.value=u})});const i=x(new V),n=x([]);return x(base_url),(u,d)=>n.value.length?(a(),c("div",qe,[(a(!0),c(z,null,H(n.value,l=>(a(),c("div",{key:l.id,class:"flex flex-row mt-2 sm:mt-0 rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-200"},[e("div",Me,[e("img",{class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300",src:`${l.image_url}`,alt:""},null,8,Le)]),e("div",Be,[e("div",Te,[e("div",Ee,y(l.title_th)+y(l.fname_th)+" "+y(l.lname_th),1),l.position_division&&l.position_division!=="NULL"?(a(),c("div",ze,y(l.position_division),1)):(a(),c("div",He,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))])])]))),128))])):(a(),c("div",Se,[S(j)]))}},je={key:0},Ne={key:1,class:"flex flex-col"},Ie={class:"flex-grow"},De={class:"mt-2"},Fe=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Oe=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),Qe=[Fe,Oe],Ve={class:"flex"},Je=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Re=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),Ue=[Je,Re],Ae=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Pe=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),We=[Ae,Pe],Ye={key:2,class:"flex flex-col"},Ke={class:"flex-grow"},Ge={class:"ql-container ql-snow"},Xe=["innerHTML"],Vo={__name:"BtResearch",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(h){const _=h;F(()=>{window.removeEventListener("click",f,!1)});const i=x(),n=x(!0),u=T([]),d=T([]),l=N({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{I({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=v(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},v=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),f=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&O(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),B=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,B-window.innerHeight/2)},100)},300)})})},m=()=>{i.value.getEditor().addEventListener("paste",f,!1),i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},C=()=>{i.value.getQuill().enable(!0),n.value=!1},$=()=>{d.length&&q(d),u.splice(0),d.splice(0),m(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+_.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{L(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},q=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},L=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},E=()=>{l.id=_.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onBefore:()=>{if(!confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?"))return i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),$(),!1},onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&q(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=Q("QuillEditor");return h.branchSubMenu?h.display_content==="template"?(a(),c("div",Ne,[e("div",Ie,[S(o,{ref_key:"quill_research",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>m()),onTextChange:k},null,512)]),e("div",De,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},Qe,512),[[w,n.value]]),e("div",Ve,[b(e("button",{onClick:E,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},Ue,512),[[w,!n.value]]),b(e("button",{onClick:$,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},We,512),[[w,!n.value]])])])])):(a(),c("div",Ye,[e("div",Ke,[e("div",Ge,[e("div",{class:"ql-editor",innerHTML:h.branchSubMenu.detail_html},null,8,Xe)])])])):(a(),c("div",je,[S(j)]))}}},Ze={key:0},et={key:1,class:"flex flex-col"},tt={class:"flex-grow"},ot={class:"mt-2"},st=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),nt=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),it=[st,nt],rt={class:"flex"},lt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),at=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),ct=[lt,at],dt=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),ut=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),_t=[dt,ut],ht={key:2,class:"flex flex-col"},gt={class:"flex-grow"},mt={class:"ql-container ql-snow"},pt=["innerHTML"],Jo={__name:"BtBranchService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(h){const _=h;class i extends W.ImageSpec{getActions(){return[]}}F(()=>{window.removeEventListener("click",m,!1)});const n=x(),u=x(!0);x(base_url),x([]);const d=T([]),l=T([]),r=N({id:null,detail_delta:null,detail_html:null});x([{name:"blotFormatter",module:P,options:{specs:[i],overlay:{style:{border:"2px solid red"}}}}]);const k=(t,o,g)=>{I({title:o,description:g},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},v=t=>{const o=f(n.value.getContents().diff(t.oldContents));o.length&&d.push(o[0])&&console.log("delete",d)},f=t=>t.ops.filter(o=>o.insert&&o.insert.image).map(o=>o.insert.image),m=t=>{Array.prototype.forEach.call(t.clipboardData.items,o=>{if(o.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){t.preventDefault(),q(o.getAsFile());return}else o.type.match(/^application\//i)?t.preventDefault():o.type.startsWith("text/html")&&O(()=>{let g=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{g.lastChild.scrollIntoView();let B=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),U=B.top+window.scrollY+B.height;setTimeout(()=>{window.scrollTo(0,U-window.innerHeight/2)},100)},300)})})},C=()=>{n.value.getEditor().addEventListener("paste",m,!1),n.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),n.value.getQuill().enable(!1)},$=()=>{n.value.getQuill().enable(!0),u.value=!1},M=()=>{l.length&&L(l),d.splice(0),l.splice(0),C(),u.value=!0},q=t=>{const o=new FormData;o.append("image_file",t),o.append("store_path","branch_content/"+_.division_id+"/images"),axios.post(route("uploading_file_api"),o,{headers:{"Content-Type":"multipart/form-data"}}).then(g=>{E(g.data.url)}).catch(g=>{g.response&&g.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},L=t=>{axios.post(route("delete_file_api"),{imgFiles:t}).then(o=>{console.log(o.data)}).catch(o=>{o.response&&o.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},E=t=>{let o=n.value.getQuill();const g=o.getSelection();o.insertEmbed(g.index,"image",`${t}`,"user"),l.push(t)&&console.log("insert",l)},s=()=>{r.id=_.branchSubMenu.id,r.detail_delta=JSON.stringify(n.value.getContents()),r.detail_html=n.value.getHTML(),r.patch(route("admin.update_content_branch_sub_menu",r.id),{preserveState:!1,onBefore:()=>{if(!confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?"))return n.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),M(),!1},onSuccess:()=>{k("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),d.length&&L(d)},onError:t=>{let o="";for(let g in t)o=o+`- ${t[g]}<br/>`;k("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",o)},onFinish:()=>{r.reset(),d.splice(0),l.splice(0),u.value=!0}})};return(t,o)=>{const g=Q("QuillEditor");return h.branchSubMenu?h.display_content==="template"?(a(),c("div",et,[e("div",tt,[S(g,{id:"quill_ourservice",ref_key:"quill_ourservice",ref:n,contentType:"delta",onReady:C,onTextChange:v},null,512)]),e("div",ot,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},it,512),[[w,u.value]]),e("div",rt,[b(e("button",{onClick:s,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},ct,512),[[w,!u.value]]),b(e("button",{onClick:M,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},_t,512),[[w,!u.value]])])])])):(a(),c("div",ht,[e("div",gt,[e("div",mt,[e("div",{class:"ql-editor",innerHTML:h.branchSubMenu.detail_html},null,8,pt)])])])):(a(),c("div",Ze,[S(j)]))}}},vt={key:0},ft={key:1,class:"flex flex-col"},xt={class:"flex-grow"},bt={class:"mt-2"},yt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),wt=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),kt=[yt,wt],$t={class:"flex"},Ct=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),St=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),qt=[Ct,St],Mt=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Lt=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),Bt=[Mt,Lt],Tt={key:2,class:"flex flex-col"},Et={class:"flex-grow"},zt={class:"ql-container ql-snow"},Ht=["innerHTML"],Ro={__name:"BtAcademicService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(h){const _=h;F(()=>{window.removeEventListener("click",f,!1)});const i=x(),n=x(!0),u=T([]),d=T([]),l=N({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{I({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=v(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},v=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),f=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&O(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),B=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,B-window.innerHeight/2)},100)},300)})})},m=()=>{i.value.getEditor().addEventListener("paste",f,!1),i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},C=()=>{i.value.getQuill().enable(!0),n.value=!1},$=()=>{d.length&&q(d),u.splice(0),d.splice(0),m(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+_.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{L(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},q=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},L=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},E=()=>{l.id=_.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onBefore:()=>{if(!confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?"))return i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),$(),!1},onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&q(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=Q("QuillEditor");return h.branchSubMenu?h.display_content==="template"?(a(),c("div",ft,[e("div",xt,[S(o,{ref_key:"quill_academic_service",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>m()),onTextChange:k},null,512)]),e("div",bt,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},kt,512),[[w,n.value]]),e("div",$t,[b(e("button",{onClick:E,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},qt,512),[[w,!n.value]]),b(e("button",{onClick:$,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},Bt,512),[[w,!n.value]])])])])):(a(),c("div",Tt,[e("div",Et,[e("div",zt,[e("div",{class:"ql-editor",innerHTML:h.branchSubMenu.detail_html},null,8,Ht)])])])):(a(),c("div",vt,[S(j)]))}}},jt={key:0},Nt={class:"col-span-6 sm:col-span-4 mb-2"},It={class:"flex items-center justify-start"},Dt=e("div",{class:"text-md font-bold text-green-700"}," \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E34\u0E07\u0E01\u0E4C : ",-1),Ft=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z","clip-rule":"evenodd"},null,-1),Ot=[Ft],Qt={class:"flex flex-col"},Vt={class:"w-full mr-1"},Jt=e("label",{for:"link_detail",class:"block text-sm font-medium text-gray-700"},"\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Rt=["onUpdate:modelValue","readonly"],Ut={class:"w-full"},At=e("label",{for:"link_url",class:"block text-sm font-medium text-gray-700"},"URL \u0E02\u0E2D\u0E07\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Pt=["onUpdate:modelValue","readonly"],Wt=["onClick"],Yt=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z","clip-rule":"evenodd"},null,-1),Kt=[Yt],Gt={class:"mt-2"},Xt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Zt=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),eo=[Xt,Zt],to={class:"flex"},oo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),so=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),no=[oo,so],io=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),ro=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),lo=[io,ro],ao={key:1},co={class:"flex flex-col"},uo={class:"flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 group hover:shadow-2xl"},_o={class:"p-1"},ho={class:"flex items-center justify-center w-full h-5"},go=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 mr-2 text-green-700",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})],-1),mo=["href"],po=e("div",{class:"w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-green-700 group-hover:scale-x-100"},null,-1),Uo={__name:"BtLink",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(h){const _=h;x(JSON.parse(_.branchSubMenu.detail_delta));const i=N({id:_.branchSubMenu.id,linkList:_.branchSubMenu.detail_delta?JSON.parse(_.branchSubMenu.detail_delta):[]}),n=x(!1),u=(v,f,m)=>{I({title:f,description:m},{showIcon:!0,transition:"zoom",position:"top-right",type:v,timeout:3e3})},d=v=>{v.push({name:""})},l=(v,f)=>{f.splice(v,1)},r=()=>{i.transform(v=>({...v,detail_delta:JSON.stringify(v.linkList),detail_html:"Template Link"})).patch(route("admin.update_content_branch_sub_menu",i.id),{_method:"patch",preserveState:!1,preserveScroll:!0,onSuccess:()=>{u("success","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),i.reset()},onError:v=>{let f="";for(let m in v)f=f+`- ${v[m]}<br/>`;u("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",f)},onFinish:()=>{i.processing=!1}})},k=()=>{i.linkList=JSON.parse(_.branchSubMenu.detail_delta),n.value=!1};return(v,f)=>h.display_content==="template"?(a(),c("div",jt,[e("div",Nt,[e("div",It,[Dt,b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:f[0]||(f[0]=m=>d(D(i).linkList)),class:"h-5 w-5 ml-2 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},Ot,512)),[[w,n.value]])])]),e("div",Qt,[(a(!0),c(z,null,H(D(i).linkList,(m,C)=>(a(),c("div",{key:`linkInput-${C}`,class:"flex items-center shrink-0 mb-2"},[e("div",Vt,[Jt,b(e("input",{"onUpdate:modelValue":$=>m.name=$,type:"text",readonly:!n.value,name:"",id:"link_detail",placeholder:"\u0E43\u0E2A\u0E48\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Rt),[[R,m.name]])]),e("div",Ut,[At,b(e("input",{"onUpdate:modelValue":$=>m.url=$,type:"text",readonly:!n.value,name:"",id:"link_url",placeholder:"https://simed.mahidol.ac.th",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Pt),[[R,m.url]])]),b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:$=>l(C,D(i).linkList),class:"h-5 w-5 ml-2 shrink-0 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},Kt,8,Wt)),[[w,n.value]])]))),128))]),e("div",Gt,[b(e("button",{onClick:f[1]||(f[1]=m=>n.value=!n.value),class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},eo,512),[[w,!n.value]]),e("div",to,[b(e("button",{onClick:r,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},no,512),[[w,n.value]]),b(e("button",{onClick:k,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},lo,512),[[w,n.value]])])])])):(a(),c("div",ao,[e("div",co,[(a(!0),c(z,null,H(D(i).linkList,(m,C)=>(a(),c("div",{key:`linkInput-${C}`,class:"flex items-center shrink-0 mb-2"},[e("div",uo,[e("div",_o,[e("div",ho,[go,e("a",{href:m.url,target:"_blank"},y(m.name),9,mo)])]),po])]))),128))])]))}},vo={key:0},fo={key:1,class:"flex flex-col"},xo={class:"flex-grow"},bo={class:"mt-2"},yo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),wo=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),ko=[yo,wo],$o={class:"flex"},Co=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),So=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),qo=[Co,So],Mo=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Lo=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),Bo=[Mo,Lo],To={key:2,class:"flex flex-col"},Eo={class:"flex-grow"},zo={class:"ql-container ql-snow"},Ho=["innerHTML"],Ao={__name:"BtContact",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(h){const _=h;F(()=>{window.removeEventListener("click",f,!1)});const i=x(),n=x(!0),u=T([]),d=T([]),l=N({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{I({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=v(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},v=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),f=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&O(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),B=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,B-window.innerHeight/2)},100)},300)})})},m=()=>{i.value.getEditor().addEventListener("paste",f,!1),i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},C=()=>{i.value.getQuill().enable(!0),n.value=!1},$=()=>{d.length&&q(d),u.splice(0),d.splice(0),m(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+_.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{L(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},q=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},L=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},E=()=>{l.id=_.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onBefore:()=>{if(!confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?"))return i.value.setContents(JSON.parse(_.branchSubMenu.detail_delta)),$(),!1},onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&q(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=Q("QuillEditor");return h.branchSubMenu?h.display_content==="template"?(a(),c("div",fo,[e("div",xo,[S(o,{ref_key:"quill_contact",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>m()),onTextChange:k},null,512)]),e("div",bo,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},ko,512),[[w,n.value]]),e("div",$o,[b(e("button",{onClick:E,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},qo,512),[[w,!n.value]]),b(e("button",{onClick:$,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},Bo,512),[[w,!n.value]])])])])):(a(),c("div",To,[e("div",Eo,[e("div",zo,[e("div",{class:"ql-editor",innerHTML:h.branchSubMenu.detail_html},null,8,Ho)])])])):(a(),c("div",vo,[S(j)]))}}};export{Fo as _,Oo as a,Qo as b,Vo as c,Jo as d,Ro as e,Uo as f,Ao as g};
