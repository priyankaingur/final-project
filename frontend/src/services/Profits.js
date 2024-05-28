import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/profits'
const baseUrl = '/api/profits'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data

    })
}

const getByYearAndMonth = (year,month,profileId) => {
    const request = axios.get(baseUrl, {params: {
            year: year,
            month: month,
            profileId:profileId
        }})

    return request.then(response => {
        return response.data

    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response =>{
        return(response.data)
    } )
}

const drop = (id) => {
    // const request = axios.delete(`${baseUrl}/${id}`)
    // return request.then(response => response.data)
}

export default { getAll,getByYearAndMonth, create, update, drop }