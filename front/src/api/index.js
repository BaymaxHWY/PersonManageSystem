import axios from "axios"

class Api{
    async get(path, params){
        path = path || ''
        params = params || {}
        let res = await axios.get(path,{
            params: params
        })
        return res
    }
    async post(path, data) {
        path = path || ''
        data = data || {}
        let res = await axios.post(path, data)
        return res
    }
}

export default new Api()