export const SET_STAYS = "SET_STAYS"
export const SET_STAY = "SET_STAY"
export const REMOVE_STAY = "REMOVE_STAY"
export const ADD_STAY = "ADD_STAY"
export const UPDATE_STAY =  "UPDATE_STAY"
export const SET_SEARCH_DATA = "SET_SEARCH_DATA"
export const SET_PAGE_INDEX = "SET_PAGE_INDEX"

const initialState = {
    stays: [],
    stay: null,
    destination: null,
    startDate: null,
    endDate: null,
    totalGuests: 0,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets :0
    },
    pageIndex: 0,
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_DATA:
            const newState = { ...state, ...action.payload };
            const guestsUpdatedState = { ...newState, guests: { ...state.guests, ...action.payload.guests }};
            console.log('guestsUpdatedState',guestsUpdatedState);
            return guestsUpdatedState;
        default:
            return state
    }
}

export function stayReducer(state = initialState, action) {
    let newState = state
    let stays
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case SET_STAY:
            newState = { ...state, stay: action.stay }
            break   
        case REMOVE_STAY:
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays: stays }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break   
        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            newState = { ...state, stays: stays }     
            break
        case SET_PAGE_INDEX:
            newState = { ...state, pageIndex: action.pageIndex }
            break
        default:
            return state
    }
    return newState
}
