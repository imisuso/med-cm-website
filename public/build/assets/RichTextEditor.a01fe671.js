import{G as h,E as p,r as g,o as x,d as v,e,j as f,u as n,m as o,t as a,F as y,z as b}from"./app.5ef6262d.js";const k={class:"flex items-center space-x-2 mt-2 mb-4"},w=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),C=o(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),T=[w,C],q=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),o(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),o(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),E=o(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),B=[q,E],H={class:"ql-container ql-snow"},M=["innerHTML"],z={__name:"RichTextEditor",props:{agreement:{type:Object,required:!0}},setup(d){const i=d,t=h({id:i.agreement.id,deltaContent:null,htmlContent:null}),c=p({readOnly:!1}),r=g(),u=()=>{r.value.setContents(JSON.parse(i.agreement.detail_delta)),r.value.getQuill().enable(!0)},m=()=>{t.htmlContent=r.value.getHTML()};return(V,s)=>{const _=b("QuillEditor");return x(),v(y,null,[e("div",null,[f(_,{ref_key:"quill_e",ref:r,theme:"snow",toolbar:"full",content:n(t).deltaContent,"onUpdate:content":s[0]||(s[0]=l=>n(t).deltaContent=l),contentType:"delta",onReady:u,options:c},null,8,["content","options"]),e("div",k,[e("button",{onClick:s[1]||(s[1]=l=>m()),class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},T),e("button",{onClick:l=>!0,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},B)])]),o(" "+a(n(t).deltaContent)+" ",1),e("div",H,[e("div",{class:"ql-editor",innerHTML:n(t).htmlContent},null,8,M)]),o(" "+a(n(t).htmlContent),1)],64)}}};export{z as default};
