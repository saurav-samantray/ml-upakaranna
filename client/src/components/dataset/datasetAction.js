import { getDatasetApi,uploadDatasetApi ,downloadDatasetApi,deleteDatasetApi } from "../../api/projectsApi";

import { showNotification } from "../utils/notificationbox/notificationAction";

import FileSaver, { saveAs } from "file-saver";

export const GET_DATASETS = 'GET_DATASETS'
export const actionTypes={
    FETCH_DATASET_ACTION:'FETCH_DATASET_ACTION',
    FETCH_DATASET_SUCCESS:'FETCH_DATASET_SUCCESS',
    FETCH_DATASET_FAILED:'FETCH_DATASET_FAILED',

    UPLOAD_DATASET_ACTION:'UPLOAD_DATASET_ACTION',
    UPLOAD_DATASET_SUCCESS:'UPLOAD_DATASET_SUCCESS',
    UPLOAD_DATASET_FAILED:'UPLOAD_DATASET_FAILED',

    DOWNLOAD_DATASET_ACTION:'DOWNLOAD_DATASET_ACTION',
    DOWNLOAD_DATASET_SUCCESS:'DOWNLOAD_DATASET_SUCCESS',
    DOWNLOAD_DATASET_FAILED:'DOWNLOAD_DATASET_FAILED',

    DELETE_DATASET_ACTION:'DELETE_DATASET_ACTION',
    DELETE_DATASET_SUCCESS:'DELETE_DATASET_SUCCESS',
    DELETE_DATASET_FAILED:'DELETE_DATASET_FAILED'
}

export const getDatasetsAction = ()=>({
    type:actionTypes.FETCH_DATASET_ACTION
})

export const getDatasetSuccess =(data)=>({
    type:actionTypes.FETCH_DATASET_SUCCESS,
    data
})

export const getDataFailed =(error)=>({
    type:actionTypes.FETCH_DATASET_FAILED,
    error
})

export const uploadDatasetAction = ()=>({
    type:actionTypes.UPLOAD_DATASET_ACTION
})

// export const uploadDatasetSuccess = (data)=>({
//     type:actionTypes.UPLOAD_DATASET_SUCCESS,
//     data
// })
export const uploadDatasetFailed =(error)=>({
    type:actionTypes.UPLOAD_DATASET_FAILED,
    error
})

export const downloadDatasetAction = () =>({
    type:actionTypes.DOWNLOAD_DATASET_ACTION
})

// export const downloadDatasetSuccess = (data)=>({
//     type:actionTypes.DOWNLOAD_DATASET_SUCCESS,
//     data
// })

export const downloadDatasetFailed = (error)=>({
    type:actionTypes.DOWNLOAD_DATASET_FAILED,
    error
})


export const deleteDatasetAction = ()=>({
    type:actionTypes.DELETE_DATASET_ACTION
})

export const deleteDatasetSuccess=()=>({
    type:actionTypes.DELETE_DATASET_SUCCESS
})
export const deleteDatasetFailed=(error)=>({
    type:actionTypes.DELETE_DATASET_FAILED,
    error
})



export const getDatasets = (data)=>{
   
    return async dispatch =>{
       
        try{
            dispatch(getDatasetsAction());
            const result = await getDatasetApi(data)
            console.log("Dataset APi call..", result)
            if(result.status == 200){
                dispatch(getDatasetSuccess(result.data))
            }
            else{
                let notificationData ={
                    message:`something went wrong`,
                    severity:"error"
                }
                dispatch(showNotification(notificationData)) 
            }
        }
        catch(error) {
            console.log("error")
            dispatch(getDataFailed(error))

        }

    }
}


export const uploadDataset =(data,projectId,payload)=>{
    return async dispatch =>{
        try {
        dispatch(uploadDatasetAction());
            console.log(data);

            

        const result = await uploadDatasetApi(data,projectId);
        if(result.status == 201){
            let notificationData ={
                message:`${data.file.name} successfully uploaded`,
                severity:"success"
            }
            dispatch(getDatasets(payload))
            dispatch(showNotification(notificationData))
        } else{
            let notificationData ={
                message:`something went wrong`,
                severity:"error"
            }
            dispatch(showNotification(notificationData)) 
        }
    
   
            
        } catch (error) {
            console.log("error")
            dispatch(getDataFailed(error))
        }
    }
}

export const downloadDataset= (docType,projectId)=>{
    return async dispatch => {
        try {
            dispatch( downloadDatasetAction());
            const result = await downloadDatasetApi(docType,projectId);
            if(result.status == 200){
              console.log(result);
                let responseFile = new Blob([result.data], {type: 'text/csv'} );
                FileSaver.saveAs(responseFile,'dataset.csv')


                let notificationData ={
                    message :`${docType} downloaded successfully`,
                    severity:'success'
                }
                dispatch(showNotification(notificationData))
            } else{
                let notificationData={
                    message:'something went worng',
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
            }
        } catch (error) {
            console.log('error');
            dispatch(getDataFailed(error))
            let notificationData ={
                message:`something went wrong`,
                severity:"error"
            }
            dispatch(showNotification(notificationData)) 
        }
    }
}

export const deleteDataset =(projectId,datasetId,payload)=>{
    return async dispatch =>{
        try {
            dispatch(deleteDatasetAction());
            const result = await deleteDatasetApi(projectId,datasetId);
            if(result.status == 204){
                let notificationData ={
                    message :`deleted successfully`,
                    severity:'success'
                }
                dispatch(getDatasets(payload))
                dispatch(showNotification(notificationData))
            } else{
                let notificationData={
                    message:'something went worng',
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
            }
        } catch (error) {
            console.log(error);
            let notificationData={
                message:'something went worng',
                severity:'error'
            }
            dispatch(showNotification(notificationData))
            
        }
    }
}