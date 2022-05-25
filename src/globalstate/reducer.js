import { combineReducers } from "redux";


// reducer takes the current state and action as arguments and return the new state 
export const SetActiveWordWrapper = (initialState=null,{type,wrapper})=>{
    if(type === 'ACTIVEWORDWRAPPER') return wrapper
    else return initialState
}
export default combineReducers({
SetActiveWordWrapper
})