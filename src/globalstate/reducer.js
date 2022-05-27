import { combineReducers } from "redux";



export const LoadNewText = (prevText = null,{type,newText})=>{
if(type === 'CREATE_NEW_TEXT') return newText
else return prevText

}
export default combineReducers({
    LoadNewText
    })
    