import { actionTypes } from "./projectAction";

const initialState={
    loading:false,
    projectList:[],
    selectedProject:{}
}

export default function ProjectReducer(state=initialState,action) {

        switch(action.type) {
            case actionTypes.FETCH_PROJECTS_LIST:
                return {
                    ...state,
                    loading:true 
                }
            case actionTypes.FETCH_PROJECTS_LIST_SUCCESS:
                console.log(action);
                return{
                    ...state,
                    projectList:action.response,
                    loading:false
                }
            case actionTypes.FETCH_PROJECTS_LIST_FAILED:
                return{
                    ...state,
                    error:action.error,
                    loading:false
                }
            case actionTypes.FETCH_PROJECT:
                return{
                    ...state,
                    loading:true
                }
            case actionTypes.FETCH_PROJECT_SUCCESS:
                return{
                    ...state,
                    selectedProject:action.payload,
                    loading:false
                }
            case actionTypes.FETCH_PROJECT_FAILED:
                return{
                    ...state,
                    error:action.error,
                    loading:false

                }

            default:
                return state
        }
  

}