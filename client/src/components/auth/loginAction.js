// import axios from '../../configs/apiconfig'
import  authApi  from "../../api/authApi";

export const GET_TOKEN = 'GET_TOKEN'


export const getLoginToken = (data,callback)=>{
    return async dispatch =>{
        try{
            // const result = await axios.post('/auth-token', data)
            console.log("Token from API call..", authApi)

            const result = await authApi.getAuthToken(data);
            console.log("Token from API call..", result)
     
            if(result.status == 200){ 
                dispatch({
                    type: 'GET_TOKEN',
                    payload: {token:result.data.token,username:data.username}
                })
            
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('username', data.username)
                callback()
            }else if(result.status == 400){
                dispatch({
                    type: 'GET_TOKEN',
                    payload: {error: result.data.non_field_errors[0]}
                })
            }
        }
        catch(error) {
            console.log("error")
            dispatch({
                type: 'GET_TOKEN',
                payload: {error:"Something went wrong"}
            })
        }

    }
}