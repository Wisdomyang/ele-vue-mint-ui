import * as types from '../mutation-types';
import { storageUtils } from '../../common/utils/storageUtils';
const state = {
	status: 'fail',
	result: null,
	searchNearBy: []
}
const mutations = {
	[types.SET_POSITIONRESULT](state, { result }) {
		state.result = result;
		storageUtils.setSessionStorage('positionResult', result);
	},
	[types.SET_POSITIONSTATUS](state, { result }) {
		state.status = result;
		storageUtils.setSessionStorage('positionStatus', result);
	},
	[types.SET_POSITIONSEARCHNEARBY](state, { result }) {
		state.searchNearBy = result;
		storageUtils.setSessionStorage('positionSearchNearBy', result);
	}

}
export default {
	state,
	mutations
}