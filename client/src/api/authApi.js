import { ApiClient } from "./apiClient";


const client = new ApiClient();


export default  {
    getAuthToken(data){
        console.log(data)
        return client.post('/auth-token',data)
    }

}