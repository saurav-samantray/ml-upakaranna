import { actionTypes } from "./labelsAction";

const initialState ={
    loading:false,
    LabelList:[],
    error:""
}
let updatedLabelList;
 const labelReducer = (state=initialState,action)=>{
    switch(action.type) {
        case actionTypes.FETCH_LABELS_ACTION:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_LABELS_SUCCESS:
            return{
                ...state,
                LabelList:action.data,
                loading:false
            }
        case actionTypes.FETCH_LABELS_FAILED:
            return{
                ...state,
                error:action.error,
                loading:false

            }
        case actionTypes.PATCH_LABEL_ACTION:
            return{
                ...state,
                // loading:true
            }
        case actionTypes.PATCH_LABEL_SUCCESS:  
            

            updatedLabelList = state.LabelList.map(item=>{
                if(item.id == action.data.id){
                            item = action.data
                    }
                return item
            })
            
            return{
                ...state,
                LabelList: updatedLabelList,
                loading:false
            }
                    
                
        case actionTypes.PATCH_LABEL_FAILED:
            return{
                ...state,
                error:action.error,
                loading:false

            }
        case actionTypes.UPLOAD_LABEL_ACTION:
            return{
                // ...state,
                // loading:true
            }
        case actionTypes.UPLOAD_LABEL_SUCCESS:
            return{
                    // ...state,
                    // loading:false
            }
        case actionTypes.UPLOAD_LABEL_FAILED:
            return{
                // ...state,
                // loading:false
            }
            case actionTypes.DELETE_LABEL_ACTION:
                return{
                    ...state,
                    // loading:true
                }
            case actionTypes.DELETE_LABEL_SUCCESS:  
                updatedLabelList = state.LabelList.filter(item=>{    
                    return item.id != action.data.labelId
                })               
                return{
                    ...state,
                    LabelList: updatedLabelList,
                    loading:false
                }
                        
                    
            case actionTypes.DELETE_LABEL_FAILED:
                return{
                    ...state,
                    error:action.error,
                    loading:false
    
                }

        default :
            return state;
    }


}

export default labelReducer