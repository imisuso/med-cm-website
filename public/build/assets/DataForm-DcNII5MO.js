import{r as d,T,k as B,c as m,a as e,t as n,d as i,e as p,u as r,D as v,n as _,b as x,_ as E,o as f,g as w,i as S}from"./app-DEgVFtT5.js";import{T as F}from"./ToggleSwitch-G0zxQNrd.js";import{l as R,s as k}from"./vue-multiselect.css_vue_type_style_index_0_src_true_lang-Dl7Hl7Gz.js";import{t as z}from"./style-DyveieFC.js";import{r as A,a as D}from"./EyeIcon-DTvfDwRQ.js";import{r as L}from"./ReplyIcon-CZcp4Uqb.js";const I={class:"flex flex-col p-4 w-full"},O={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},P={class:"text-2xl font-bold"},q={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},W={class:"flex flex-col border rounded-lg shadow-lg p-4"},G={class:"flex justify-center md:justify-start"},H=["src"],J=["src"],K={class:"grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6"},M={class:"flex items-center"},Q=["src"],X={"slot:singleLabel":"props"},Y={"slot:option":"props"},Z={class:"col-span-4"},ee={id:"status",class:"flex items-center my-2 sm:my-0"},se={class:"text-blue-600"},te={class:"text-blue-600"},oe={class:"flex flex-row mt-2 space-x-4"},le={layout:E},de=Object.assign(le,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},user:{type:Object},person:{type:Array,default:[]},roles:{type:Array,default:[]}},setup(u){const l=u,g=d(null),C=d(base_url);switch(l.action){case"insert":g.value="เพิ่ม";break;case"edit":g.value="แก้ไข";break;case"delete":g.value="ลบ";break}const a=T({user_id:l.user?l.user.id:null,role_name:l.user&&l.user.roles.length?l.user.roles[0].name:null,status:l.user?l.user.status:!0}),c=l.user?l.person[0]:d(null),h=l.user&&l.user.roles.length?d(l.user.roles[0]):d(null),b=(t,s,o)=>{z({title:s,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},V=({name:t})=>`${t}`,j=R.throttle(t=>{B.get(route("admin.user.create"),{term:t},{preserveState:!0,preserveScroll:!0,replace:!0})},300),N=t=>{a.user_id=t.id},U=t=>{a.role_name=t.name},$=()=>{a.status=!a.status},y=()=>{let t="";l.action==="edit"?a.patch(route("admin.user.update",a.user_id),{preserveState:!1,preserveScroll:!0,onSuccess:()=>{b("success","สำเร็จ","แก้ไขข้อมูลผู้ใช้งานเรียบร้อย")},onError:s=>{for(let o in s)t=t+`- ${s[o]}<br/>`;b("danger","พบข้อผิดพลาด",t)},onFinish:()=>{a.processing=!1}}):a.post(route("admin.user.store",a.user_id),{preserveState:!1,preserveScroll:!0,onSuccess:()=>{b("success","สำเร็จ","เพิ่มข้อมูลผู้ใช้งานเรียบร้อย")},onError:s=>{for(let o in s)t=t+`- ${s[o]}<br/>`;b("danger","พบข้อผิดพลาด",t)},onFinish:()=>{a.processing=!1}})};return(t,s)=>(f(),m("div",I,[e("div",O,[e("div",P,n(g.value)+"ผู้ใช้งาน",1),i(r(S),{href:t.route("admin.user.index"),method:"get",as:"button",type:"button"},{default:p(()=>[e("button",q,[i(r(L),{class:_(["h-6 w-6 mr-2"])}),s[2]||(s[2]=w(" กลับหน้าผู้ใช้งาน "))])]),_:1},8,["href"])]),e("div",W,[e("div",G,[r(c)?(f(),m("img",{key:1,src:r(c).image_url,alt:"No Picture",class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300"},null,8,J)):(f(),m("img",{key:0,src:`${C.value}/fallbackimage/default-blank-image.jpg`,alt:"No Picture",class:"object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300"},null,8,H))]),e("div",K,[s[3]||(s[3]=e("label",{for:"user_id",class:"col-span-6 md:col-span-1 mr-2 self-end"},"ผู้ใช้งาน :",-1)),i(r(k),{id:"user_id",modelValue:r(c),"onUpdate:modelValue":s[0]||(s[0]=o=>v(c)?c.value=o:null),"deselect-label":"Can't remove this value","track-by":"id",label:"lname_th",internalSearch:!1,placeholder:"กรุณาเลือกผู้ใช้งาน",class:"col-span-6 md:col-span-5",disabled:!!u.user,"show-labels":!1,options:u.person,searchable:!u.user,"allow-empty":!1,onSearchChange:r(j),onSelect:N},{singleLabel:p(o=>[e("span",null,[e("strong",null,n(o.option.fname_th)+" - "+n(o.option.lname_th)+" ["+n(o.option.division.name_th)+"]",1)])]),option:p(o=>[e("div",M,[e("img",{class:"h-14 w-12 p-1",src:o.option.image_url,alt:"Not Available"},null,8,Q),e("strong",null,n(o.option.fname_th)+" - "+n(o.option.lname_th)+" ["+n(o.option.division.name_th)+"]",1)])]),_:1},8,["modelValue","disabled","options","searchable","onSearchChange"]),s[4]||(s[4]=e("label",{for:"role_name",class:"col-span-6 md:col-span-1 mr-2 self-end"},"หน้าที่ :",-1)),i(r(k),{id:"role_name",modelValue:r(h),"onUpdate:modelValue":s[1]||(s[1]=o=>v(h)?h.value=o:null),"deselect-label":"Can't remove this value","track-by":"name",label:"name",placeholder:"กรุณาเลือกหน้าที่รับผิดชอบ",class:"col-span-6 md:col-span-5","custom-label":V,"show-labels":!1,options:u.roles,searchable:!1,"allow-empty":!1,onSelect:U},{default:p(()=>[e("template",X,[e("span",null,n(l.option.name),1)]),e("template",Y,[e("span",null,[e("strong",null,n(l.option.name),1)])])]),_:1},8,["modelValue","options"]),s[5]||(s[5]=e("label",{for:"status",class:"col-span-2 md:col-span-1 mr-2 self-center"},"สถานะ :",-1)),e("div",Z,[e("div",ee,[e("div",se,[i(r(A),{class:_(["h-4 w-4"])})]),i(F,{status:r(a).status,onButtonIsToggle:$},null,8,["status"]),e("div",te,[i(r(D),{class:_(["h-4 w-4"])})])])])])]),e("div",oe,[u.action==="insert"?(f(),m("button",{key:0,type:"button",onClick:y,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"จัดเก็บ")):x("",!0),u.action==="edit"?(f(),m("button",{key:1,type:"button",onClick:y,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"แก้ไข")):x("",!0),i(r(S),{href:t.route("admin.user.index"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:p(()=>s[6]||(s[6]=[w(" ยกเลิก ")])),_:1},8,["href"])])]))}});export{de as default};
