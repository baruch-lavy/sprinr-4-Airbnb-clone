export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_STICKY_HEADER = 'SET_STICKY_HEADER'

const initialState = {
    isLoading: false,
    isStickyHeader: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }
        case LOADING_DONE:
            return { ...state, isLoading: false }
        case SET_STICKY_HEADER:
            return { ...state, isStickyHeader: action.isSticky }
        default: return state
    }
}
