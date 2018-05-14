import { storageUtils } from '../common/utils/storageUtils'
import { cookieUtils } from '../common/utils/cookieUtils'
// position
export const positionResult = state => {
    if(!state.position.result){
        return storageUtils.getSessionStorage('positionResult');
    }
    return state.position.result;
}
export const positionStatus = state => {
    if(!state.position.status){
        return storageUtils.getSessionStorage('positionStatus');
    }
    return state.position.status;
}
export const positionSearchNearBy = state => {
    if(state.position.searchNearBy.length == 0){
        return storageUtils.getSessionStorage('positionSearchNearBy');
    }
    return state.position.searchNearBy;
}

// userInfo

export const userName = state => {
    if(!state.userInfo.name){
        return cookieUtils.getCookie('userName');
    }
    return state.userInfo.name;
}
export const userPhone = state => {
    if(!state.userInfo.phone){
        return cookieUtils.getCookie('userPhone');
    }
    return state.userInfo.phone;
}
export const userAddressList = state => {
    if(state.userInfo.addressList.length == 0){
        return cookieUtils.getCookie('userAddressList')? cookieUtils.getCookie('userAddressList'): [];
    }
    return state.userInfo.addressList
}

export const userSelectAddress = state => {
    if(!state.userInfo.selectAddress){
        return storageUtils.getSessionStorage('userSelectAddress');
    }
    return state.userInfo.selectAddress
}