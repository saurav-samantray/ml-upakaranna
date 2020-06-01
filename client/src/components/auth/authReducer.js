const initialState={}

export default function authReducer(state=initialState,action) {
        switch(action.type) {
            case 'GET_TOKEN':
                return {
                    ...action.payload
                }
                default:
                    return state
        }
  

}