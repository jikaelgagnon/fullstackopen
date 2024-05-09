import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const update = (id, newEntry) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, newEntry)
    return request.then(response => response.data)
}

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

export default {getAll, create, deletePerson, update}