import axios from 'axios';

export default class DivisionService {

    listAll() {
        return axios.get(route('admin.list_division_all')).then(res => res.data);
    }

    listBranchOnly() {
        return axios.get(route('admin.list_branch_only')).then(res => res.data);
    }

    // getAllDeleteRoom() {
    //     return axios.get('/mroom/showall_delete').then(res => res.data);
    // }

    // restoreRoom(id) {
    //     return axios.patch(`/mroom/${id}/restore`)
    //         .then(res => res);
    // }
}