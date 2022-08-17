import{r as c,D as _,o as i,c as w,k as g,e as s,w as d,G as x,u as r,X as v,d as u,z as f}from"./app.4c080209.js";import{t as k}from"./style.9a5bf0a6.js";var y="/build/assets/login_logo.488b7533.jpg";const b={class:"relative flex flex-wrap lg:h-96 lg:items-center"},M={class:"w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24 lg:mb-0"},j=s("div",{class:"max-w-lg mx-auto text-center"},[s("h1",{class:"text-2xl font-bold sm:text-3xl"},"We're Medicine Team!")],-1),C={class:"max-w-md mx-auto mt-8 mb-0 space-y-4"},B=s("label",{for:"username",class:"sr-only"},"Username",-1),z={class:"relative"},L=s("span",{class:"absolute inset-y-0 inline-flex items-center right-4"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})])],-1),A=s("label",{for:"password",class:"sr-only"},"Password",-1),D={class:"relative"},F=["type"],P={key:0,xmlns:"http://www.w3.org/2000/svg",class:"w-5 h-5 text-gray-400 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},U=s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"},null,-1),V=s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"},null,-1),E=[U,V],S={key:1,xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-gray-400 cursor-pointer",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},T=s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"},null,-1),G=[T],I={class:"flex items-center justify-between"},N={class:"text-sm border p-2 rounded-md text-green-600"},R=["href"],W=s("div",{class:"relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full"},[s("img",{class:"absolute inset-0 lg:-inset-y-4 object-cover lg:object-contain w-full h-full",src:y,alt:""})],-1),q={__name:"LoginForm",props:{sso_url:{type:String}},setup(p){const o=c(!1);c(base_url);const t=_({username:"",password:""}),m=(l,e,a)=>{k({title:e,description:a},{showIcon:!0,transition:"zoom",position:"top-right",type:l,timeout:3e3})},h=()=>{t.post(route("login_authen"),{onSuccess:()=>{t.reset()},onError:l=>{m("danger","\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",l.msg)},onFinish:()=>{t.processing=!1}})};return(l,e)=>{const a=f("AppLayout");return i(),w(a,null,{default:g(()=>[s("section",b,[s("div",M,[j,s("div",C,[s("div",null,[B,s("div",z,[d(s("input",{"onUpdate:modelValue":e[0]||(e[0]=n=>r(t).username=n),class:"w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm",placeholder:"\u0E23\u0E30\u0E1A\u0E38 username",type:"text"},null,512),[[x,r(t).username]]),L])]),s("div",null,[A,s("div",D,[d(s("input",{"onUpdate:modelValue":e[1]||(e[1]=n=>r(t).password=n),type:[o.value?"text":"password"],class:"w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm",placeholder:"\u0E23\u0E30\u0E1A\u0E38 password"},null,8,F),[[v,r(t).password]]),s("span",{class:"absolute inset-y-0 inline-flex items-center right-4",onClick:e[2]||(e[2]=n=>o.value=!o.value)},[o.value?(i(),u("svg",P,E)):(i(),u("svg",S,G))])])]),s("div",I,[s("button",{onClick:h,class:"inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"}," \u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A "),s("p",N,[s("a",{href:p.sso_url,target:"_blank"}," Reset Password",8,R)])])])]),W])]),_:1})}}};export{q as default};
