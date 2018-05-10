import * as types from './mutation-types'

export const setPositionResult = ({ commit },result) => {
    commit(types.SET_POSITIONRESULT,{result})
}

export const setPositionStatus = ({ commit },result) => {
    commit(types.SET_POSITIONSTATUS,{result})
}