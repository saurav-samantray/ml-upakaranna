const initialState={
    'drawer':true
}

export default function Headerreudcer(state=initialState,action) {

        switch(action.type) {
            case 'TOGGLE_DRAWER':
                return {
                    ...state,
                    drawer:action.payload
                }
                default:
                    return state
        }
  

}