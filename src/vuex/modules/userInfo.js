import * as types from '../mutation-types'
const state = {
    name: '',
    phone: '',
    addressList: []
}
const mutations = {
	[types.SET_USERNAME] (state, { result }) {
		state.name = result;
	},
	[types.SET_USERPHONE] (state, { result }) {
		state.phone = result;
	},
	[types.SET_USERPADDRESSLIST] (state, { result }) {
		state.addressList.push(result);
	}	
	
}
export default {
	state,
	mutations
}