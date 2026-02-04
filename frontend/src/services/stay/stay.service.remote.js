import { httpService } from "../http.service";

export const stayService = {
    query,
    getById,
    save,
    remove
};

function query(filterBy = {}) {
    return httpService.get('stay', filterBy )
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}  

function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}   

 async function save(stay) {
    const savedStay = null
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }   
    return savedStay
}

