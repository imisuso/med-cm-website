import{P as R}from"./PersonService.37c05dab.js";import{H as W,o as a,b as c,m as U,r as x,a as S,F as H,f as j,d as e,t as w,g as Y,p as O,K as E,P as I,L as Q,A as V,e as b,M as y,s as p,u as F,v as A}from"./app.32775810.js";import{t as D}from"./style.22ff02b7.js";import{S as J}from"./sweetalert2.all.35fd5eee.js";import{B as K,d as G}from"./index.9305d45a.js";const X={},Z={class:"w-32 px-2 py-1 border rounded-xl shadow-lg bg-orange-400 text-gray-600 font-bold italic"};function ee(_,h){return a(),c("div",Z,"Comming Soon")}var N=W(X,[["render",ee]]);const te={key:0},oe={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},se={class:"flex flex-shrink-0 justify-center"},ne=["src"],ie={class:"flex flex-col w-full space-y-2 mb-2 text-black"},re={class:"w-full p-2 border border-black rounded-md sm:border-0"},le={class:"flex items-center font-bold"},ae={class:"mr-1"},ce={class:"mr-1"},de={class:"px-1"},ue={key:0,class:"flex items-center italic text-sm"},he={class:"mr-1"},_e=e("div",{class:"flex items-center italic text-sm"},[e("div",{class:"mr-1"},"\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C")],-1),me=e("div",{class:"px-2"},"-",-1),Jo={__name:"BtProfessor",props:{division_id:{type:Number,required:!0},division_name:{type:String}},setup(_){const h=_;U(()=>{i.value.listProfessorByDivisionId(h.division_id).then(d=>{n.value=d})});const i=x(new R),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",oe,[(a(!0),c(H,null,j(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",se,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,ne)]),e("div",ie,[e("div",re,[e("div",le,[e("div",ae,w(r.rname_short_th),1),e("div",ce,w(r.fname_th)+" "+w(r.lname_th),1),e("div",de,w(r.reward),1)]),r.profiles.leader?(a(),c("div",ue,[e("div",he,"\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"+w(_.division_name),1)])):Y("",!0),_e,(a(!0),c(H,null,j(u(r.cert),(k,f)=>(a(),c("div",{key:f,class:"py-1 flex items-center text-sm text-gray-600 italic"},[me,e("div",null,w(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",te,[S(N)]))}},ge={key:0},pe={key:1,class:"flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5"},fe={class:"flex flex-shrink-0 justify-center"},ve=["src"],xe={class:"flex flex-col w-full space-y-2 mb-2 text-black"},be={class:"w-full p-2 border border-black rounded-md sm:border-0"},we={class:"flex items-center font-bold"},ye={class:"mr-1"},ke={class:"mr-1"},$e={class:"px-1"},Ce={class:"flex items-center italic text-sm"},Se={key:0,class:"mr-1"},Be={key:1,class:"mr-1"},Me=e("div",{class:"px-2"},"-",-1),Ro={__name:"BtDoctor",props:{division_id:{type:Number,required:!0}},setup(_){const h=_;U(()=>{i.value.listDoctorByDivisionId(h.division_id).then(d=>{n.value=d})});const i=x(new R),n=x([]);x(base_url);const u=d=>JSON.parse(d).sort((l,r)=>r.cert_year-l.cert_year);return(d,l)=>n.value.length?(a(),c("div",pe,[(a(!0),c(H,null,j(n.value,r=>(a(),c("div",{key:r.id,class:"flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg"},[e("div",fe,[e("img",{src:`${r.image_url}`,alt:"",class:"object-cover w-28 h-36 rounded-sm"},null,8,ve)]),e("div",xe,[e("div",be,[e("div",we,[e("div",ye,w(r.rname_short_th),1),e("div",ke,w(r.fname_th)+" "+w(r.lname_th),1),e("div",$e,w(r.reward),1)]),e("div",Ce,[r.position_division&&r.position_division!=="NULL"?(a(),c("div",Se,w(r.position_division),1)):(a(),c("div",Be,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))]),(a(!0),c(H,null,j(u(r.cert),(k,f)=>(a(),c("div",{key:f,class:"py-1 flex items-center text-sm text-gray-600 italic"},[Me,e("div",null,w(k.cert),1)]))),128))])])]))),128))])):(a(),c("div",ge,[S(N)]))}},qe={key:0},Te={key:1,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full gap-1 md:gap-2"},Le={class:"flex items-center p-2"},Ee=["src"],ze={class:"flex items-center"},He={class:"flex flex-col"},je={class:"px-2"},Ne={key:0,class:"px-2 italic text-sm text-gray-600"},Ie={key:1,class:"px-2 italic text-sm text-gray-600"},Uo={__name:"BtOfficer",props:{division_id:{type:Number,required:!0}},setup(_){const h=_;U(()=>{i.value.listOfficerByDivisionId(h.division_id).then(u=>{n.value=u})});const i=x(new R),n=x([]);return x(base_url),(u,d)=>n.value.length?(a(),c("div",Te,[(a(!0),c(H,null,j(n.value,l=>(a(),c("div",{key:l.id,class:"flex flex-row mt-2 sm:mt-0 rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-200"},[e("div",Le,[e("img",{class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300",src:`${l.image_url}`,alt:""},null,8,Ee)]),e("div",ze,[e("div",He,[e("div",je,w(l.title_th)+w(l.fname_th)+" "+w(l.lname_th),1),l.position_division&&l.position_division!=="NULL"?(a(),c("div",Ne,w(l.position_division),1)):(a(),c("div",Ie,"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E07\u0E32\u0E19"))])])]))),128))])):(a(),c("div",qe,[S(N)]))}},De={key:0},Fe={key:1,class:"flex flex-col"},Oe={class:"flex-grow"},Qe={class:"mt-2"},Ve=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Je=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),Re=[Ve,Je],Ue={class:"flex"},Ae=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Pe=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),We=[Ae,Pe],Ye=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Ke=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),Ge=[Ye,Ke],Xe={key:2,class:"flex flex-col"},Ze={class:"flex-grow"},et={class:"ql-container ql-snow"},tt=["innerHTML"],Ao={__name:"BtResearch",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(_){const h=_;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),q(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let m=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=m.top+window.scrollY+m.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},g=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),B(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},B=()=>{d.length&&M(d),u.splice(0),d.splice(0),g(),n.value=!0},q=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},M=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&M(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return _.branchSubMenu?_.display_content==="template"?(a(),c("div",Fe,[e("div",Oe,[S(o,{ref_key:"quill_research",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=m=>g()),onTextChange:k},null,512)]),e("div",Qe,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},Re,512),[[y,n.value]]),e("div",Ue,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},We,512),[[y,!n.value]]),b(e("button",{onClick:B,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},Ge,512),[[y,!n.value]])])])])):(a(),c("div",Xe,[e("div",Ze,[e("div",et,[e("div",{class:"ql-editor",innerHTML:_.branchSubMenu.detail_html},null,8,tt)])])])):(a(),c("div",De,[S(N)]))}}},ot={key:0},st={key:1,class:"flex flex-col"},nt={class:"flex-grow"},it={class:"mt-2"},rt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),lt=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),at=[rt,lt],ct={class:"flex"},dt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),ut=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),ht=[dt,ut],_t=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),mt=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),gt=[_t,mt],pt={key:2,class:"flex flex-col"},ft={class:"flex-grow"},vt={class:"ql-container ql-snow"},xt=["innerHTML"],Po={__name:"BtBranchService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(_){const h=_;class i extends G.ImageSpec{getActions(){return[]}}O(()=>{window.removeEventListener("click",g,!1)});const n=x(),u=x(!0);x(base_url),x([]);const d=E([]),l=E([]),r=I({id:null,detail_delta:null,detail_html:null});x([{name:"blotFormatter",module:K,options:{specs:[i],overlay:{style:{border:"2px solid red"}}}}]);const k=(t,o,m)=>{D({title:o,description:m},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},f=t=>{const o=v(n.value.getContents().diff(t.oldContents));o.length&&d.push(o[0])&&console.log("delete",d)},v=t=>t.ops.filter(o=>o.insert&&o.insert.image).map(o=>o.insert.image),g=t=>{Array.prototype.forEach.call(t.clipboardData.items,o=>{if(o.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){t.preventDefault(),M(o.getAsFile());return}else o.type.match(/^application\//i)?t.preventDefault():o.type.startsWith("text/html")&&Q(()=>{let m=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{m.lastChild.scrollIntoView();let L=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),P=L.top+window.scrollY+L.height;setTimeout(()=>{window.scrollTo(0,P-window.innerHeight/2)},100)},300)})})},$=()=>{n.value.getEditor().addEventListener("paste",g,!1),n.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),n.value.getQuill().enable(!1)},C=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(t=>{if(t.isConfirmed)s();else return n.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),q(),!1})},B=()=>{n.value.getQuill().enable(!0),u.value=!1},q=()=>{l.length&&T(l),d.splice(0),l.splice(0),$(),u.value=!0},M=t=>{const o=new FormData;o.append("image_file",t),o.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),o,{headers:{"Content-Type":"multipart/form-data"}}).then(m=>{z(m.data.url)}).catch(m=>{m.response&&m.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},T=t=>{axios.post(route("delete_file_api"),{imgFiles:t}).then(o=>{console.log(o.data)}).catch(o=>{o.response&&o.response.status===401&&k("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},z=t=>{let o=n.value.getQuill();const m=o.getSelection();o.insertEmbed(m.index,"image",`${t}`,"user"),l.push(t)&&console.log("insert",l)},s=()=>{r.id=h.branchSubMenu.id,r.detail_delta=JSON.stringify(n.value.getContents()),r.detail_html=n.value.getHTML(),r.patch(route("admin.update_content_branch_sub_menu",r.id),{preserveState:!1,onSuccess:()=>{k("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),d.length&&T(d)},onError:t=>{let o="";for(let m in t)o=o+`- ${t[m]}<br/>`;k("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",o)},onFinish:()=>{r.reset(),d.splice(0),l.splice(0),u.value=!0}})};return(t,o)=>{const m=V("QuillEditor");return _.branchSubMenu?_.display_content==="template"?(a(),c("div",st,[e("div",nt,[S(m,{id:"quill_ourservice",ref_key:"quill_ourservice",ref:n,contentType:"delta",onReady:$,onTextChange:f},null,512)]),e("div",it,[b(e("button",{onClick:B,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},at,512),[[y,u.value]]),e("div",ct,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},ht,512),[[y,!u.value]]),b(e("button",{onClick:q,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},gt,512),[[y,!u.value]])])])])):(a(),c("div",pt,[e("div",ft,[e("div",vt,[e("div",{class:"ql-editor",innerHTML:_.branchSubMenu.detail_html},null,8,xt)])])])):(a(),c("div",ot,[S(N)]))}}},bt={key:0},wt={key:1,class:"flex flex-col"},yt={class:"flex-grow"},kt={class:"mt-2"},$t=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Ct=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),St=[$t,Ct],Bt={class:"flex"},Mt=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),qt=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),Tt=[Mt,qt],Lt=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Et=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),zt=[Lt,Et],Ht={key:2,class:"flex flex-col"},jt={class:"flex-grow"},Nt={class:"ql-container ql-snow"},It=["innerHTML"],Wo={__name:"BtAcademicService",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(_){const h=_;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),q(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let m=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=m.top+window.scrollY+m.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},g=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),B(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},B=()=>{d.length&&M(d),u.splice(0),d.splice(0),g(),n.value=!0},q=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},M=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&M(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return _.branchSubMenu?_.display_content==="template"?(a(),c("div",wt,[e("div",yt,[S(o,{ref_key:"quill_academic_service",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=m=>g()),onTextChange:k},null,512)]),e("div",kt,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},St,512),[[y,n.value]]),e("div",Bt,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},Tt,512),[[y,!n.value]]),b(e("button",{onClick:B,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},zt,512),[[y,!n.value]])])])])):(a(),c("div",Ht,[e("div",jt,[e("div",Nt,[e("div",{class:"ql-editor",innerHTML:_.branchSubMenu.detail_html},null,8,It)])])])):(a(),c("div",bt,[S(N)]))}}},Dt={key:0},Ft={class:"col-span-6 sm:col-span-4 mb-2"},Ot={class:"flex items-center justify-start"},Qt=e("div",{class:"text-md font-bold text-green-700"}," \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E34\u0E07\u0E01\u0E4C : ",-1),Vt=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z","clip-rule":"evenodd"},null,-1),Jt=[Vt],Rt={class:"flex flex-col"},Ut={class:"w-full mr-1"},At=e("label",{for:"link_detail",class:"block text-sm font-medium text-gray-700"},"\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Pt=["onUpdate:modelValue","readonly"],Wt={class:"w-full"},Yt=e("label",{for:"link_url",class:"block text-sm font-medium text-gray-700"},"URL \u0E02\u0E2D\u0E07\u0E25\u0E34\u0E07\u0E01\u0E4C",-1),Kt=["onUpdate:modelValue","readonly"],Gt=["onClick"],Xt=e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z","clip-rule":"evenodd"},null,-1),Zt=[Xt],eo={class:"mt-2"},to=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),oo=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),so=[to,oo],no={class:"flex"},io=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),ro=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),lo=[io,ro],ao=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),co=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),uo=[ao,co],ho={key:1},_o={class:"flex flex-col"},mo={class:"flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 group hover:shadow-2xl"},go={class:"p-1"},po={class:"flex items-center justify-center w-full h-5"},fo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 mr-2 text-green-700",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})],-1),vo=["href"],xo=e("div",{class:"w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-green-700 group-hover:scale-x-100"},null,-1),Yo={__name:"BtLink",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(_){const h=_;x(JSON.parse(h.branchSubMenu.detail_delta));const i=I({id:h.branchSubMenu.id,linkList:h.branchSubMenu.detail_delta?JSON.parse(h.branchSubMenu.detail_delta):[]}),n=x(!1),u=(f,v,g)=>{D({title:v,description:g},{showIcon:!0,transition:"zoom",position:"top-right",type:f,timeout:3e3})},d=f=>{f.push({name:""})},l=(f,v)=>{v.splice(f,1)},r=()=>{i.transform(f=>({...f,detail_delta:JSON.stringify(f.linkList),detail_html:"Template Link"})).patch(route("admin.update_content_branch_sub_menu",i.id),{_method:"patch",preserveState:!1,preserveScroll:!0,onSuccess:()=>{u("success","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),i.reset()},onError:f=>{let v="";for(let g in f)v=v+`- ${f[g]}<br/>`;u("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",v)},onFinish:()=>{i.processing=!1}})},k=()=>{i.linkList=JSON.parse(h.branchSubMenu.detail_delta),n.value=!1};return(f,v)=>_.display_content==="template"?(a(),c("div",Dt,[e("div",Ft,[e("div",Ot,[Qt,b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:v[0]||(v[0]=g=>d(F(i).linkList)),class:"h-5 w-5 ml-2 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},Jt,512)),[[y,n.value]])])]),e("div",Rt,[(a(!0),c(H,null,j(F(i).linkList,(g,$)=>(a(),c("div",{key:`linkInput-${$}`,class:"flex items-center shrink-0 mb-2"},[e("div",Ut,[At,b(e("input",{"onUpdate:modelValue":C=>g.name=C,type:"text",readonly:!n.value,name:"",id:"link_detail",placeholder:"\u0E43\u0E2A\u0E48\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E25\u0E34\u0E49\u0E07\u0E01\u0E4C\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Pt),[[A,g.name]])]),e("div",Wt,[Yt,b(e("input",{"onUpdate:modelValue":C=>g.url=C,type:"text",readonly:!n.value,name:"",id:"link_url",placeholder:"https://simed.mahidol.ac.th",class:"w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"},null,8,Kt),[[A,g.url]])]),b((a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",onClick:C=>l($,F(i).linkList),class:"h-5 w-5 ml-2 shrink-0 cursor-pointer",viewBox:"0 0 20 20",fill:"currentColor"},Zt,8,Gt)),[[y,n.value]])]))),128))]),e("div",eo,[b(e("button",{onClick:v[1]||(v[1]=g=>n.value=!n.value),class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},so,512),[[y,!n.value]]),e("div",no,[b(e("button",{onClick:r,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},lo,512),[[y,n.value]]),b(e("button",{onClick:k,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},uo,512),[[y,n.value]])])])])):(a(),c("div",ho,[e("div",_o,[(a(!0),c(H,null,j(F(i).linkList,(g,$)=>(a(),c("div",{key:`linkInput-${$}`,class:"flex items-center shrink-0 mb-2"},[e("div",mo,[e("div",go,[e("div",po,[fo,e("a",{href:g.url,target:"_blank"},w(g.name),9,vo)])]),xo])]))),128))])]))}},bo={key:0},wo={key:1,class:"flex flex-col"},yo={class:"flex-grow"},ko={class:"mt-2"},$o=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1),Co=p(" \u0E41\u0E01\u0E49\u0E44\u0E02 "),So=[$o,Co],Bo={class:"flex"},Mo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),qo=p(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),To=[Mo,qo],Lo=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),p(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),p(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),Eo=p(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),zo=[Lo,Eo],Ho={key:2,class:"flex flex-col"},jo={class:"flex-grow"},No={class:"ql-container ql-snow"},Io=["innerHTML"],Ko={__name:"BtContact",props:{division_id:{type:Number,required:!0},branchSubMenu:{type:Object,required:!0},display_content:{type:String,required:!0}},setup(_){const h=_;O(()=>{window.removeEventListener("click",v,!1)});const i=x(),n=x(!0),u=E([]),d=E([]),l=I({id:null,detail_delta:null,detail_html:null}),r=(s,t,o)=>{D({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},k=s=>{const t=f(i.value.getContents().diff(s.oldContents));t.length&&u.push(t[0])&&console.log("delete",u)},f=s=>s.ops.filter(t=>t.insert&&t.insert.image).map(t=>t.insert.image),v=s=>{Array.prototype.forEach.call(s.clipboardData.items,t=>{if(t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){s.preventDefault(),q(t.getAsFile());return}else t.type.match(/^application\//i)?s.preventDefault():t.type.startsWith("text/html")&&Q(()=>{let o=document.querySelector("#quill_ourservice .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let m=document.querySelector("#quill_ourservice .ql-editor").getBoundingClientRect(),L=m.top+window.scrollY+m.height;setTimeout(()=>{window.scrollTo(0,L-window.innerHeight/2)},100)},300)})})},g=()=>{i.value.getEditor().addEventListener("paste",v,!1),i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),i.value.getQuill().enable(!1)},$=()=>{J.fire({title:"\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E15\u0E01\u0E25\u0E07",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{if(s.isConfirmed)z();else return i.value.setContents(JSON.parse(h.branchSubMenu.detail_delta)),B(),!1})},C=()=>{i.value.getQuill().enable(!0),n.value=!1},B=()=>{d.length&&M(d),u.splice(0),d.splice(0),g(),n.value=!0},q=s=>{const t=new FormData;t.append("image_file",s),t.append("store_path","branch_content/"+h.division_id+"/images"),axios.post(route("uploading_file_api"),t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{T(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},M=s=>{axios.post(route("delete_file_api"),{imgFiles:s}).then(t=>{console.log(t.data)}).catch(t=>{t.response&&t.response.status===401&&r("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=s=>{let t=i.value.getQuill();const o=t.getSelection();t.insertEmbed(o.index,"image",`${s}`,"user"),d.push(s)&&console.log("insert",d)},z=()=>{l.id=h.branchSubMenu.id,l.detail_delta=JSON.stringify(i.value.getContents()),l.detail_html=i.value.getHTML(),l.patch(route("admin.update_content_branch_sub_menu",l.id),{preserveState:!1,onSuccess:()=>{r("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),u.length&&M(u)},onError:s=>{let t="";for(let o in s)t=t+`- ${s[o]}<br/>`;r("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{l.reset(),u.splice(0),d.splice(0),n.value=!0}})};return(s,t)=>{const o=V("QuillEditor");return _.branchSubMenu?_.display_content==="template"?(a(),c("div",wo,[e("div",yo,[S(o,{ref_key:"quill_contact",ref:i,theme:"snow",contentType:"delta",onReady:t[0]||(t[0]=m=>g()),onTextChange:k},null,512)]),e("div",ko,[b(e("button",{onClick:C,class:"flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10"},So,512),[[y,n.value]]),e("div",Bo,[b(e("button",{onClick:$,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},To,512),[[y,!n.value]]),b(e("button",{onClick:B,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},zo,512),[[y,!n.value]])])])])):(a(),c("div",Ho,[e("div",jo,[e("div",No,[e("div",{class:"ql-editor",innerHTML:_.branchSubMenu.detail_html},null,8,Io)])])])):(a(),c("div",bo,[S(N)]))}}};export{Jo as _,Ro as a,Uo as b,Ao as c,Po as d,Wo as e,Yo as f,Ko as g};
