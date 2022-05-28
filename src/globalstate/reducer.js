import { combineReducers } from "redux";
import { GetText } from "../component/text";



export const LoadNewText = (prevText = {...GetText()},{type,newText,index})=>{
if(type === 'CREATE_NEW_TEXT') return {text:newText,index}
else return prevText

}
export default combineReducers({
    LoadNewText
    })
    