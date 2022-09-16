import{G as s}from"./app.de014cca.js";class n{storeLog(t,o,e,a){return s.post(route("log.store"),{data:{section:t,action:o,details:e,type:a}}).then(r=>r.data)}}export{n as T};
