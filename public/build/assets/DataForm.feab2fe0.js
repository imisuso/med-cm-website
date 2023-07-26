import{H as k,r as S,P as $,o as d,b as l,d as e,t as g,a as x,s as y,q as h,u as o,D as v,e as f,v as b,g as c,n as w,a7 as V,S as C,U as D}from"./app.10fb5b53.js";import{t as q}from"./style.9e73e7d3.js";const m=a=>(C("data-v-3a6c959f"),a=a(),D(),a),F={class:"flex flex-col p-4 w-full"},I={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border rounded-md shadow-md items-baseline"},U={class:"text-2xl font-bold"},j=m(()=>e("div",{class:"text-gray-900 text-lg underline font-medium dark:text-white mb-4"}," \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 ",-1)),N={class:"flex flex-col"},z=m(()=>e("label",{for:"title",class:"text-gray-600"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 :",-1)),B={class:"mb-4"},E={key:0,class:"p-error"},O=m(()=>e("label",{for:"link",class:"text-gray-600"},"URL \u0E02\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 :",-1)),T={class:"mb-4"},H={key:0,class:"p-error"},L=m(()=>e("label",{for:"order_number",class:"text-gray-600"},"\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07 :",-1)),M={class:"mb-4"},P={key:0,class:"p-error"},R={class:"flex items-center mb-4"},W=m(()=>e("div",null,"\u0E1B\u0E34\u0E14",-1)),A=m(()=>e("div",null,"\u0E40\u0E1B\u0E34\u0E14",-1)),G={class:"flex flex-row mt-2 space-x-4"},J={key:2,type:"button",class:"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},K={layout:V},Q=Object.assign(K,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},item:{type:Object}},setup(a){const r=a,p=S(null);switch(r.action){case"insert":p.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"update":p.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":p.value="\u0E25\u0E1A";break}const s=$({id:r.item?r.item.id:null,title:r.item?r.item.title:null,link:r.item?r.item.link:null,order_number:r.item?r.item.order_number:null,status:r.item?r.item.status:!1}),u=(t,n,i)=>{q({title:n,description:i},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},_=()=>{s.id?s.post(route("admin.download.update",s.id),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{u("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{t.msg?u("danger",t.msg,t.sysmsg):u("danger","\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14","\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02")},onFinish:()=>{s.processing=!1}}):s.post(route("admin.download.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{u("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{t.msg?u("danger",t.msg,t.sysmsg):u("danger","\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14","\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")},onFinish:()=>{s.processing=!1}})};return(t,n)=>(d(),l("div",F,[e("div",I,[e("div",U,g(p.value)+"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14",1),x(o(v),{href:t.route("admin.download"),method:"get",as:"button",type:"button",class:"px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:y(()=>[h(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01 ")]),_:1},8,["href"])]),j,e("div",N,[z,e("div",B,[f(e("input",{type:"text",id:"title","onUpdate:modelValue":n[0]||(n[0]=i=>o(s).title=i),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).title]]),t.$page.props.errors.title?(d(),l("span",E,g(t.$page.props.errors.title),1)):c("",!0)]),O,e("div",T,[f(e("input",{type:"text",id:"link","onUpdate:modelValue":n[1]||(n[1]=i=>o(s).link=i),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).link]]),t.$page.props.errors.link?(d(),l("span",H,g(t.$page.props.errors.link),1)):c("",!0)]),L,e("div",M,[f(e("input",{type:"number",id:"order_number","onUpdate:modelValue":n[2]||(n[2]=i=>o(s).order_number=i),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).order_number]]),t.$page.props.errors.order_number?(d(),l("span",P,g(t.$page.props.errors.order_number),1)):c("",!0)]),e("div",R,[W,e("div",{class:"flex justify-between items-center mx-2 cursor-pointer",onClick:n[3]||(n[3]=i=>o(s).status=!o(s).status)},[e("div",{class:w(["w-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out",{"bg-green-400":o(s).status}])},[e("div",{class:w(["bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out",{"translate-x-4":o(s).status}])},null,2)],2)]),A])]),e("div",G,[a.action==="insert"?(d(),l("button",{key:0,type:"button",onClick:_,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")):c("",!0),a.action==="update"?(d(),l("button",{key:1,type:"button",onClick:_,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02")):c("",!0),a.action==="delete"?(d(),l("button",J,"\u0E25\u0E1A")):c("",!0),x(o(v),{href:t.route("admin.download"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:y(()=>[h(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 ")]),_:1},8,["href"])])]))}});var Z=k(Q,[["__scopeId","data-v-3a6c959f"]]);export{Z as default};
