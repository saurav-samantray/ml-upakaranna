import { actionTypes } from "./labelsAction";

const initialState ={
    loading:false,
    LabelList:[],
    error:""
}

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
                error:action.error
            }

        default :
            return state;
    }


}

export default labelReducer