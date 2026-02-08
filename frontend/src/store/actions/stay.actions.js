import { stayService, getDefaultFilter } from "../../services/stay"
import { store } from "../store"
import { SET_STAYS, ADD_STAY, UPDATE_STAY, REMOVE_STAY, SET_PAGE_INDEX } from "../reducers/stay.reducer"

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA'

export async function setSearchData(data) {
    try {
        store.dispatch({ type: SET_SEARCH_DATA, payload: data })
    } catch (err) {
        console.log('StayActions: err in setSearchData', err)
        throw err
    }
}

export async function loadStays(filterBy = getDefaultFilter()) {
    try {
        const stays = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('StayActions: err in loadStays', err)
        throw err
    }       
}

export async function loadStay(stayId) {
    try {
        const stay = await stayService.getById(stayId)
        store.dispatch({type: ADD_STAY, stay })
    } catch (err) {
        console.log('StayActions: err in loadStay', err)
        throw err
    }   
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch({ type: REMOVE_STAY, stayId })
    } catch (err) {
        console.log('StayActions: err in removeStay', err)
        throw err
    }
}


export async function addStay(stay) {
    try {
        const addedStay = await stayService.save(stay)
        store.dispatch({ type: ADD_STAY, stay: addedStay })
        return addedStay
    } catch (err) {
        console.log('StayActions: err in addStay', err)
        throw err
    }   
}
export async function updateStay(stay) {
    try {
        const updatedStay = await stayService.save(stay)
        store.dispatch({ type: UPDATE_STAY, stay: updatedStay })
        return updatedStay
    } catch (err) {
        console.log('StayActions: err in updateStay', err)
        throw err
    }
}

export async function setPageIndex(pageIndex) {
    try {
        store.dispatch({ type: SET_PAGE_INDEX, pageIndex })
    } catch (err) {
        console.log('StayActions: err in setPageIndex', err)
        throw err
    }
}