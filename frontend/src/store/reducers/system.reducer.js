export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_STICKY_HEADER = 'SET_STICKY_HEADER'
export const SET_DETAILS_PAGE = 'SET_DETAILS_PAGE'

const initialState = {
    isLoading: false,
    isStickyHeader: false,
    isDetailsPage: false
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }
        case LOADING_DONE:
            return { ...state, isLoading: false }
        case SET_STICKY_HEADER:
            return { ...state, isStickyHeader: action.isSticky }
        case SET_DETAILS_PAGE:
            return { ...state, isDetailsPage: action.isDetailsPage }
        default: return state
    }
}
