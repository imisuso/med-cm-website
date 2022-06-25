import axios from 'axios';

export default class PersonService {
  
    listProfessorByDivisionId(division_id) {
        return axios.get(route('list_professor_by_division_id', division_id)).then(res => res.data);
    }

    listDoctorByDivisionId(division_id) {
        return axios.get(route('list_doctor_by_division_id', division_id)).then(res => res.data);
    }

    listOfficerByDivisionId(division_id) {
        return axios.get(route('list_officer_by_division_id', division_id)).then(res => res.data);
    }

    listPersonDisplayByDivisionId(division_id) {
        return axios.get(route('admin.list_person_display_by_division_id', division_id)).then(res => res.data);
    }

    listPersonByDivisionAndType(division_id, type) {
        // console.log(division_id)
        // console.log(type)
        return axios.get(route('admin.list_person_by_division_and_type'), { 
            params: {
                division_id: division_id,
                type: type
            }
        }).then(res => res.data);
    }
    // restoreRoom(id) {
    //     return axios.patch(`/mroom/${id}/restore`)
    //         .then(res => res);
    // }
}