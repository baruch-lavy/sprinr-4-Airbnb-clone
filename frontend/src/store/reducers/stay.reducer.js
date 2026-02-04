export const SET_STAYS = "SET_STAYS"
export const SET_STAY = "SET_STAY"
export const REMOVE_STAY = "REMOVE_STAY"
export const ADD_STAY = "ADD_STAY"
export const UPDATE_STAY =  "UPDATE_STAY"

import { SET_SEARCH_DATA } from "../actions/stay.actions";


const initialState = {
    stays: [],
    stay: null,
    destination: "Anywhere",
    startDate: null,
    endDate: null,
    guests: "Add guests"
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_DATA:
            return { ...state, ...action.payload }
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
        default:
    }
    return newState
}
