import axios from 'axios';

export default class AnnounceService {

    listAll() {
        return axios.get(route('admin.list_announce_all')).then(res => res.data);
    }

    listShow(record) {
        return axios.get(route('list_announce_show', record)).then(res => res.data);
    }

    // getAllDeleteRoom() {
    //     return axios.get('/mroom/showall_delete').then(res => res.data);
    // }

    // restoreRoom(id) {
    //     return axios.patch(`/mroom/${id}/restore`)
    //         .then(res => res);
    // }
}