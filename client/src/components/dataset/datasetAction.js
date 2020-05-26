import axios from '../../configs/apiconfig'

export const GET_DATASETS = 'GET_DATASETS'



export const getDatasets = (id,limit,offset)=>{
    return async dispatch =>{
        try{
            const result = await axios.get(`/projects/${id}/docs?limit=${limit}&offset=${offset}`)
            console.log("Dataset APi call..", result)
            dispatch({
                type: GET_DATASETS,
                payload: result.data
            })
        }
        catch(error) {
            console.log("error")

        }

    }
}
