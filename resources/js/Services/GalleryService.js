import axios from 'axios';

export default class GalleryService {

    listEnabledGallery() {
        return axios.get(route('list_enabled_gallery')).then(res => res.data);
    }

    // checkGalleryEmpty() {
    //     return axios.get(route('admin.check_gallery_empty')).then(res => res.data);
    // }
}