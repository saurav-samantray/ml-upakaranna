import axios from '../../configs/apiconfig'

export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_PROJECT = 'GET_PROJECT'


export const getProjects = ()=>{
    return async dispatch =>{
        try{
            const result = await axios.get('/projects')
            console.log("Projects from API call..", result)
            dispatch({
                type: GET_PROJECTS,
                payload: result.data
            })
        }
        catch(error) {
            console.log("error")

        }

    }
}

export const getProject = (id)=>{
    return async dispatch =>{
        try{
            const result = await axios.get(`/projects/${id}`)
            console.log("Project Detail  from API call..", result)
            dispatch({
                type: GET_PROJECT,
                payload: result.data
            })
        }
        catch(error) {
            console.log("error")

        }

    }
}