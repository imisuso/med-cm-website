import{P as R}from"./PersonService.6a0581d2.js";import{H as W,o as a,b as c,m as U,r as x,a as S,F as H,f as j,d as e,t as w,g as Y,p as O,K as E,P as I,L as Q,A as V,e as b,M as y,q as p,u as F,v as A}from"./app.d39ae179.js";import{t as D}from"./style.23244c32.js";import{S as J}from"./sweetalert2.all.fbcd4dea.js";import{B as K,d as G}from"./index.b84ada97.js";const X={},Z={class:"w-32 px-2 py-1 border rounded-xl shadow-lg bg-orange-400 text-gray-600 font-bold italic"};function ee(m,h){return a(),c("div",Z,"Comming Soon")}var N=W(X,[["render",ee]]);const te={key:0},oe={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},se={class:"flex flex-shrink-0 justify-center"},ne=["src"],ie={class:"flex flex-col w-full space-y-2 mb-2 text-black"},re={class:"w-full p-2 border border-black rounded-md sm:border-0"},le={class:"flex items-center font-bold"},ae={class:"mr-1"},ce={class:"mr-1"},de={class:"px-1"},ue={key:0,class:"flex items-center italic text-sm"},he={class:"mr-1"},me=e("div",{class:"flex items-center italic text-sm"},[e("div",{class:"mr-1"},"\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C")],-1),ge=e("div",{class:"px-2"},"-",-1),mo={__name:"BtProfessor",props:{division_id:{type:Number,required:!0},division_name:{type:String}},setup(m){const h=m;U(()=>{i.value.listProfessorByDivisionId(h.division_id).then(d=>{n.value=d})});const i=x(new R),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",oe,[(a(!0),c(H,null,j(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",se,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,ne)]),e("div",ie,[e("div",re,[e("div",le,[e("div",ae,w(r.rname_short_th),1),e("div",ce,w(r.fname_th)+" "+w(r.lname_th),1),e("div",de,w(r.reward),1)]),r.profiles.leader?(a(),c("div",ue,[e("div",he,"\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"+w(m.division_name),1)])):Y("",!0),me,(a(!0),c(H,null,j(u(r.cert),(k,f)=>(a(),c("div",{key:f,class:"py-1 flex items-center text-sm text-gray-600 italic"},[ge,e("div",null,w(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",te,[S(N)]))}},_e={key:0},pe={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},fe={class:"flex flex-shrink-0 justify-center"},ve=["src"],xe={class:"flex flex-col w-full space-y-2 mb-2 text-black"},be={class:"w-full p-2 border border-black rounded-md sm:border-0"},we={class:"flex items-center font-bold"},ye={class:"mr-1"},ke={class:"mr-1"},$e={class:"px-1"},Ce={class:"flex items-center italic text-sm"},Se={key:0,class:"mr-1"},qe={key:1,class:"mr-1"},Be=e("div",{class:"px-2"},"-",-1),go={__name:"BtDoctor",props:{division_id:{type:Number,required:!0}},setup(m){const h=m;U(()=>{i.value.listDoctorByDivisionId(h.division_id).then(d=>{n.value=d})});const i=x(new R),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",pe,[(a(!0),c(H,null,j(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",fe,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,ve)]),e("div",xe,[e("div",be,[e("div",we,[e("div",ye,w(r.rname_short_th),1),e("div",ke,w(r.fname_th)+" "+w(r.lname_th),1),e("div",$e,w(r.reward),1)]),e("div",Ce,[r.position_division&&r.position_division!=="NULL"?(a(),c("div",Se,w(r.position_division),1)):(a(),c("div",qe,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))]),(a(!0),c(H,null,j(u(r.cert),(k,f)=>(a(),c("div",{key:f,class:"py-1 flex items-center text-sm text-gray-600 italic"},[Be,e("div",null,w(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",_e,[S(N)]))}},Me={key:0},Te={key:1,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full gap-1 md:gap-2"},Le={class:"flex items-center p-2"},Ee=["src"],ze={class:"flex items-center"},He={class:"flex flex-col"},je={class:"px-2"},Ne={key:0,class:"px-2 italic text-sm text-gray-600"},Ie={key:1,class:"px-2 italic text-sm text-gray-600"},_o={__name:"BtOfficer",props:{division_id:{type:Number,required:!0}},setup(m){const h=m;U(()=>{i.value.listOfficerByDivisionId(h.division_id).then(u=>{n.value=u})});const i=x(new R),n=x([]);return x(base_url),(u,d)=>n.value.length?(a(),c("div",Te,[(a(!0),c(H,null,j(n.value,l=>(a(),c("div",{key:l.id,class:"flex flex-row mt-2 sm:mt-0 rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-200"},[e("div",Le,[e("img",{class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300",src:`${l.image_url}`,alt:""},null,8,Ee)]),e("div",ze,[e("div",He,[e("div",je,w(l.title_th)+w(l.fname_th)+" "+w(l.lname_th),1),l.position_division&&l.position_division!=="NULL"?(a(),c("div",Ne,w(l.position_division),1)):(a(),c("div",Ie,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))])])]))),128))])):(a(),c("div",Me,[S(N)]))}},De={key:0},Fe={key:1,class:"flex flex-col"},Oe={class:"flex-grow"},Qe={class:"mt-2"},Ve=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Je={class:"flex"},Re=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ue=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Ae={key:2,class:"flex flex-col"},Pe={class:"flex-grow"},We={class:"ql-container ql-snow"},Ye=["innerHTML"],po={__name:"BtResearch",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(m){const h=m;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},_=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),q(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},q=()=>{d.length&&B(d),u.splice(0),d.splice(0),_(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},B=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&B(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return m.branchSubMenu?m.display_content==="template"?(a(),c("div",Fe,[e("div",Oe,[S(o,{ref_key:"quill_research",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>_()),onTextChange:k},null,512)]),e("div",Qe,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},[Ve,p(" \u0E41\u0E01\u0E49\u0E44\u0E02 ")],512),[[y,n.value]]),e("div",Je,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[Re,p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[y,!n.value]]),b(e("button",{onClick:q,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[Ue,p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],512),[[y,!n.value]])])])])):(a(),c("div",Ae,[e("div",Pe,[e("div",We,[e("div",{class:"ql-editor",innerHTML:m.branchSubMenu.detail_html},null,8,Ye)])])])):(a(),c("div",De,[S(N)]))}}},Ke={key:0},Ge={key:1,class:"flex flex-col"},Xe={class:"flex-grow"},Ze={class:"mt-2"},et=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),tt={class:"flex"},ot=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),st=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),nt={key:2,class:"flex flex-col"},it={class:"flex-grow"},rt={class:"ql-container ql-snow"},lt=["innerHTML"],fo={__name:"BtBranchService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(m){const h=m;class i extends G.ImageSpec{getActions(){return[]}}O(()=>{window.removeEventListener("click",_,!1)});const n=x(),u=x(!0);x(base_url),x([]);const d=E([]),l=E([]),r=I({id:null,detail_delta:null,detail_html:null});x([{name:"blotFormatter",module:K,options:{specs:[i],overlay:{style:{border:"2px solid red"}}}}]);const k=(t,o,g)=>{D({title:o,description:g},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},f=t=>{const o=v(n.value.getContents().diff(t.oldContents));o.length&&d.push(o[0])&&console.log("delete",d)},v=t=>t.ops.filter(o=>o.insert&&o.insert.image).map(o=>o.insert.image),_=t=>{Array.prototype.forEach.call(t.clipboardData.items,o=>{if(o.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){t.preventDefault(),B(o.getAsFile());return}else o.type.match(/^application\//i)?t.preventDefault():o.type.startsWith("text/html")&&Q(()=>{let g=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{g.lastChild.scrollIntoView();let L=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),P=L.top+window.scrollY+L.height;setTimeout(()=>{window.scrollTo(0,P-window.innerHeight/2)},100)},300)})})},$=()=>{n.value.getEditor().addEventListener("paste",_,!1),n.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),n.value.getQuill().enable(!1)},C=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(t=>{if(t.isConfirmed)s();else return n.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),M(),!1})},q=()=>{n.value.getQuill().enable(!0),u.value=!1},M=()=>{l.length&&T(l),d.splice(0),l.splice(0),$(),u.value=!0},B=t=>{const o=new FormData;o.append("image_file",t),o.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),o,{headers:{"Content-Type":"multipart/form-data"}}).then(g=>{z(g.data.url)}).catch(g=>{g.response&&g.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},T=t=>{axios.post(route("delete_file_api"),{imgFiles:t}).then(o=>{console.log(o.data)}).catch(o=>{o.response&&o.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},z=t=>{let o=n.value.getQuill();const g=o.getSelection();o.insertEmbed(g.index,"image",`${t}`,"user"),l.push(t)&&console.log("insert",l)},s=()=>{r.id=h.branchSubMenu.id,r.detail_delta=JSON.stringify(n.value.getContents()),r.detail_html=n.value.getHTML(),r.patch(route("admin.update_content_branch_sub_menu",r.id),{preserveState:!1,onSuccess:()=>{k("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),d.length&&T(d)},onError:t=>{let o="";for(let g in t)o=o+`- ${t[g]}<br/>`;k("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",o)},onFinish:()=>{r.reset(),d.splice(0),l.splice(0),u.value=!0}})};return(t,o)=>{const g=V("QuillEditor");return m.branchSubMenu?m.display_content==="template"?(a(),c("div",Ge,[e("div",Xe,[S(g,{id:"quill_ourservice",ref_key:"quill_ourservice",ref:n,contentType:"delta",onReady:$,onTextChange:f},null,512)]),e("div",Ze,[b(e("button",{onClick:q,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},[et,p(" \u0E41\u0E01\u0E49\u0E44\u0E02 ")],512),[[y,u.value]]),e("div",tt,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[ot,p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[y,!u.value]]),b(e("button",{onClick:M,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[st,p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],512),[[y,!u.value]])])])])):(a(),c("div",nt,[e("div",it,[e("div",rt,[e("div",{class:"ql-editor",innerHTML:m.branchSubMenu.detail_html},null,8,lt)])])])):(a(),c("div",Ke,[S(N)]))}}},at={key:0},ct={key:1,class:"flex flex-col"},dt={class:"flex-grow"},ut={class:"mt-2"},ht=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),mt={class:"flex"},gt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),_t=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),pt={key:2,class:"flex flex-col"},ft={class:"flex-grow"},vt={class:"ql-container ql-snow"},xt=["innerHTML"],vo={__name:"BtAcademicService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(m){const h=m;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},_=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),q(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},q=()=>{d.length&&B(d),u.splice(0),d.splice(0),_(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},B=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&B(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return m.branchSubMenu?m.display_content==="template"?(a(),c("div",ct,[e("div",dt,[S(o,{ref_key:"quill_academic_service",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>_()),onTextChange:k},null,512)]),e("div",ut,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},[ht,p(" \u0E41\u0E01\u0E49\u0E44\u0E02 ")],512),[[y,n.value]]),e("div",mt,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[gt,p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[y,!n.value]]),b(e("button",{onClick:q,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[_t,p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],512),[[y,!n.value]])])])])):(a(),c("div",pt,[e("div",ft,[e("div",vt,[e("div",{class:"ql-editor",innerHTML:m.branchSubMenu.detail_html},null,8,xt)])])])):(a(),c("div",at,[S(N)]))}}},bt={key:0},wt={class:"col-span-6 sm:col-span-4 mb-2"},yt={class:"flex items-center justify-start"},kt=e("div",{class:"text-md font-bold text-green-700"}," \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E34\u0E07\u0E01\u0E4C : ",-1),$t=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z","clip-rule":"evenodd"},null,-1),Ct=[$t],St={class:"flex flex-col"},qt={class:"w-full mr-1"},Bt=e("label",{for:"link_detail",class:"block text-sm font-medium text-gray-700"},"\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Mt=["onUpdate:modelValue","readonly"],Tt={class:"w-full"},Lt=e("label",{for:"link_url",class:"block text-sm font-medium text-gray-700"},"URL \u0E02\u0E2D\u0E07\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Et=["onUpdate:modelValue","readonly"],zt=["onClick"],Ht=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z","clip-rule":"evenodd"},null,-1),jt=[Ht],Nt={class:"mt-2"},It=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Dt={class:"flex"},Ft=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ot=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Qt={key:1},Vt={class:"flex flex-col"},Jt={class:"flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 group hover:shadow-2xl"},Rt={class:"p-1"},Ut={class:"flex items-center justify-center w-full h-5"},At=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 mr-2 text-green-700",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})],-1),Pt=["href"],Wt=e("div",{class:"w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-green-700 group-hover:scale-x-100"},null,-1),xo={__name:"BtLink",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(m){const h=m;x(JSON.parse(h.branchSubMenu.detail_delta));const i=I({id:h.branchSubMenu.id,linkList:h.branchSubMenu.detail_delta?JSON.parse(h.branchSubMenu.detail_delta):[]}),n=x(!1),u=(f,v,_)=>{D({title:v,description:_},{showIcon:!0,transition:"zoom",position:"top-right",type:f,timeout:3e3})},d=f=>{f.push({name:""})},l=(f,v)=>{v.splice(f,1)},r=()=>{i.transform(f=>({...f,detail_delta:JSON.stringify(f.linkList),detail_html:"Template Link"})).patch(route("admin.update_content_branch_sub_menu",i.id),{_method:"patch",preserveState:!1,preserveScroll:!0,onSuccess:()=>{u("success","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),i.reset()},onError:f=>{let v="";for(let _ in f)v=v+`- ${f[_]}<br/>`;u("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",v)},onFinish:()=>{i.processing=!1}})},k=()=>{i.linkList=JSON.parse(h.branchSubMenu.detail_delta),n.value=!1};return(f,v)=>m.display_content==="template"?(a(),c("div",bt,[e("div",wt,[e("div",yt,[kt,b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:v[0]||(v[0]=_=>d(F(i).linkList)),class:"h-5 w-5 ml-2 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},Ct,512)),[[y,n.value]])])]),e("div",St,[(a(!0),c(H,null,j(F(i).linkList,(_,$)=>(a(),c("div",{key:`linkInput-${$}`,class:"flex items-center shrink-0 mb-2"},[e("div",qt,[Bt,b(e("input",{"onUpdate:modelValue":C=>_.name=C,type:"text",readonly:!n.value,name:"",id:"link_detail",placeholder:"\u0E43\u0E2A\u0E48\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Mt),[[A,_.name]])]),e("div",Tt,[Lt,b(e("input",{"onUpdate:modelValue":C=>_.url=C,type:"text",readonly:!n.value,name:"",id:"link_url",placeholder:"https://simed.mahidol.ac.th",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Et),[[A,_.url]])]),b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:C=>l($,F(i).linkList),class:"h-5 w-5 ml-2 shrink-0 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},jt,8,zt)),[[y,n.value]])]))),128))]),e("div",Nt,[b(e("button",{onClick:v[1]||(v[1]=_=>n.value=!n.value),class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},[It,p(" \u0E41\u0E01\u0E49\u0E44\u0E02 ")],512),[[y,!n.value]]),e("div",Dt,[b(e("button",{onClick:r,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[Ft,p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[y,n.value]]),b(e("button",{onClick:k,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[Ot,p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],512),[[y,n.value]])])])])):(a(),c("div",Qt,[e("div",Vt,[(a(!0),c(H,null,j(F(i).linkList,(_,$)=>(a(),c("div",{key:`linkInput-${$}`,class:"flex items-center shrink-0 mb-2"},[e("div",Jt,[e("div",Rt,[e("div",Ut,[At,e("a",{href:_.url,target:"_blank"},w(_.name),9,Pt)])]),Wt])]))),128))])]))}},Yt={key:0},Kt={key:1,class:"flex flex-col"},Gt={class:"flex-grow"},Xt={class:"mt-2"},Zt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),eo={class:"flex"},to=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),oo=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),so={key:2,class:"flex flex-col"},no={class:"flex-grow"},io={class:"ql-container ql-snow"},ro=["innerHTML"],bo={__name:"BtContact",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(m){const h=m;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),M(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let g=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=g.top+window.scrollY+g.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},_=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),q(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},q=()=>{d.length&&B(d),u.splice(0),d.splice(0),_(),n.value=!0},M=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},B=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&B(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return m.branchSubMenu?m.display_content==="template"?(a(),c("div",Kt,[e("div",Gt,[S(o,{ref_key:"quill_contact",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=g=>_()),onTextChange:k},null,512)]),e("div",Xt,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},[Zt,p(" \u0E41\u0E01\u0E49\u0E44\u0E02 ")],512),[[y,n.value]]),e("div",eo,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},[to,p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ")],512),[[y,!n.value]]),b(e("button",{onClick:q,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},[oo,p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")],512),[[y,!n.value]])])])])):(a(),c("div",so,[e("div",no,[e("div",io,[e("div",{class:"ql-editor",innerHTML:m.branchSubMenu.detail_html},null,8,ro)])])])):(a(),c("div",Yt,[S(N)]))}}};export{mo as _,go as a,_o as b,po as c,fo as d,vo as e,xo as f,bo as g};
