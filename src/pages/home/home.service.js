import { ajax } from '../../common/ajax';

export const homeService = {
    getCategoryList: () => {
        return ajax.get('swiperList');
    }
}