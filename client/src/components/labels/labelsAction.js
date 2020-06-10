import { getLabelsApi } from "../../api/projectsApi";
import { showNotification } from "../utils/notificationbox/notificationAction";
export const actionTypes ={
    FETCH_LABELS_ACTION :'GET_LABELS_ACTION',
    FETCH_LABELS_SUCCESS :'FETCH_LABELS_SUCCESS',
    FETCH_LABELS_FAILED :'FETCH_LABELS_FAILED'
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


export const fetchLabels =(data)=>{
    return async dispatch =>{
        try {
            dispatch(fetchLabelsAction());
        const result = await getLabelsApi(data);
        console.log(result);
        if(result.status==200){
            dispatch(fetchLabelsSuccess(result.data))
        }else{
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



