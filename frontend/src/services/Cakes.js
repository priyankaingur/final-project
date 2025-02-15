import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/cakes'
const baseUrl = '/api/cakes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => {
       return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response =>  response.data)
}

const update = (id, newObject) => {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // return request.then(response => response.data)
}

const drop = (id) => {
    // const request = axios.delete(`${baseUrl}/${id}`)
    // return request.then(response => response.data)
}

export default { getAll, getById, create, update, drop }