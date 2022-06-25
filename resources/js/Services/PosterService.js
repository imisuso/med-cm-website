import axios from 'axios';

export default class PosterService {

    listEnabledPoster() {
        return axios.get(route('list_enabled_poster')).then(res => res.data);
    }

    // listPersonByDivisionAndType(division_id, type) {
    //     // console.log(division_id)
    //     // console.log(type)
    //     return axios.get(route('admin.list_person_by_division_and_type'), { 
    //         params: {
    //             division_id: division_id,
    //             type: type
    //         }
    //     }).then(res => res.data);
    // }

}