import{R as i}from"./app-D_J6jNxv.js";class r{listAll(){return i.get(route("admin.list_division_all")).then(t=>t.data)}listBranchOnly(){return i.get(route("admin.list_branch_only")).then(t=>t.data)}}export{r as D};