import{K as h,J as p,r as x,b as g,d as e,a as v,u as n,x as o,t as i,F as f,C as y,o as b}from"./app.84d6efa1.js";const C={class:"flex items-center space-x-2 mt-2 mb-4"},k=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),w=o(" \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 "),T=[k,w],q=e("svg",{class:"h-5 w-5 text-red-500",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{stroke:"none",d:"M0 0h24v24H0z"}),o(),e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),o(),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1),B=o(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),E=[q,B],H={class:"ql-container ql-snow"},M=["innerHTML"],O={__name:"RichTextEditor",props:{agreement:{type:Object,required:!0}},setup(d){const a=d,t=h({id:a.agreement.id,deltaContent:null,htmlContent:null}),c=p({readOnly:!1}),r=x(),u=()=>{r.value.setContents(JSON.parse(a.agreement.detail_delta)),r.value.getQuill().enable(!0)},m=()=>{t.htmlContent=r.value.getHTML()};return(V,s)=>{const _=y("QuillEditor");return b(),g(f,null,[e("div",null,[v(_,{ref_key:"quill_e",ref:r,theme:"snow",toolbar:"full",content:n(t).deltaContent,"onUpdate:content":s[0]||(s[0]=l=>n(t).deltaContent=l),contentType:"delta",onReady:u,options:c},null,8,["content","options"]),e("div",C,[e("button",{onClick:s[1]||(s[1]=l=>m()),class:"flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10"},T),e("button",{onClick:l=>!0,class:"flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10"},E)])]),o(" "+i(n(t).deltaContent)+" ",1),e("div",H,[e("div",{class:"ql-editor",innerHTML:n(t).htmlContent},null,8,M)]),o(" "+i(n(t).htmlContent),1)],64)}}};export{O as default};