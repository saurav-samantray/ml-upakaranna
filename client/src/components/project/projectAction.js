import  { getProjectsListApi,
            getProjectApi ,
            createProjectApi
        }  from "../../api/projectsApi";

export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_PROJECT = 'GET_PROJECT'

export const actionTypes={
    FETCH_PROJECTS_LIST:"FETCH_PROJECTS_LIST",
    FETCH_PROJECTS_LIST_SUCCESS:"FETCH_PROJECTS_LIST_SUCCESS",
    FETCH_PROJECTS_LIST_FAILED:"FETCH_PROJECTS_LIST_FAILED",

    FETCH_PROJECT:"FETCH_PROJECT",
    FETCH_PROJECT_SUCCESS:"FETCH_PROJECT_SUCCESS",
    FETCH_PROJECT_FAILED:"FETCH_PROJECT_FAILED",

    CREATE_PROJECT:"CREATE_PROJECT",
    CREATE_PROJECT_SUCCESS:"CREATE_PROJECT_SUCCESS",
    CREATE_PROJECT_FAILED:"CREATE_PROJECT_FAILED"
    

}



// action Creators

const fetchProjectsListAction = ()=>({
        type:actionTypes.FETCH_PROJECTS_LIST,
    });
const fetchProjectsListSuccess = (response)=>({
        type:actionTypes.FETCH_PROJECTS_LIST_SUCCESS,
        response
    });
const fetchProjectsListFailed = (error)=>({
        type:actionTypes.FETCH_PROJECTS_LIST_FAILED,
        error
    });
const fetchProjectAction = ()=>({
    type:actionTypes.FETCH_PROJECT,
})
const fetchProjectSuccess = (response)=>({
    type:actionTypes.FETCH_PROJECT_SUCCESS,
    response

})
const fetchProjectFailed = (error)=>({
    type:actionTypes.FETCH_PROJECT_FAILED,
    error
})

const createProjectAction = ()=>({
    type:actionTypes.CREATE_PROJECT,
})

const createProjectSuccess = (response) =>({
    type:actionTypes.CREATE_PROJECT_SUCCESS,
    response
})

const createProjectFailed = (error) =>({
    type:actionTypes.CREATE_PROJECT_FAILED,
    error
})


export const getProjectsList = ()=>{
    console.log("test")
    return async dispatch => {
        dispatch(fetchProjectsListAction());
        try{
            const response = await getProjectsListApi();
            console.log("Projects from API call..", response)
            if(response.status == 200){
                dispatch(fetchProjectsListSuccess(response.data))
            }else{
                dispatch(fetchProjectsListFailed(response.error))
                console.log(response.error)
            }
        }
        catch(error) {
            // console.log(error)

        }
    }
}

export const getProject = (id)=>{

    return async dispatch =>{
        dispatch(fetchProjectAction());
        try {
            const response = await getProjectApi(id);
            console.log(response)
            if(response.status == 200){
                dispatch(fetchProjectSuccess(response.data))
            } else{
                dispatch(fetchProjectFailed(response.error))
                console.log(response.error)
            }
        } catch (error) {
            console.log(error);
        }

    }
}


export const createProject = (data)=>{
    return async dispatch =>{
        dispatch(createProjectAction());
        try {
            const response =await createProjectApi(data);
            console.log(response)
            if(response.status == 201){
                dispatch(createProjectSuccess(response.data))
                dispatch(getProjectsList());
            } else{
                dispatch(fetchProjectFailed(response.error))
                console.log(response.error)
            }
        } catch (error) {
            console.log(error);
        }
    }
}



    // return async dispatch =>{
    //     try{
    //         const result = await axios.get(`/projects/${id}`)
    //         console.log("Project Detail  from API call..", result)
    //         dispatch({
    //             type: GET_PROJECT,
    //             payload: result.data
    //         })
    //     }
    //     catch(error) {
    //         console.log("error")

    //     }

    // }
