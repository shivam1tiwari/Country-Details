import { SET_NAME } from "./ActionType.js"

const initialState = {
  name:""
}

 const NameReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_NAME:
      return {
       ...initialState,name:action.payload
      }
    default: 
    return state;
  }
}

export default NameReducer;