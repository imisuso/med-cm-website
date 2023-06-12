import{r as d,P as U,o as a,b as r,d as e,t as C,a as h,s as v,q as _,u as i,D as x,e as c,v as f,ab as y,g as w,a7 as j}from"./app.d39ae179.js";import{t as q}from"./style.23244c32.js";const D={class:"flex flex-col p-4 w-full"},z={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},B={class:"text-2xl font-bold"},F=e("div",{class:"text-gray-900 text-lg underline font-medium dark:text-white mb-4"}," \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E2D\u0E07 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),M={class:"flex flex-col border rounded-lg shadow-lg p-4"},N=e("label",{class:"block text-sm font-medium text-gray-700"}," \u0E23\u0E39\u0E1B\u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),$={class:"mt-2 flex items-center"},E={class:"inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100"},I=["src"],O=["src"],R={class:"flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white"},A=e("svg",{class:"w-6 h-6",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},[e("path",{d:"M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"})],-1),L=e("span",{class:"mt-2 text-base leading-normal"},"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E39\u0E1B",-1),T={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},H=e("label",{for:"division_id",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E40\u0E25\u0E02 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 :",-1),P=e("label",{for:"name_thai",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E0A\u0E37\u0E48\u0E2D \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 (\u0E44\u0E17\u0E22) :",-1),W=e("label",{for:"name_eng",class:"col-span-6 md:col-span-2 mr-2 self-end"},"\u0E0A\u0E37\u0E48\u0E2D \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 (\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29) :",-1),G={class:"py-3"},J=e("div",null,[e("legend",{class:"text-base font-medium text-gray-900"},"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 :"),e("p",{class:"text-sm text-gray-500"},"\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 \u0E2A\u0E32\u0E02\u0E32 \u0E2B\u0E23\u0E37\u0E2D \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19")],-1),K={class:"mt-4 space-y-4"},Q={class:"flex items-center"},X=["checked"],Y=e("label",{for:"branch",class:"ml-3 block text-sm font-medium text-gray-700"}," \u0E2A\u0E32\u0E02\u0E32 ",-1),Z={class:"flex items-center"},ee=["checked"],te=e("label",{for:"unit",class:"ml-3 block text-sm font-medium text-gray-700"}," \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 ",-1),se={class:"flex flex-row mt-2 space-x-4"},oe={layout:j},le=Object.assign(oe,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},division:{type:Object}},setup(p){const n=p,u=d(null),k=d(base_url),m=n.division?d(n.division.image_url):d(null),V=n.division?d(n.division.image):d(null);switch(n.action){case"insert":u.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"edit":u.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":u.value="\u0E25\u0E1A";break}const s=U({id:n.division?n.division.id:null,division_id:n.division?n.division.division_id:null,type:n.division?n.division.type:null,name_th:n.division?n.division.name_th:null,name_en:n.division?n.division.name_en:null,image:null}),g=(l,t,o)=>{q({title:t,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:l,timeout:3e3})},b=()=>{let l="";s.id?s.transform(t=>({...t,oldimage:V.value})).post(route("admin.division.update",s.id),{_method:"patch",preserveState:!1,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{for(let o in t)l=l+`- ${t[o]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l)},onFinish:()=>{s.processing=!1}}):s.post(route("admin.division.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{g("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{for(let o in t)l=l+`- ${t[o]}<br/>`;g("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l)},onFinish:()=>{s.processing=!1}})},S=l=>{const t=l.target.files[0];t?m.value=URL.createObjectURL(t):m.value=""};return(l,t)=>(a(),r("div",D,[e("div",z,[e("div",B,C(u.value)+"\u0E2A\u0E32\u0E02\u0E32 / \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19",1),h(i(x),{href:l.route("admin.division"),method:"get",as:"button",type:"button",class:"px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:v(()=>[_(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01 ")]),_:1},8,["href"])]),F,e("div",M,[e("div",null,[N,e("div",$,[e("span",E,[i(m)?(a(),r("img",{key:1,src:i(m),class:"h-20 w-20 rounded-full"},null,8,O)):(a(),r("img",{key:0,src:`${k.value}/fallbackimage/default-blank-image.jpg`,class:"h-20 w-20 rounded-full"},null,8,I))]),e("label",R,[A,L,e("input",{type:"file",onInput:t[0]||(t[0]=o=>i(s).image=o.target.files[0]),onChange:S,class:"hidden"},null,32)])])]),e("div",T,[H,c(e("input",{type:"number",id:"division_id","onUpdate:modelValue":t[1]||(t[1]=o=>i(s).division_id=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[f,i(s).division_id]]),P,c(e("input",{type:"text",id:"name_thai","onUpdate:modelValue":t[2]||(t[2]=o=>i(s).name_th=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[f,i(s).name_th]]),W,c(e("input",{type:"text",id:"name_eng","onUpdate:modelValue":t[3]||(t[3]=o=>i(s).name_en=o),required:"true",class:"col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[f,i(s).name_en]])]),e("fieldset",G,[J,e("div",K,[e("div",Q,[c(e("input",{id:"branch",type:"radio",value:"b","onUpdate:modelValue":t[4]||(t[4]=o=>i(s).type=o),checked:i(s).type==="b",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"},null,8,X),[[y,i(s).type]]),Y]),e("div",Z,[c(e("input",{id:"unit",type:"radio",value:"u","onUpdate:modelValue":t[5]||(t[5]=o=>i(s).type=o),checked:i(s).type==="u",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"},null,8,ee),[[y,i(s).type]]),te])])])]),e("div",se,[p.action==="insert"?(a(),r("button",{key:0,type:"button",onClick:b,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")):w("",!0),p.action==="edit"?(a(),r("button",{key:1,type:"button",onClick:b,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02")):w("",!0),h(i(x),{href:l.route("admin.division"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:v(()=>[_(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")]),_:1},8,["href"])])]))}});export{le as default};
