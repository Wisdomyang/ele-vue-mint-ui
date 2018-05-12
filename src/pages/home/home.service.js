import { ajax } from '../../common/utils/ajax';

export const homeService = {
    getCategoryList: () => {
        return ajax.get('swiperList');
    }
}