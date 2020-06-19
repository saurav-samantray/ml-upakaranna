import { getLabelsApi ,patchLabelApi, createLabelApi ,uploadLabelApi ,deleteLabelApi,downloadLabelApi} from "../../api/projectsApi";
import { showNotification } from "../utils/notificationbox/notificationAction";
import FileSaver, { saveAs } from "file-saver";
export const actionTypes ={
    FETCH_LABELS_ACTION :'GET_LABELS_ACTION',
    FETCH_LABELS_SUCCESS :'FETCH_LABELS_SUCCESS',
    FETCH_LABELS_FAILED :'FETCH_LABELS_FAILED',

    CREATE_LABELS_ACTION : 'CREATE_LABELS_ACTION',
    CREATE_LABELS_SUCCESS : 'CREATE_LABELS_SUCCESS',
    CREATE_LABELS_FAILED : 'CREATE_LABELS_FAILED',

    PATCH_LABEL_ACTION :'PATCH_LABEL_ACTION',
    PATCH_LABEL_SUCCESS:'PATCH_LABEL_SUCCESS',
    PATCH_LABEL_FAILED:'PATCH_LABEL_FAILED',

    UPLOAD_LABEL_ACTION :'UPLOAD_LABEL_ACTION',
    UPLOAD_LABEL_SUCCESS:'UPLOAD_LABEL_SUCCESS',
    UPLOAD_LABEL_FAILED:'UPLOAD_LABEL_FAILED',

    DOWNLOAD_LABEL_ACTION :'DOWNLOAD_LABEL_ACTION',
    DOWNLOAD_LABEL_SUCCESS:'DOWNLOAD_LABEL_SUCCESS',
    DOWNLOAD_LABEL_FAILED:'DOWNLOAD_LABEL_FAILED',

    DELETE_LABEL_ACTION :'DELETE_LABEL_ACTION',
    DELETE_LABEL_SUCCESS:'DELETE_LABEL_SUCCESS',
    DELETE_LABEL_FAILED:'DELETE_LABEL_FAILED',
}

export const fetchLabelsAction = ()=>({
    type:actionTypes.FETCH_LABELS_ACTION
})

export const fetchLabelsSuccess = (data)=>({
    type:actionTypes.FETCH_LABELS_SUCCESS,
    data
})

export const fetchLabelsFailed = (error)=>({
    type:actionTypes.FETCH_LABELS_FAILED,
    error
})

export const createLabelAction = ()=>({
    type:actionTypes.CREATE_LABELS_ACTION
})

export const createLabelSuccess = (data)=>({
    type:actionTypes.CREATE_LABELS_SUCCESS,
    data
})

export const createLabelFailed = (error) =>({
    type:actionTypes.CREATE_LABELS_FAILED,
    error
})

export const patchLabelAction = () =>({
    type:actionTypes.PATCH_LABEL_ACTION
})

export const patchLabelSuccess = (data)=>({
    type:actionTypes.PATCH_LABEL_SUCCESS,
    data
})

export const patchLabelFailed = (error)=>({
    type:actionTypes.PATCH_LABEL_FAILED,
    error
})

export const uploadLabelAction = () =>({
    type:actionTypes.UPLOAD_LABEL_ACTION
})

export const uploadLabelSuccess = (data)=>({
    type:actionTypes.UPLOAD_LABEL_SUCCESS,
    data
})

export const uploadLabelFailed = (error)=>({
    type:actionTypes.UPLOAD_LABEL_FAILED,
    error
})

export const downloadLabelAction = () =>({
    type:actionTypes.DOWNLOAD_LABEL_ACTION
})

export const downloadLabelSuccess = (data)=>({
    type:actionTypes.DOWNLOAD_LABEL_SUCCESS,
    data
})

export const downloadLabelFailed = (error)=>({
    type:actionTypes.DOWNLOAD_LABEL_FAILED,
    error
})


export const deleteLabelAction = () =>({
    type:actionTypes.DELETE_LABEL_ACTION
})

export const deleteLabelSuccess = (data)=>({
    type:actionTypes.DELETE_LABEL_SUCCESS,
    data
})

export const deleteLabelFailed = (error)=>({
    type:actionTypes.DELETE_LABEL_FAILED,
    error
})



