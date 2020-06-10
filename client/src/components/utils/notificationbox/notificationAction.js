 export const  actionTypes ={
        NOTIFICATION_OPEN:'NOTIFICATION_OPEN',
        NOTIFICATION_CLOSE:'NOTIFICATION_CLOSE',
        NOTIFICATION_FAILED:'NOTIFICATION_FAILED'
 }

//  ACTION CREATORS
export const showNotificationAction = (data)=>({
    type:actionTypes.NOTIFICATION_OPEN,
    data
})
export const closeNotificationAction =()=>({
    type:actionTypes.NOTIFICATION_CLOSE,
})
export const showNotificationFailed = (error)=>({
    type:actionTypes.NOTIFICATION_FAILED,
    error
})

// THUNK

export const showNotification =(data)=>{
    return async dispatch =>{      
        try {
           dispatch(showNotificationAction(data))
        } catch (error) {
            dispatch(showNotificationFailed(error))
        }
    }
}

export const closeNotification=()=>{
    return async dispatch=>{
        try {
            dispatch(closeNotificationAction())
        } catch(error){
            dispatch(showNotificationFailed(error))
        }
    }
}