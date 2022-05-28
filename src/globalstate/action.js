
export const LoadNewText =(text,textIndex)=>{
    return {
        type:'CREATE_NEW_TEXT',
        newText:text,
        index:textIndex
    }
}
export const ComputeTypedKeyInfo = (matchedKey,unmatchedKey)=>{
    return{
        type:"TYPED_KEY_INFO",
        matchedKey,
        unmatchedKey
    }
}