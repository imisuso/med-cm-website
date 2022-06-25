import axios from 'axios';

export class BranchMainMenuService {

    listBranchMainMenuByDivision(division_id) {
        return axios.post(route('admin.list_branch_main_menu_by_division', division_id)).then(res => res.data);
    }

}

export class BranchSubMenuService {

    listBranchSubMenuByDivision(division_id) {
        return axios.post(route('admin.list_branch_sub_menu_by_division', division_id)).then(res => res.data);
    }

}

