import { storageUtils } from '../common/utils/storageUtils'
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
        return storageUtils.getSessionStorage('userName');
    }
    return state.userInfo.name;
}
export const userPhone = state => {
    if(!state.userInfo.phone){
        return  storageUtils.getSessionStorage('userPhone');
    }
    return state.userInfo.phone;
}
export const userAddressList = state => {
    if(state.userInfo.addressList.length == 0){
        return storageUtils.getSessionStorage('userAddressList')? storageUtils.getSessionStorage('userAddressList'): [];
    }
    return state.userInfo.addressList
}