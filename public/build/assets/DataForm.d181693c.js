import{r as d,J as S,o as a,b as c,d as e,t as C,a as _,q as v,p as h,u as i,C as x,e as r,v as g,a9 as y,g as w,a7 as q}from"./app.8c4d088b.js";import{t as j}from"./style.16fc01d4.js";const z={class:"flex flex-col p-4 w-full"},B={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},D={class:"text-2xl font-bold"},F=e("div",{class:"text-gray-900 text-lg underline font-medium dark:text-white mb-4"}," \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E2D\u0E07 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),M={class:"flex flex-col border rounded-lg shadow-lg p-4"},N=e("label",{class:"block text-sm font-medium text-gray-700"}," \u0E23\u0E39\u0E1B\u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),$={class:"mt-2 flex items-center"},E={class:"inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100"},I=["src"],O=["src"],R={class:"flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white"},T=e("svg",{class:"w-6 h-6",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},[e("path",{d:"M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"})],-1),A=e("span",{class:"mt-2 text-base leading-normal"},"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B",-1),L={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},H=e("label",{for:"division_id",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25 :",-1),J=e("label",{for:"division_id",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E40\u0E25\u0E02 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 :",-1),W=e("label",{for:"name_thai",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E0A\u0E37\u0E48\u0E2D \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 (\u0E44\u0E17\u0E22) :",-1),G=e("label",{for:"name_eng",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E0A\u0E37\u0E48\u0E2D \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 (\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29) :",-1),K={class:"py-3"},P=e("div",null,[e("legend",{class:"text-base font-medium text-gray-900"},"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 :"),e("p",{class:"text-sm text-gray-500"},"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 \u0E2A\u0E32\u0E02\u0E32 \u0E2B\u0E23\u0E37\u0E2D \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19")],-1),Q={class:"mt-4 space-y-4"},X={class:"flex items-center"},Y=["checked"],Z=e("label",{for:"branch",class:"ml-3 block text-sm font-medium text-gray-700"}," \u0E2A\u0E32\u0E02\u0E32 ",-1),ee={class:"flex items-center"},se=["checked"],te=e("label",{for:"unit",class:"ml-3 block text-sm font-medium text-gray-700"}," \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),oe={class:"flex flex-row mt-2 space-x-4"},ie={layout:q},de=Object.assign(ie,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},division:{type:Object}},setup(f){const n=f,u=d(null),k=d(base_url),m=n.division?d(n.division.image_url):d(null),V=n.division?d(n.division.image):d(null);switch(n.action){case"insert":u.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"edit":u.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":u.value="\u0E25\u0E1A";break}const t=S({id:n.division?n.division.id:null,display_order:n.division?n.division.display_order:999,division_id:n.division?n.division.division_id:null,type:n.division?n.division.type:null,name_th:n.division?n.division.name_th:null,name_en:n.division?n.division.name_en:null,image:null}),p=(l,s,o)=>{j({title:s,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:l,timeout:3e3})},b=()=>{let l="";t.id?t.transform(s=>({...s,oldimage:V.value})).post(route("admin.division.update",t.id),{_method:"patch",preserveState:!1,preserveScroll:!0,onSuccess:()=>{p("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:s=>{for(let o in s)l=l+`- ${s[o]}<br/>`;p("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l)},onFinish:()=>{t.processing=!1}}):t.post(route("admin.division.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{p("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:s=>{for(let o in s)l=l+`- ${s[o]}<br/>`;p("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l)},onFinish:()=>{t.processing=!1}})},U=l=>{const s=l.target.files[0];s?m.value=URL.createObjectURL(s):m.value=""};return(l,s)=>(a(),c("div",z,[e("div",B,[e("div",D,C(u.value)+"\u0E2A\u0E32\u0E02\u0E32 / \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19",1),_(i(x),{href:l.route("admin.division"),method:"get",as:"button",type:"button",class:"px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:v(()=>[h(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01 ")]),_:1},8,["href"])]),F,e("div",M,[e("div",null,[N,e("div",$,[e("span",E,[i(m)?(a(),c("img",{key:1,src:i(m),class:"h-20 w-20 rounded-full"},null,8,O)):(a(),c("img",{key:0,src:`${k.value}/fallbackimage/default-blank-image.jpg`,class:"h-20 w-20 rounded-full"},null,8,I))]),e("label",R,[T,A,e("input",{type:"file",onInput:s[0]||(s[0]=o=>i(t).image=o.target.files[0]),onChange:U,class:"hidden"},null,32)])])]),e("div",L,[H,r(e("input",{type:"number",id:"division_id","onUpdate:modelValue":s[1]||(s[1]=o=>i(t).display_order=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[g,i(t).display_order]]),J,r(e("input",{type:"number",id:"division_id","onUpdate:modelValue":s[2]||(s[2]=o=>i(t).division_id=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[g,i(t).division_id]]),W,r(e("input",{type:"text",id:"name_thai","onUpdate:modelValue":s[3]||(s[3]=o=>i(t).name_th=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[g,i(t).name_th]]),G,r(e("input",{type:"text",id:"name_eng","onUpdate:modelValue":s[4]||(s[4]=o=>i(t).name_en=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[g,i(t).name_en]])]),e("fieldset",K,[P,e("div",Q,[e("div",X,[r(e("input",{id:"branch",type:"radio",value:"b","onUpdate:modelValue":s[5]||(s[5]=o=>i(t).type=o),checked:i(t).type==="b",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"},null,8,Y),[[y,i(t).type]]),Z]),e("div",ee,[r(e("input",{id:"unit",type:"radio",value:"u","onUpdate:modelValue":s[6]||(s[6]=o=>i(t).type=o),checked:i(t).type==="u",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"},null,8,se),[[y,i(t).type]]),te])])])]),e("div",oe,[f.action==="insert"?(a(),c("button",{key:0,type:"button",onClick:b,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")):w("",!0),f.action==="edit"?(a(),c("button",{key:1,type:"button",onClick:b,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02")):w("",!0),_(i(x),{href:l.route("admin.division"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:v(()=>[h(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")]),_:1},8,["href"])])]))}});export{de as default};