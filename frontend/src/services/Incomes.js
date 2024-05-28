import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/incomes'
const baseUrl = '/api/incomes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const getByYearAndMonth = (year,month) => {
    const request = axios.get(baseUrl, {params: {
            year: year,
            month: month
        }})

    return request.then(response => {
        return response.data

    })
}


const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const drop = (id) => {
    // const request = axios.delete(`${baseUrl}/${id}`)
    // return request.then(response => response.data)
}

export default { getAll, getByYearAndMonth,getById, create, update, drop }