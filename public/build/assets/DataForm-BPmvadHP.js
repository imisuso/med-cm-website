const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MonthYearCustom-Bevh7Qh4.js","assets/app-DEgVFtT5.js","assets/app-d1yG1Zbo.css","assets/MonthYearCustom-Cz48B7x9.css"])))=>i.map(i=>d[i]);
import{A as V,r as x,l as B,T as z,m as S,c,a as t,t as u,d as h,e as f,u as i,w as T,v as E,F as H,f as O,b as F,_ as A,o as m,g as p,i as M,G as I,H as N}from"./app-DEgVFtT5.js";import{d}from"./th-SlDGtdRe.js";import{b as P}from"./buddhistEra-BYwozhve.js";import{t as R}from"./style-DyveieFC.js";const $={class:"flex flex-col p-4 w-full"},G={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border rounded-md shadow-md items-baseline"},L={class:"text-2xl font-bold"},U={class:"shadow sm:rounded-md"},q={class:"px-4 py-5 bg-white sm:p-6"},W={class:"grid grid-cols-6 gap-6 mb-6"},J={class:"col-span-6"},K={class:"col-span-6"},Q={class:"col-span-6"},X={class:"my-1"},Z={class:"flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md"},ee={class:"flex flex-col"},te={class:"p-2"},se={class:"flex items-center m-2 sm:m-1"},oe={class:"p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white"},ae=["id","accept","onChange"],re={class:"flex flex-row mt-2 space-x-4"},le={layout:A},ue=Object.assign(le,{__name:"DataForm",props:{action:{type:String,require:!0,default:"create"},gallery:{type:Object}},setup(b){const l=b,Y=I(()=>N(()=>import("./MonthYearCustom-Bevh7Qh4.js"),__vite__mapDeps([0,1,2,3])));V(()=>Y),d.extend(P);const y=x(null),_=x(!1),w=x(!1),v=B([{name:"",size:0,label:"รูปหน้าปก",accept:".jpg,.jpeg"}]);switch(l.action){case"create":y.value="เพิ่ม";break;case"edit":y.value="แก้ไข";break}const a=z({id:l.gallery?l.gallery.id:null,desc:l.gallery?l.gallery.desc:null,event_date:l.gallery?d(l.gallery.event_date).startOf("day").toDate():d().startOf("day").toDate()}),n=(o,e,r)=>{R({title:e,description:r},{showIcon:!0,transition:"zoom",position:"top-right",type:o,timeout:3e3})},k=o=>d(o).locale("th").format("วันddddที่ D MMMM BBBB"),j=(o,e,r)=>{let s=r.target.files[0];e.File=s,e.name=s.name,e.size=s.size,e.size>1024*1024*2?(_.value=!1,n("warning","คำเตือน","เพิ่มไฟล์ไม่ได้ เนื่องจากไฟล์ของคุณมีขนาดใหญ่กว่า 2MB")):_.value=!0,o===0&&(s.type.match("image/jp.*")?w.value=!0:(w.value=!1,n("warning","คำเตือน","เพิ่มไฟล์แนบไม่ได้ เนื่องจากอนุญาตให้แนบไฟล์เฉพาะ .jpg เท่านั้น")))},D=()=>{let o="";a.id?a.transform(e=>({...e,event_date:d(e.event_date).format("YYYY-MM-DD HH:mm:ss"),cover:v[0].File})).post(route("admin.gallery.update",a.id),{_method:"patch",preserveState:!0,onSuccess:()=>{n("success","สำเร็จ","แก้ไขข้อมูลแกลลอรี่รูปกิจกรรม เรียบร้อย")},onError:e=>{for(let r in e)o=o+`- ${e[r]}<br/>`;n("danger","พบข้อผิดพลาด",o)},onFinish:()=>{a.processing=!1}}):a.transform(e=>({...e,event_date:d(e.event_date).format("YYYY-MM-DD HH:mm:ss"),cover:v[0].File})).post(route("admin.gallery.store"),{preserveState:!0,onSuccess:()=>{n("success","สำเร็จ","สร้างแกลลอรี่รูปกิจกรรม เรียบร้อย")},onError:e=>{for(let r in e)o=o+`- ${e[r]}<br/>`;n("danger","พบข้อผิดพลาด",o)},onFinish:()=>{a.processing=!1}})};return(o,e)=>{const r=S("Datepicker");return m(),c("div",$,[t("div",G,[t("div",L,u(y.value)+"ข้อมูลแกลลอรี่รูปกิจกรรม",1),h(i(M),{href:o.route("admin.gallery"),method:"get",as:"button",type:"button",class:"px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:f(()=>e[2]||(e[2]=[p(" กลับหน้าหลัก ")])),_:1},8,["href"])]),e[7]||(e[7]=t("div",{class:"text-gray-900 text-lg underline font-medium dark:text-white mb-4"}," รายละเอียดข้อมูลแกลลอรี่รูปกิจกรรม ",-1)),t("div",U,[t("div",q,[t("fieldset",null,[t("div",W,[t("div",J,[e[3]||(e[3]=t("label",{for:"topic",class:"block text-sm font-medium text-gray-700 mb-2"},"วันที่จัดกิจกรรม",-1)),h(r,{"menu-class-name":"shadow-lg shadow-stone-800/50",placeholder:"default 30 วัน",modelValue:i(a).event_date,"onUpdate:modelValue":e[0]||(e[0]=s=>i(a).event_date=s),locale:"th",cancelText:"ยกเลิก",selectText:"เลือก",yearRange:[new Date().getFullYear()-5,new Date().getFullYear()],enableTimePicker:!1,format:k,previewFormat:k,maxDate:new Date,clearable:!1,"auto-position":!0,autoApply:""},{year:f(({value:s})=>[p(u(parseInt(s)+543),1)]),"year-overlay-value":f(({text:s,value:g})=>[p(u(parseInt(s)+543),1)]),_:1},8,["modelValue","yearRange","maxDate"])]),t("div",K,[e[4]||(e[4]=t("div",{class:"flex items-center justify-between"},[t("label",{for:"desc",class:"block text-sm font-medium text-gray-700"},"รายละเอียดกิจกรรม")],-1)),T(t("input",{type:"text",id:"desc","onUpdate:modelValue":e[1]||(e[1]=s=>i(a).desc=s),class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[E,i(a).desc,void 0,{trim:!0}]])]),t("ul",Q,[(m(!0),c(H,null,O(v,(s,g)=>(m(),c("li",{key:g},[t("div",X,[t("div",Z,[t("div",ee,[t("div",te,[e[5]||(e[5]=t("strong",null,"ชื่อไฟล์ : ",-1)),p(u(s.name),1)])]),t("div",se,[t("label",null,[t("span",oe,u(s.label),1),t("input",{id:"file-"+g,type:"file",accept:s.accept,onChange:C=>j(g,s,C),style:{display:"none"}},null,40,ae)])])])])]))),128))])])])])]),t("div",re,[b.action==="create"?(m(),c("button",{key:0,type:"button",onClick:D,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"จัดเก็บ")):F("",!0),b.action==="edit"?(m(),c("button",{key:1,type:"button",onClick:D,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"แก้ไข")):F("",!0),h(i(M),{href:o.route("admin.gallery"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:f(()=>e[6]||(e[6]=[p(" ยกเลิก ")])),_:1},8,["href"])])])}}});export{ue as default};
