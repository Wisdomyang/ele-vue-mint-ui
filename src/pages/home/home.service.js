import { ajax } from '../../common/utils/ajax';
import { config } from '../../config/config';
export const homeService = {
    getFoodTypeList(){
        let url = `${config.service.commonService}/v2/index_entry`;
        return ajax.get(url);
    },


    getCategoryList(data){
        return ajax.post('http://192.168.0.101:8080/post', data);
    }
}