import * as types from '../mutation-types';
import { storageUtils } from '../../common/utils/storageUtils';
const state = {
    name: '',
    phone: '',
    addressList: []
}
const mutations = {
	[types.SET_USERNAME] (state, { result }) {
		state.name = result;
		storageUtils.setSessionStorage('userName',result);
	},
	[types.SET_USERPHONE] (state, { result }) {
		state.phone = result;
		storageUtils.setSessionStorage('userPhone',result);
	},
	[types.SET_USERPADDRESSLIST] (state, { result }) {
		let userAddressList = storageUtils.getSessionStorage('userAddressList');
		userAddressList ? state.addressList = userAddressList: state.addressList = [];
		console.log(userAddressList)
		if(state.addressList.length > 0){
			for(let i = 0 , len = state.addressList.length; i < len ; i++){
				if(state.addressList[i].id == result.id){
					state.addressList[i] = result;
					break;
				}
				if(i == len -1){
					state.addressList.push(result);
				}
			}
		}else{
			state.addressList.push(result);
		}
		
		storageUtils.setSessionStorage('userAddressList',state.addressList);
	}	
	
}
export default {
	state,
	mutations
}