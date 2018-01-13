import { SYNC_TASK, SYNC_PEND } from './action'

export const initState = {
    messages: [],
    isPending: false
}

export const syncReducer = (state=initState, action) => {
    switch(action.type){
        case SYNC_TASK:
            return {
                messages: [...state.messages, action.payload],
                isPending: false
            }
        case SYNC_PEND:
            return {
                ...state,
                isPending: true
            }
        default:
            return state
    }
}
