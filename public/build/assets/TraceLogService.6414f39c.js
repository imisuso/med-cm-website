import{G as s}from"./app.ed7955bf.js";class n{storeLog(t,o,e,a){return s.post(route("log.store"),{data:{section:t,action:o,details:e,type:a}}).then(r=>r.data)}}export{n as T};
