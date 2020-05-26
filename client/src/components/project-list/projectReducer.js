const initialState={
}

export default function Projectreducer(state=initialState,action) {

        switch(action.type) {
            case 'GET_PROJECTS':
                return {
                    list:action.payload
                }
            case 'GET_PROJECT':
                return {
                    ...state,
                    selectedproject:action.payload
                }
                default:
                    return state
        }
  

}