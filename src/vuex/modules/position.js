import * as types from '../mutation-types'
const state = {
    status: '定位中...',
    result: null
}
const mutations = {
	[types.SET_POSITIONRESULT] (state, { result }) {
		state.result = result;
    },
    [types.SET_POSITIONSTATUS] (state, { status }) {
		state.status = status;
	}	
	
}
export default {
	state,
	mutations
}