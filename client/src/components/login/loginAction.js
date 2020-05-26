import axios from '../../configs/apiconfig'

export const GET_TOKEN = 'GET_TOKEN'


export const getLoginToken = (data,callback)=>{
    return async dispatch =>{
        try{
            const result = await axios.post('/auth-token', data)
            console.log("Token from API call..", result)
            dispatch({
                type: 'GET_TOKEN',
                payload: {token:result.data.token,username:data.username}
            })
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('username', data.username)
            callback()
        }
        catch(error) {
            console.log("error")
            dispatch({
                type: 'GET_TOKEN',
                payload: {error:'Username/Password incorrect'}
            })
        }

    }
}