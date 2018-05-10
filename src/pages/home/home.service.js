import { ajax } from '../../common/ajaxUtils/ajax';

export const homeService = {
    getCategoryList: () => {
        return ajax.get('swiperList');
    }
}