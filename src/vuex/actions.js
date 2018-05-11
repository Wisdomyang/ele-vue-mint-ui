import * as types from './mutation-types'

// position
export const setPositionResult = ({ commit },result) => {
    commit(types.SET_POSITIONRESULT,{result})
}

export const setPositionStatus = ({ commit },result) => {
    commit(types.SET_POSITIONSTATUS,{result})
}

export const setPositionAgain = ({ commit },result) => {
    commit(types.SET_POSITIONAGAIN,{result})
}

export const setPositionPlaceSearch = ({ commit },result) => {
    commit(types.SET_POSITIONPLACESEARCH,{result})
}

export const setPositionSearchNearBy = ({ commit },result) => {
    commit(types.SET_POSITIONSEARCHNEARBY,{result})
}

// userInfo
export const setUserName = ({ commit },result) => {
    commit(types.SET_USERNAME,{result})
}

export const setUserPhone = ({ commit },result) => {
    commit(types.SET_USERPHONE,{result})
}

export const setUserAddressList = ({ commit },result) => {
    commit(types.SET_USERPADDRESSLIST,{result})
}