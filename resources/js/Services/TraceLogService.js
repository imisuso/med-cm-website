import axios from 'axios';

export default class TraceLogService {
  
    // listProfessorByDivisionId(division_id) {
    //     return axios.get(route('list_professor_by_division_id', division_id)).then(res => res.data);
    // }

    storeLog(section, action, details, type ) {
        //console.log("get into storeLog function")
        // console.log(type)
        return axios.post(route('log.store'), { 
            data: {
                //'user': slug,
                'section': section,
                'action': action,
                'details': details,
                'type': type
            }
        }).then(res => res.data);

        //return axios.post(route('admin.list_branch_sub_menu_by_division', division_id)).then(res => res.data);
    }
    
}