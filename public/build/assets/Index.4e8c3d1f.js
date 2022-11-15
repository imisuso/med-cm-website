import{o as a,c as b,a as f,H as O,p as T,r as l,l as z,K as H,w as q,b as u,e as k,a9 as A,u as i,d as o,F as S,f as I,i as $,g as x,v as K,s as P,a5 as R,h as m,t as W,n as B,L as C,S as G,U as J}from"./app.a6926c20.js";import{_ as Q}from"./PersonInteractiveCardList.116763c1.js";import{_ as X}from"./Paginations.d722dd6a.js";import{D as Y}from"./DivisionService.9245f2ae.js";import{t as Z}from"./style.e937d6bc.js";import{S as ee}from"./sweetalert2.all.73817881.js";import{r as te}from"./PlusSmIcon.40e9bbc7.js";import"./ToggleSwitch.fda073db.js";/* empty css                                                                 */import"./TrashIcon.0619c6ee.js";function se(r,p){return a(),b("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor","aria-hidden":"true"},[f("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"})])}const v=r=>(G("data-v-47113da0"),r=r(),J(),r),oe={class:"flex flex-col px-2 py-1 w-full"},re=v(()=>o("div",{class:"mt-2 mb-2 text-2xl font-bold"},"\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23",-1)),ne={key:0,class:"flex flex-col sm:flex-row items-start sm:items-center mb-2"},ie=v(()=>o("div",{class:"sm:w-32 text-sm font-medium text-gray-700"},"\u0E2A\u0E32\u0E02\u0E32/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19:",-1)),ae=["value"],le={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline"},de={class:"flex space-x-2 w-full place-self-center"},ue={key:0,class:"flex space-x-2"},ce=v(()=>o("div",null,"\u0E40\u0E1E\u0E34\u0E48\u0E21",-1)),me={class:"flex items-center w-28 py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"},fe=v(()=>o("div",null,"\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A",-1)),pe={class:"flex flex-col w-full mb-4"},ve={class:"flex justify-center md:justify-end mt-2 px-4"},_e={layout:R},ge=Object.assign(_e,{__name:"Index",props:{persons:{type:Object,required:!0,default:{}},filters:{type:Object}},setup(r){const p=r;T(()=>{V.value.listAll().then(e=>{_.value=e})});const j="/fallbackimage/default-blank-image.jpg",V=l(new Y),_=l([]),g=l(null),D=l(base_url);let n=p.filters.fdivision_selected?l(p.filters.fdivision_selected):l(z().props.value.auth.division_id),c=l(p.filters.search);const d=H({id:null,fullname:null});q(c,e=>{m.Inertia.get(route("admin.person"),{search:e,fdivision_selected:n.value},{preserveState:!0,replace:!0})});const w=(e,s,t)=>{Z({title:s,description:t},{showIcon:!0,transition:"zoom",position:"top-right",type:e,timeout:3e3})},F=()=>{m.Inertia.delete(route("admin.person.delete",d.id),{preserveState:!0,onSuccess:()=>{w("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:e=>{let s="";for(let t in e)s=s+`- ${e[t]}<br/>`;w("danger","\u0E1E\u0E1A\u0E1B\u0E31\u0E0D\u0E2B\u0E32",s)},onFinish:()=>{d.processing=!1}})},L=()=>{m.Inertia.get(route("admin.person"),{fdivision_selected:n.value},{preserveState:!0,replace:!0})},U=e=>{m.Inertia.get(route("admin.person.view",e.id),{},{preserveState:!0,replace:!0})},E=e=>{m.Inertia.get(route("admin.person.edit",e.id),{},{preserveState:!0,replace:!0})},M=e=>{g.value=e.image?e.image_url:`${D.value}${j}`,d.id=e.id,d.fullname=`${e.fname_th} ${e.lname_th}`,ee.fire({title:"\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23?",text:`${d.fullname}`,imageUrl:g.value,imageWidth:80,imageHeight:80,showCancelButton:!0,confirmButtonColor:"#b91c1c",cancelButtonColor:"#6b7280",confirmButtonText:"\u0E25\u0E1A",cancelButtonText:"\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"}).then(s=>{s.isConfirmed?F():(d.reset(),g.value=null)})},N=e=>{let s=_.value.filter(t=>t.division_id===e);return s.length>0?s[0].slug:""};return(e,s)=>(a(),u("div",oe,[re,e.$page.props.auth.abilities.includes("view_all_content")?(a(),u("div",ne,[ie,k(o("select",{"onUpdate:modelValue":s[0]||(s[0]=t=>$(n)?n.value=t:n=t),onChange:L,id:"form_division_id",class:"mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(a(!0),u(S,null,I(_.value,(t,h)=>(a(),u("option",{key:h,value:t.division_id},W(t.name_th),9,ae))),128))],544),[[A,i(n)]])])):x("",!0),o("div",le,[o("div",de,[k(o("input",{"onUpdate:modelValue":s[1]||(s[1]=t=>$(c)?c.value=t:c=t),type:"text",id:"search",placeholder:"\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E14\u0E49\u0E27\u0E22 \u0E0A\u0E37\u0E48\u0E2D \u0E2B\u0E23\u0E37\u0E2D \u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25",class:"block mx-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[K,i(c)]])]),e.$page.props.auth.abilities.includes("manage_person")?(a(),u("div",ue,[f(i(C),{href:e.route("admin.person.create"),data:{fdivision_selected:i(n)},method:"get",as:"button",type:"button",class:"flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:P(()=>[o("div",null,[f(i(te),{class:B(["h-6 w-6"])})]),ce]),_:1},8,["href","data"]),i(n)!=0&&r.persons.total>1?(a(),b(i(C),{key:0,href:e.route("admin.person_order",N(parseInt(i(n))))},{default:P(()=>[o("button",me,[o("div",null,[f(i(se),{class:B(["h-6 w-6"])})]),fe])]),_:1},8,["href"])):x("",!0)])):x("",!0)]),o("div",pe,[(a(!0),u(S,null,I(r.persons.data,(t,h)=>(a(),b(Q,{key:h,personDetails:t,"order-input":!1,onEditPerson:y=>E(t),onViewPerson:y=>U(t),onDeletePerson:y=>M(t)},null,8,["personDetails","onEditPerson","onViewPerson","onDeletePerson"]))),128))]),o("div",ve,[f(X,{pagination:r.persons},null,8,["pagination"])])]))}});var Be=O(ge,[["__scopeId","data-v-47113da0"]]);export{Be as default};
