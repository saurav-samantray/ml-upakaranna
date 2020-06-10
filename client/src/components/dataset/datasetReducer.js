import { actionTypes } from "./datasetAction";

const initialState={
    loading:false,
    dataSetList:[],
    // downloadDatasetURL:'',
    error:{}
}

export default function DatasetReducer(state=initialState,action) {

        switch(action.type) {
            case actionTypes.FETCH_DATASET_ACTION:
                return {
                    ...state,
                    loading:true
                }
            case actionTypes.FETCH_DATASET_SUCCESS:
                return{
                    ...state,
                    dataSetList:action.data.results,
                    pageConfig:{
                        count:action.data.count,
                        next:action.data.next,
                        previous:action.data.previous,
                    
                    },
                    loading:false
                }
            case actionTypes.FETCH_DATASET_FAILED:
                return{
                    ...state,
                    error:action.error
                }
            // case actionTypes.DOWNLOAD_DATASET_ACTION:
            //     return {
            //         ...state,
            //         loading:true
            //     }
            // case actionTypes.DOWNLOAD_DATASET_SUCCESS:
            //     return {
            //         ...state,
            //         downloadDatasetURL:action.data,
            //         loading:false
            //     }
            // case actionTypes.DOWNLOAD_DATASET_FAILED:
            //     return {
            //         ...state,
            //         error:action.error,
            //         loading:false
            //     }


            default:
                    return state
        }
  

}