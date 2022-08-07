import{i as D,D as F,r as p,C as b,E as x,s as N,o as H,d as V,e as o,t as w,j,u as h,m as c,z}from"./app.d461b347.js";import"./index.9ed33f7f.js";import{t as I}from"./style.1b813e51.js";const L={class:"flex flex-col m-2"},M={class:"mt-2 mb-2 text-lg"},O={class:"flex items-center space-x-2 mt-2 mb-4"},Q=o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),J=c(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),R=[Q,J],$=o("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[o("path",{stroke:"none",d:"M0 0h24v24H0z"}),c(),o("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),c(),o("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),U=c(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),A=[$,U],W={class:"w-full ql-container ql-snow"},Y=["innerHTML"],X={__name:"RichTextContentEditor",props:{sub_header:{type:Object,required:!0}},setup(_){const i=_;D(()=>{window.removeEventListener("click",g,!1)});const s=F({id:i.sub_header.id,detail_delta:JSON.parse(i.sub_header.detail_delta)}),m=p(i.sub_header.detail_html),l=p(),r=b([]),a=b([]);p([["bold","italic","underline","strike"],["blockquote"],[{header:[1,2,3,4,!1]}],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link"],["clean"]]);const y=()=>{l.value.getEditor().addEventListener("paste",g,!1),l.value.setContents(JSON.parse(i.sub_header.detail_delta)),l.value.getQuill().enable(!0)},u=(t,e,n)=>{I({title:e,description:n},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},k=t=>{const e=C(l.value.getContents().diff(t.oldContents));e.length&&r.push(e[0])&&console.log("delete",r)},C=t=>t.ops.filter(e=>e.insert&&e.insert.image).map(e=>e.insert.image),g=t=>{Array.prototype.forEach.call(t.clipboardData.items,e=>{if(e.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)){t.preventDefault(),q(e.getAsFile());return}else e.type.match(/^application\//i)?t.preventDefault():e.type.startsWith("text/html")&&x(()=>{let n=document.querySelector("#quill_e .ql-editor");setTimeout(()=>{n.lastChild.scrollIntoView();let d=document.querySelector("#quill_e .ql-editor").getBoundingClientRect(),B=d.top+window.scrollY+d.height;setTimeout(()=>{window.scrollTo(0,B-window.innerHeight/2)},100)},300)})})},f=()=>{a.length&&v(a),r.splice(0),a.splice(0),s.post(route("admin.show_branch_main_menu",i.sub_header.division_id))},q=t=>{const e=new FormData;e.append("image_file",t),e.append("store_path","branch_content/"+i.sub_header.division_id+"/images"),axios.post(route("uploading_file_api"),e,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{T(n.data.url)}).catch(n=>{n.response&&n.response.status===401&&u("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")})},v=t=>{axios.post(route("delete_file_api"),{imgFiles:t}).then(e=>{console.log(e.data)}).catch(e=>{e.response&&e.response.status===401&&u("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E25\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E1E\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")})},T=t=>{let e=l.value.getQuill();const n=e.getSelection();e.insertEmbed(n.index,"image",`${t}`,"user"),a.push(t)&&console.log("insert",a)},E=N(()=>{s.detail_delta,x(()=>{m.value=l.value.getHTML()})}),S=()=>{s.detail_delta=JSON.stringify(s.detail_delta),s.transform(t=>({...t,detail_html:m.value,division_id:i.sub_header.division_id})).patch(route("admin.richtext_content_update",s.id),{onBefore:()=>{if(!confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E43\u0E0A\u0E48 \u0E2B\u0E23\u0E37\u0E2D \u0E44\u0E21\u0E48 ?"))return l.value.setContents(JSON.parse(i.sub_header.detail_delta)),f(),!1},onSuccess:()=>{u("success","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",`\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ${i.sub_header.sub_header_name_th} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22`),r.length&&v(r),s.reset()},onError:t=>{u("danger",t.msg,t.sysmsg)},onFinish:()=>{s.processing=!1,r.splice(0),a.splice(0)}})};return(t,e)=>{const n=z("QuillEditor");return H(),V("div",L,[o("div",M,w(_.sub_header.sub_header_name_th),1),o("div",null,[j(n,{id:"quill_e",ref_key:"quill_e",ref:l,content:h(s).detail_delta,"onUpdate:content":e[0]||(e[0]=d=>h(s).detail_delta=d),contentType:"delta",onReady:y,onTextChange:k},null,8,["content"]),o("div",O,[o("button",{onClick:e[1]||(e[1]=d=>S()),class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},R),o("button",{onClick:f,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},A)])]),o("div",W,[c(w(h(E))+" ",1),o("div",{innerHTML:m.value,class:"ql-editor border border-red-300 py-4 px-2 focus:outline-none"},null,8,Y)])])}}};export{X as default};
