import{z as D,T as F,r as m,l as v,q as b,A as H,m as V,c as z,a as n,t as x,d as I,u as w,g as d,o as L}from"./app-DEgVFtT5.js";import{t as M}from"./style-DyveieFC.js";import{S as O}from"./sweetalert2-z6gKu1nJ.js";const Q={class:"flex flex-col m-2"},j={class:"mt-2 mb-2 text-lg"},J={class:"w-full ql-container ql-snow"},R=["innerHTML"],W={__name:"RichTextContentEditor",props:{sub_header:{type:Object,required:!0}},setup(g){const i=g;D(()=>{window.removeEventListener("click",h,!1)});const s=F({id:i.sub_header.id,detail_delta:JSON.parse(i.sub_header.detail_delta)}),p=m(i.sub_header.detail_html),l=m(),r=v([]),a=v([]);m([["bold","italic","underline","strike"],["blockquote"],[{header:[1,2,3,4,!1]}],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link"],["clean"]]);const y=()=>{l.value.getEditor().addEventListener("paste",h,!1),l.value.setContents(JSON.parse(i.sub_header.detail_delta)),l.value.getQuill().enable(!0)},C=()=>{O.fire({title:"คุณต้องการจัดเก็บข้อมูล ใช่ หรือ ไม่ ?",showCancelButton:!0,confirmButtonColor:"#1e40af",cancelButtonColor:"#6b7280",confirmButtonText:"ตกลง",cancelButtonText:"ยกเลิก"}).then(t=>{if(t.isConfirmed)B();else return l.value.setContents(JSON.parse(i.sub_header.detail_delta)),f(),!1})},c=(t,e,o)=>{M({title:e,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},k=t=>{const e=T(l.value.getContents().diff(t.oldContents));e.length&&r.push(e[0])&&console.log("delete",r)},T=t=>t.ops.filter(e=>e.insert&&e.insert.image).map(e=>e.insert.image),h=t=>{Array.prototype.forEach.call(t.clipboardData.items,e=>{if(e.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){t.preventDefault(),q(e.getAsFile());return}else e.type.match(/^application\//i)?t.preventDefault():e.type.startsWith("text/html")&&b(()=>{let o=document.querySelector("#quill_e .ql-editor");setTimeout(()=>{o.lastChild.scrollIntoView();let u=document.querySelector("#quill_e .ql-editor").getBoundingClientRect(),N=u.top+window.scrollY+u.height;setTimeout(()=>{window.scrollTo(0,N-window.innerHeight/2)},100)},300)})})},f=()=>{a.length&&_(a),r.splice(0),a.splice(0),s.post(route("admin.show_branch_main_menu",i.sub_header.division_id))},q=t=>{const e=new FormData;e.append("image_file",t),e.append("store_path","branch_content/"+i.sub_header.division_id+"/images"),axios.post(route("uploading_file_api"),e,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{S(o.data.url)}).catch(o=>{o.response&&o.response.status===401&&c("warning","คำเตือน","กรุณาเลือกเฉพาะไฟล์ที่เป็นรูปภาพเท่านั้น")})},_=t=>{axios.post(route("delete_file_api"),{imgFiles:t}).then(e=>{console.log(e.data)}).catch(e=>{e.response&&e.response.status===401&&c("warning","คำเตือน","ลบไฟล์ภาพเก่าไม่สำเร็จ")})},S=t=>{let e=l.value.getQuill();const o=e.getSelection();e.insertEmbed(o.index,"image",`${t}`,"user"),a.push(t)&&console.log("insert",a)},E=H(()=>{s.detail_delta,b(()=>{p.value=l.value.getHTML()})}),B=()=>{s.detail_delta=JSON.stringify(s.detail_delta),s.transform(t=>({...t,detail_html:p.value,division_id:i.sub_header.division_id})).patch(route("admin.richtext_content_update",s.id),{onSuccess:()=>{c("success","แก้ไขสำเร็จ",`แก้ไขข้อมูล ${i.sub_header.sub_header_name_th} เรียบร้อย`),r.length&&_(r),s.reset()},onError:t=>{let e="";for(let o in t)e=e+`- ${t[o]}<br/>`;c("danger","พบข้อผิดพลาด",e)},onFinish:()=>{s.processing=!1,r.splice(0),a.splice(0)}})};return(t,e)=>{const o=V("QuillEditor");return L(),z("div",Q,[n("div",j,x(g.sub_header.sub_header_name_th),1),n("div",null,[I(o,{id:"quill_e",ref_key:"quill_e",ref:l,content:w(s).detail_delta,"onUpdate:content":e[0]||(e[0]=u=>w(s).detail_delta=u),contentType:"delta",onReady:y,onTextChange:k},null,8,["content"]),n("div",{class:"flex items-center space-x-2 mt-2 mb-4"},[n("button",{onClick:C,class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},e[1]||(e[1]=[n("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),d(" บันทึก ")])),n("button",{onClick:f,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},e[2]||(e[2]=[n("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[n("path",{stroke:"none",d:"M0 0h24v24H0z"}),d(),n("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),d(),n("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),d(" ยกเลิก ")]))])]),n("div",J,[d(x(E.value)+" ",1),n("div",{innerHTML:p.value,class:"ql-editor border border-red-300 py-4 px-2 focus:outline-none"},null,8,R)])])}}};export{W as default};
