import{r as _,P as F,o as u,b as g,d as e,n as m,t as h,F as p,f as b,a as S}from"./app.289a7401.js";import{T as B}from"./ToggleSwitch.ce328a0c.js";import{t as j}from"./style.e9fb7906.js";const q={class:"m-4"},I={class:"flex flex-col space-y-4"},z={class:"flex items-center space-x-4"},M={class:"mt-1 flex items-center"},$=e("svg",{class:"w-6 h-6",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},[e("path",{d:"M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"})],-1),A=e("span",{class:"mt-2 text-base leading-normal"},"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B",-1),N=["disabled"],T={class:"text-xl font-bold underline"},E={class:"flex flex-col border border-dashed border-blue-500 p-4 rounded-md"},U=e("div",{class:"text-lg font-bold"},"\u0E2A\u0E48\u0E27\u0E19\u0E41\u0E2A\u0E14\u0E07\u0E23\u0E39\u0E1B\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14",-1),V=e("div",{class:"text-sm text-gray-600"},"*** \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 \u0E23\u0E39\u0E1B\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 .jpg \u0E2B\u0E23\u0E37\u0E2D .jpeg \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19 \u0E41\u0E25\u0E30\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E02\u0E19\u0E32\u0E14\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 2 MB \u0E15\u0E48\u0E2D\u0E23\u0E39\u0E1B",-1),D={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4"},L=["src"],R=["onClick"],G=e("div",{class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}," \u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14 ",-1),H=[G],P={class:"flex flex-col border border-dashed border-green-600 p-4 rounded-md mt-4"},J={class:"flex flex-col md:flex-row items-center justify-between"},K={class:"text-lg font-bold"},O={class:"flex flex-row"},Q=e("div",null,"\u0E40\u0E1B\u0E34\u0E14/\u0E1B\u0E34\u0E14 \u0E01\u0E32\u0E23\u0E25\u0E1A\u0E23\u0E39\u0E1B",-1),W={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4"},X=["src"],Y=["onClick"],se={__name:"ManageGallery",props:{id:{type:Number,required:!0,default:0},slug:{type:String,required:!0,default:""},desc:{type:String,required:!0,default:""},event_date:{type:String,required:!0,default:""},images:{type:Array,required:!0,default:[]},limit:{type:Number,require:!0}},setup(a){const v=a,n=_(v.limit),c=_(!1),r=_([]),i=F({id:v.id,desc:v.desc,event_date:v.event_date}),d=(s,t,l)=>{j({title:t,description:l},{showIcon:!0,transition:"zoom",position:"top-right",type:s,timeout:3e3})},x=s=>{var t=s.target.files||s.dataTransfer.files;if(!!t.length){if(t[0].size>1024*1024*2){d("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1F\u0E25\u0E4C\u0E23\u0E39\u0E1B\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E08\u0E32\u0E01\u0E44\u0E1F\u0E25\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E21\u0E35\u0E02\u0E19\u0E32\u0E14\u0E43\u0E2B\u0E0D\u0E48\u0E01\u0E27\u0E48\u0E32 2MB");return}if(!t[0].type.match("image/jp.*")){d("warning","\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19","\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1F\u0E25\u0E4C\u0E23\u0E39\u0E1B\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E2B\u0E49\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30 .jpg \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19");return}y(t)}},y=s=>{for(var t=0;t<s.length;t++){var l=new FileReader;l.onload=function(o){const f=o.target.result;r.value.push({file_url:f,File:s[0]})},l.readAsDataURL(s[t])}},w=s=>{r.value.splice(s,1)},k=()=>{i.transform(s=>({...s,imageFiles:r.value.map(t=>t.File)})).post(route("admin.gallery.upload_image_to_gallery",i.id),{_method:"patch",preserveState:!0,only:["images"],onSuccess:()=>{d("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14\u0E23\u0E39\u0E1B\u0E40\u0E02\u0E49\u0E32\u0E41\u0E01\u0E25\u0E25\u0E2D\u0E23\u0E35\u0E48 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),i.reset()},onError:s=>{let t="";for(let l in s)t=t+`- ${s[l]}<br/>`;d("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",t)},onFinish:()=>{i.processing=!1}}),r.value.splice(0)},C=s=>{i.transform(t=>({...t,file_path:s})).delete(route("admin.gallery.delete_image"),{preserveState:!0,only:["images"],onSuccess:()=>{d("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E17\u0E33\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E23\u0E39\u0E1B\u0E08\u0E32\u0E01\u0E41\u0E01\u0E25\u0E25\u0E2D\u0E23\u0E35\u0E48 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"),i.reset()},onError:t=>{let l="";for(let o in t)l=l+`- ${t[o]}<br/>`;d("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l)},onFinish:()=>{i.processing=!1}})};return(s,t)=>(u(),g("div",q,[e("div",I,[e("div",z,[e("div",M,[e("label",{class:m([{"cursor-not-allowed":r.value.length>=4||a.images.length>=n.value},"flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white"])},[$,A,e("input",{type:"file",accept:"image/jpeg",onChange:x,class:"hidden",disabled:r.value.length>=4||a.images.length>=n.value},null,40,N)],2)]),e("div",T,h(a.desc),1)]),e("div",E,[U,V,e("div",D,[(u(!0),g(p,null,b(r.value,(l,o)=>(u(),g("div",{key:o},[e("img",{class:"rounded-md shadow-md",src:l.file_url},null,8,L),e("button",{class:"p-1 border rounded-md bg-red-700 hover:bg-red-500 text-white hover:text-black",onClick:f=>w(o)},"\u0E25\u0E1A\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48 "+h(o+1),9,R)]))),128))])]),e("a",{class:m({hidden:!r.value.length||r.value.length>4||r.value.length+a.images.length>n.value}),href:"#",onClick:k},H,2),e("div",{class:m([{hidden:r.value.length&&r.value.length<=4},"text-red-600 font-bold"])},"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E23\u0E39\u0E1B \u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 4 \u0E23\u0E39\u0E1B\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14 1 \u0E04\u0E23\u0E31\u0E49\u0E07",2),e("div",{class:m([{hidden:r.value.length+a.images.length<=n.value},"text-red-600 text-sm"])},"*** \u0E40\u0E01\u0E34\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E23\u0E39\u0E1B\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E17\u0E35\u0E48\u0E08\u0E30\u0E40\u0E01\u0E47\u0E1A\u0E25\u0E07\u0E43\u0E19 gallery",2)]),e("div",P,[e("div",J,[e("div",K,"\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E02\u0E49\u0E32\u0E41\u0E01\u0E25\u0E25\u0E2D\u0E23\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 ( "+h(a.images.length)+"/"+h(n.value)+" )",1),e("div",O,[Q,S(B,{status:c.value,"onUpdate:status":t[0]||(t[0]=l=>c.value=l),onButtonIsToggle:t[1]||(t[1]=l=>c.value=!c.value)},null,8,["status"])])]),e("div",W,[(u(!0),g(p,null,b(a.images,(l,o)=>(u(),g("div",{key:o},[e("img",{class:"rounded-md shadow-md w-full h-40",src:l.image_url,alt:""},null,8,X),e("button",{class:m([{hidden:!c.value},"p-1 border rounded-md bg-red-700 hover:bg-red-500 text-white hover:text-black"]),onClick:f=>C(l.image_path)},"\u0E25\u0E1A\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48 "+h(o+1),11,Y)]))),128))])])]))}};export{se as default};
