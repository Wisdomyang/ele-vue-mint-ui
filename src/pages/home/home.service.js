import { ajax } from '../../common/utils/ajax';
import { config } from '../../config/config';
export const homeService = {
    getFoodTypeList(){
        let url = `${config.service.commonService}/v2/index_entry`;
        return ajax.get(url);
    },


    getCategoryList(){
        return ajax.get('swiperList');
    }
}