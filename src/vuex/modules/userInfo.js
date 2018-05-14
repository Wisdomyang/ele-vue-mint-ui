import * as types from '../mutation-types';
import { storageUtils } from '../../common/utils/storageUtils';
import { cookieUtils } from '../../common/utils/cookieUtils';
import { config } from '../../config/config';
const state = {
    name: '',
    phone: '',
	addressList: [],
	selectAddress: null
}
const mutations = {
	[types.SET_USERNAME] (state, { result }) {
		state.name = result;
		let oneDay = 24 * 3600;
		cookieUtils.setCookie('userName',result,oneDay,config.domain);
	},
	[types.SET_USERPHONE] (state, { result }) {
		state.phone = result;
		let oneDay = 24 * 3600;
		cookieUtils.setCookie('userPhone',result,oneDay,config.domain);
	},
	[types.SET_USERADDRESSLIST] (state, { result }) {
		let userAddressList = cookieUtils.getCookie('userAddressList');
		userAddressList ? state.addressList = userAddressList: state.addressList = [];
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
		let oneDay = 24 * 3600;
		cookieUtils.setCookie('userAddressList',state.addressList,oneDay,config.domain);
	},
	[types.DELETE_USERADDRESSLIST] (state, { result }) {
		for(let item of state.addressList){
			if(item.id == result){
				let index = state.addressList.indexOf(item);
				state.addressList.splice(index,1);
			}
		}
		let oneDay = 24 * 3600;
		cookieUtils.setCookie('userAddressList',state.addressList,oneDay,config.domain);
	},
	[types.SET_USERSELECTADDRESS] (state, { result }) {
		state.selectAddress = result;
		storageUtils.setSessionStorage('userSelectAddress',result);
	}
	
}
export default {
	state,
	mutations
}