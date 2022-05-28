
export const LoadNewText =(text,textIndex)=>{
    return {
        type:'CREATE_NEW_TEXT',
        newText:text,
        index:textIndex
    }
}