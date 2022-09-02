import{C as k,r as S,G as $,o as d,d as l,e,t as g,j as h,k as x,u as o,L as y,w as f,I as b,g as c,n as v,m as w,N as C,O as V,a4 as F}from"./app.5ef6262d.js";import{t as I}from"./style.41f80f12.js";const m=i=>(C("data-v-1ac41bd0"),i=i(),V(),i),j={class:"flex flex-col p-4 w-full"},D={class:"flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border rounded-md shadow-md items-baseline"},N={class:"text-2xl font-bold"},q=w(" \u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01 "),U=m(()=>e("div",{class:"text-gray-900 text-lg underline font-medium dark:text-white mb-4"}," \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 ",-1)),z={class:"flex flex-col"},B=m(()=>e("label",{for:"title",class:"text-gray-600"},"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 :",-1)),E={class:"mb-4"},L={key:0,class:"p-error"},O=m(()=>e("label",{for:"link",class:"text-gray-600"},"URL \u0E02\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 :",-1)),T={class:"mb-4"},G={key:0,class:"p-error"},M=m(()=>e("label",{for:"order_number",class:"text-gray-600"},"\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07 :",-1)),R={class:"mb-4"},W={key:0,class:"p-error"},A={class:"flex items-center mb-4"},H=m(()=>e("div",null,"\u0E1B\u0E34\u0E14",-1)),J=m(()=>e("div",null,"\u0E40\u0E1B\u0E34\u0E14",-1)),K={class:"flex flex-row mt-2 space-x-4"},P={key:2,type:"button",class:"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},Q=w(" \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01 "),X={layout:F},Y=Object.assign(X,{__name:"DataForm",props:{action:{type:String,require:!0,default:"insert"},item:{type:Object}},setup(i){const r=i,p=S(null);switch(r.action){case"insert":p.value="\u0E40\u0E1E\u0E34\u0E48\u0E21";break;case"update":p.value="\u0E41\u0E01\u0E49\u0E44\u0E02";break;case"delete":p.value="\u0E25\u0E1A";break}const s=$({id:r.item?r.item.id:null,title:r.item?r.item.title:null,link:r.item?r.item.link:null,order_number:r.item?r.item.order_number:null,status:r.item?r.item.status:!1}),u=(t,n,a)=>{I({title:n,description:a},{showIcon:!0,transition:"zoom",position:"top-right",type:t,timeout:3e3})},_=()=>{s.id?s.post(route("admin.download.update",s.id),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{u("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{t.msg?u("danger",t.msg,t.sysmsg):u("danger","\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14","\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02")},onFinish:()=>{s.processing=!1}}):s.post(route("admin.download.store"),{preserveState:!0,preserveScroll:!0,onSuccess:()=>{u("success","\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08","\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22")},onError:t=>{t.msg?u("danger",t.msg,t.sysmsg):u("danger","\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14","\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")},onFinish:()=>{s.processing=!1}})};return(t,n)=>(d(),l("div",j,[e("div",D,[e("div",N,g(p.value)+"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14",1),h(o(y),{href:t.route("admin.download"),method:"get",as:"button",type:"button",class:"px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"},{default:x(()=>[q]),_:1},8,["href"])]),U,e("div",z,[B,e("div",E,[f(e("input",{type:"text",id:"title","onUpdate:modelValue":n[0]||(n[0]=a=>o(s).title=a),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).title]]),t.$page.props.errors.title?(d(),l("span",L,g(t.$page.props.errors.title),1)):c("",!0)]),O,e("div",T,[f(e("input",{type:"text",id:"link","onUpdate:modelValue":n[1]||(n[1]=a=>o(s).link=a),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).link]]),t.$page.props.errors.link?(d(),l("span",G,g(t.$page.props.errors.link),1)):c("",!0)]),M,e("div",R,[f(e("input",{type:"number",id:"order_number","onUpdate:modelValue":n[2]||(n[2]=a=>o(s).order_number=a),required:"true",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,512),[[b,o(s).order_number]]),t.$page.props.errors.order_number?(d(),l("span",W,g(t.$page.props.errors.order_number),1)):c("",!0)]),e("div",A,[H,e("div",{class:"flex justify-between items-center mx-2 cursor-pointer",onClick:n[3]||(n[3]=a=>o(s).status=!o(s).status)},[e("div",{class:v(["w-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out",{"bg-green-400":o(s).status}])},[e("div",{class:v(["bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out",{"translate-x-4":o(s).status}])},null,2)],2)]),J])]),e("div",K,[i.action==="insert"?(d(),l("button",{key:0,type:"button",onClick:_,class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A")):c("",!0),i.action==="update"?(d(),l("button",{key:1,type:"button",onClick:_,class:"text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"\u0E41\u0E01\u0E49\u0E44\u0E02")):c("",!0),i.action==="delete"?(d(),l("button",P,"\u0E25\u0E1A")):c("",!0),h(o(y),{href:t.route("admin.download"),method:"get",as:"button",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"},{default:x(()=>[Q]),_:1},8,["href"])])]))}});var te=k(Y,[["__scopeId","data-v-1ac41bd0"]]);export{te as default};
