const initialState={
}

export default function Datasetreducer(state=initialState,action) {

        switch(action.type) {
            case 'GET_DATASETS':
                return {
                    list:action.payload.results
                }
                default:
                    return state
        }
  

}