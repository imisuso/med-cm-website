import{T as g,r as u,o as i,c as a,a as n,t as p,w as _,v as w,u as c,b as m,d as b,e as h,F as C,f as $,_ as k,n as B,g as A,i as S}from"./app-DEgVFtT5.js";import{r as T}from"./ReplyIcon-CZcp4Uqb.js";import{t as V}from"./style-DyveieFC.js";import{S as j}from"./sweetalert2-z6gKu1nJ.js";const N={class:"grid grid-cols-12 space-y-1"},F={class:"col-span-12 md:col-span-4 flex items-center"},O={class:"col-span-12 md:col-span-6 px-1"},q=["disabled"],z={class:"col-span-12 md:col-span-2 flex items-center space-x-2 font-semibold"},D={__name:"AbilityList",props:{ability:{type:Object,required:!0,default:{}}},setup(r){const d=r,s=g({ability_label:d.ability.label?u(d.ability.label):""}),t=u(!1),f=(l,e,o)=>{V({title:e,description:o},{showIcon:!0,transition:"zoom",position:"top-right",type:l,timeout:3e3})},y=l=>{j.fire({title:`คุณต้องการแก้ไขราละเอียด Ability ที่ชื่อ ${l.name} ?`,showCancelButton:!0,confirmButtonColor:"#b91c1c",cancelButtonColor:"#6b7280",confirmButtonText:"แก้ไข",cancelButtonText:"ยกเลิก"}).then(e=>{e.isConfirmed&&x(l.id)})},x=l=>{let e="";s.patch(route("admin.ability.update",l),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{f("success","สำเร็จ","แก้ไขข้อมูล Ability เรียบร้อย")},onError:o=>{for(let v in o)e=e+`- ${o[v]}<br/>`;f("danger","พบข้อผิดพลาด",e)},onFinish:()=>{s.processing=!1}}),t.value=!t.value};return(l,e)=>(i(),a("div",N,[n("div",F,p(r.ability.id)+". "+p(r.ability.name),1),n("div",O,[_(n("textarea",{name:"",id:"","onUpdate:modelValue":e[0]||(e[0]=o=>c(s).ability_label=o),class:"w-full rounded-md",disabled:!t.value},null,8,q),[[w,c(s).ability_label]])]),n("div",z,[t.value?m("",!0):(i(),a("button",{key:0,onClick:e[1]||(e[1]=o=>t.value=!t.value),class:"border bg-orange-400 p-1 mx-2 rounded-md text-white"},"edit")),t.value?(i(),a("button",{key:1,onClick:e[2]||(e[2]=o=>y(r.ability)),class:"border bg-orange-500 p-1 mx-2 rounded-md text-white"},"save")):m("",!0),t.value?(i(),a("button",{key:2,onClick:e[3]||(e[3]=o=>t.value=!t.value),class:"border bg-gray-500 p-1 rounded-md text-white"},"cancel")):m("",!0)])]))}},E={class:"flex flex-col p-4 w-full"},I={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},L={class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},U={layout:k},J=Object.assign(U,{__name:"Index",props:{abilities:{type:Object,required:!0,default:{}}},setup(r){return u(null),u(null),(d,s)=>(i(),a("div",E,[n("div",I,[s[1]||(s[1]=n("div",{class:"text-2xl font-bold"},"จัดการสิทธ์ (Ability)",-1)),b(c(S),{href:d.route("admin.role.index"),method:"get",as:"button",type:"button"},{default:h(()=>[n("button",L,[b(c(T),{class:B(["h-6 w-6 mr-2"])}),s[0]||(s[0]=A(" กลับหน้าจัดการ Role "))])]),_:1},8,["href"])]),(i(!0),a(C,null,$(r.abilities,t=>(i(),a("div",{class:"flex flex-col",key:t.id},[b(D,{ability:t},null,8,["ability"])]))),128))]))}});export{J as default};
