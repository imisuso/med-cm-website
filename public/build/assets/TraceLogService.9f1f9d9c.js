import{G as s}from"./app.5641f439.js";class n{storeLog(t,o,e,a){return s.post(route("log.store"),{data:{section:t,action:o,details:e,type:a}}).then(r=>r.data)}}export{n as T};
