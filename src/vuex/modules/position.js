import * as types from '../mutation-types'
const state = {
    status: 'fail',
	result: null,
	again: false,
	placeSearch: false,
	searchNearBy: []
}
const mutations = {
	[types.SET_POSITIONRESULT] (state, { result }) {
		state.result = result;
	},
	[types.SET_POSITIONSTATUS] (state, { result }) {
		state.status = result;
	},
	[types.SET_POSITIONAGAIN] (state, { result }) {
		state.again = result;
	},
	[types.SET_POSITIONPLACESEARCH] (state, { result }) {
		state.placeSearch = result;
	},
	[types.SET_POSITIONSEARCHNEARBY] (state, { result }) {
		state.searchNearBy = result;
	}		
	
}
export default {
	state,
	mutations
}