import { ApiClient } from "./apiClient";

import  formData from "form-data";


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

export const deleteProjectApi = id =>{
    return client.delete(`/projects/${id}`)
}







export const getDatasetApi = data =>{
    return client.get(`/projects/${data.projectId}/docs?limit=${data.limit}&offset=${data.offset}`)
}
export const uploadDatasetApi =(data,projectId)=>{

    let uploadformData = new formData();
    uploadformData.append('file',data.file);
    uploadformData.append('format',data.format);    
    return client.post(`/projects/${projectId}/docs/upload`,uploadformData,{headers: {'Content-Type': 'multipart/form-data' }});
}

export const downloadDatasetApi =(docType,projectId)=>{
    return client.get(`/projects/${projectId}/docs/download?q=${docType}`,{headers: {'Content-Type': (docType == 'csv') ? 'text/csv; charset=UTF-8':'application/json' }});
}

export const deleteDatasetApi  = (projectId,datasetId)=>{
    return client.delete(`/projects/${projectId}/docs/${datasetId}`);
}




export const getLabelsApi = data =>{
    return client.get(`/projects/${data.projectId}/labels`)
}

export const createLabelApi = data =>{
    return client.post(`/projects/${data.projectId}/labels`,data)
}

export const patchLabelApi = (data) =>{
    return client.patch(`/projects/${data.projectId}/labels/${data.id}`,data)
}


export const uploadLabelApi =(data,projectId)=>{
    let uploadformData = new formData();
    uploadformData.append('file',data[0]);   
    return client.post(`/projects/${projectId}/label-upload`,uploadformData,{headers: {'Content-Type': 'multipart/form-data' }});
}

export const deleteLabelApi =(labelId,projectId)=>{
    return client.delete(`/projects/${projectId}/labels/${labelId}`)
}

export const downloadLabelApi = (projectId)=>{
    return client.get(`projects/${projectId}/labels`)
}