export const fetchLabels =(data)=>{
    return async dispatch =>{
        try {
            dispatch(fetchLabelsAction());
            console.log(data)
        const result = await getLabelsApi(data);
        console.log(result);
        if(result.status==200){
            dispatch(fetchLabelsSuccess(result.data))
        } else if(result.data.non_field_errors){
            let notificationData ={
                message:`${result.data.non_field_errors[0]} `,
                severity:'error'
            }
            dispatch(showNotification(notificationData))
            console.log(result);
        } else{
            let notificationData ={
                message:`Something went wrong`,
                severity:'error'
            }
        dispatch(showNotification(notificationData))
        }
        } catch (error) {
            console.log(error);

        }
    }
}


export const createLabel = (data)=>{
    return async dispatch=>{
        try {
            dispatch(createLabelAction());
            const result = await createLabelApi(data);
            if(result.status == 201){
                dispatch(createLabelSuccess())
                let notificationData = {
                    message:`${data.text} label created successfully`,
                    severity:'success'
                }
                dispatch(showNotification(notificationData))
                dispatch(fetchLabels(data))

            }else if(result.data.non_field_errors){
                let notificationData ={
                    message:`${result.data.non_field_errors[0]} `,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
                console.log(result);
            }
            
        } catch (error) {
            console.log(error)
            let notificationData ={
                message:`Something went wrong`,
                severity:'error'
            }
            dispatch(showNotification(notificationData))
            
        }
    }
}



export const patchLabel = (data) =>{
    return async dispatch =>{
        try {
            dispatch(patchLabelAction());
            const result = await patchLabelApi(data);
            if(result.status == 200){
                dispatch(patchLabelSuccess(result.data))
            } else if(result.data.non_field_errors){
                let notificationData ={
                    message:`${result.data.non_field_errors[0]} `,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
            } else{
                let notificationData ={
                    message:`Something went wrong`,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
                dispatch(patchLabelFailed(data))
            }

        } catch (error) {
            console.log(error);
            let notificationData ={
                message:`Something went wrong`,
                severity:'error'
            }
                dispatch(showNotification(notificationData))
        }
    }
}

export const uploadLabel = (data,projectId)=>{
    console.log(data,projectId);
    return  async dispatch =>{
        try {
            dispatch(uploadLabelAction());
            let result = await uploadLabelApi(data,projectId);
            if(result.status == 201){
            dispatch(uploadLabelSuccess(result.data))

            let notificationData ={
                message:`${data[0].name} imported successfully`,
                severity:'success'
            }
            dispatch(showNotification(notificationData));
            dispatch(fetchLabels({'projectId':projectId}));
            } else{
                let notificationData ={
                    message:`${result.data.error ? result.data.error : 'Something went wrong'}`,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
                dispatch(uploadLabelFailed(data))
            }
            
        } catch (error) {
            console.log(error);
            let notificationData ={
                message:`${error.error}`,
                severity:'error'
            }
                dispatch(showNotification(notificationData))
        }
    } 
}

export const downloadLabel =(projectId) => {
    return async dispatch =>{
        try {
            dispatch(downloadLabelAction());
            const result = await downloadLabelApi(projectId);
            if(result.status = 200){
                let responseFile = new Blob([result.data], {type: 'application/json'} );
                FileSaver.saveAs(responseFile,`project_${projectId}.json`)
            }else{
                let notificationData ={
                    message:`${result.data.error ? result.data.error : 'Something went wrong'}`,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
                dispatch(uploadLabelFailed(result.data))
            }
            
        } catch (error) {
            console.log(error);
            let notificationData ={
                message:`${error.error}`,
                severity:'error'
            }
                dispatch(showNotification(notificationData)) 
                dispatch(uploadLabelFailed(error))
        }
    }
}

export const deleteLabel = (data,projectId) => {
    return async dispatch =>{
        try {
            dispatch(deleteLabelAction());
            const result = await deleteLabelApi(data,projectId);
            if(result.status = 204){
                dispatch(deleteLabelSuccess({'labelId':data}));
                let notificationData = {
                    message: 'deleted successfully',
                    severity : 'success'
                }
                dispatch(showNotification(notificationData))
                
            } else {
                let notificationData ={
                    message:`${result.data.error ? result.data.error : 'Something went wrong'}`,
                    severity:'error'
                }
                dispatch(showNotification(notificationData))
                dispatch(uploadLabelFailed(data))

            }
            
        } catch (error) { 
            let notificationData ={
                message:`${error.error ? error.error : 'Something went wrong'}`,
                severity:'error'
            }
            dispatch(showNotification(notificationData))
            
        }
    }

}


