import axios from 'axios'


const http = axios.create({
    baseURL: 'https://task-manager-two-mocha.vercel.app/',
    headers: {
        'Access-Control-Allow-Headers' : '*',
        'Access-Control-Allow-Origin' : '*'
    }
})

export default http