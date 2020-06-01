import { ApiClient } from "./apiClient";


const client = new ApiClient();


export const getProjectsListApi = ()=>{
    return client.get('/projects')
}


export const getProjectApi = (id)=>{
    return client.get(`/projects/${id}`)
}
export const createProjectApi = data =>{
    return client.post(`/projects`,data)
}

