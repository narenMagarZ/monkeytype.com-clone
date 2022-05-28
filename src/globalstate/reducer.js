import { combineReducers } from "redux";
import { GetText } from "../component/text";


export const TypedKeyInfo = (previnfo = {matchedKey:0,unmatchedKey:0},{type,matchedKey,unmatchedKey})=>{
    if(type === 'TYPED_KEY_INFO') return {matchedKey,unmatchedKey}
    else return previnfo
}

export const LoadNewText = (prevText = {...GetText()},{type,newText,index})=>{
if(type === 'CREATE_NEW_TEXT') return {text:newText,index}
else return prevText

}
export default combineReducers({
    LoadNewText,
    TypedKeyInfo
    })
    