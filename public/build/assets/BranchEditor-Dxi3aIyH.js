import{s as d,I as u,a5 as g,r as e,m,c as p,a as t,d as b,o as h}from"./app-D_J6jNxv.js";import{B as f}from"./index-DXFaliQP.js";const q=u({components:{QuillEditor:g},setup(l){const o=e(),n=e([[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline"],[{list:"ordered"},{list:"bullet"},{align:[]}],["blockquote","code-block","link"],[{color:[]},"clean"]]),s=e([[{header:1},{header:2}],["bold","italic","underline"],[{list:"ordered"},{list:"bullet"},{align:[]}]]),r=e([["bold","italic","underline","strike"],["blockquote","code-block"],[{header:[1,2,3,4,5,6,!1]}],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],[{align:[]}],["link","video","image"],["clean"]]),i=e({scrollingContainer:".scroll-container"});return{content:e('<h1 class="ql-align-center"><strong style="color: rgb(0, 138, 0);"><u>วิสัยทัศน์</u></strong></h1><ul><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ul><p><br></p>                              <h1 class="ql-align-center"><strong style="color: rgb(0, 102, 204);"><u>พันธกิจ</u></strong></h1><ol><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ol><p>  </p>                              <h1 class="ql-align-center"><strong style="color: rgb(153, 51, 255);"><u>คำขวัญ</u></strong></h1><ul><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ul><p><br></p><p><br></p>'),quill:o,my_essential:n,my_minimal:s,my_full:r,showData:()=>{console.log(o.value.getHTML())},modules:{name:"blotFormatter",module:f,options:{}},options:i}}}),k={class:"container m-2"},_={class:"w-3/4 scroll-container"};function v(l,o,n,s,r,i){const a=m("QuillEditor");return h(),p("div",k,[o[1]||(o[1]=t("div",{class:"text-3xl m-2 p-2"},"เพิ่มข้อมูลของสาขา",-1)),t("div",_,[b(a,{content:l.content,contentType:"html",toolbar:l.my_full,theme:"snow",ref:"quill",modules:l.modules,options:l.options},null,8,["content","toolbar","modules","options"])]),t("div",null,[t("button",{onClick:o[0]||(o[0]=(...c)=>l.showData&&l.showData(...c)),class:"bg-green-900 text-white rounded-md m-2 p-2"},"จัดเก็บข้อมูล")])])}const E=d(q,[["render",v],["__scopeId","data-v-79938c28"]]);export{E as default};