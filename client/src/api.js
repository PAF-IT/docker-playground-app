import axios from 'axios'


export const api = axios.create()

export async function getData() {
    try {
        const result = await api.get('/demo')
        return result.data
    } catch (error) {
        console.error('getData', error)
    }
}