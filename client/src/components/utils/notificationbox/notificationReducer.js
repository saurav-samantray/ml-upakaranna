import { actionTypes } from "./notificationAction";

const initalState={
    notification_status:false,
    notification_config:{

    },
    error:{}
}

export const notificationReducer =(state=initalState,action)=>{
    switch(action.type){
        case actionTypes.NOTIFICATION_OPEN:
            return{
                ...state,
                notification_status:true,
                notification_config:action.data
            }
        case actionTypes.NOTIFICATION_CLOSE:
            return{
                ...state,
                notification_status:false
            }
        case actionTypes.NOTIFICATION_FAILED:
            return{
                ...state,
                notification_status:false,
                error:action.error
            }
        default:
            return state
    }
}

