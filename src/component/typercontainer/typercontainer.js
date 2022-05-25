import React, { useEffect, useRef, useState } from 'react'
import '../../style/typercontainer.css'

function TyperContainer({textValue,replaceText}){
    
    const [activeWordWrapper,setActiveWordWrapper] = useState(null)
    useEffect(()=>{
        if(activeWordWrapper){
            const cursor  = document.createElement('div')
            cursor.setAttribute('id','cursor')
            console.log('done done ')
            console.log(cursor)
            activeWordWrapper.appendChild(cursor)
        }
    },[activeWordWrapper])



    const isReplaced = useRef(false)
    let textWrapperContainer = useRef(null)
    let textWrapper = useRef(null)
    function AttachTextToTextWrapper(){
        textWrapperContainer.current = document.getElementById('text-wrapper-container')
        textWrapper.current = document.getElementById('text-wrapper')
        const {ReplaceText} = replaceText
        if(textWrapper){
            if(isReplaced.current === true){
                textWrapper.current.innerHTML = ''
                ReplaceText()
                isReplaced.current = false
            }
            let keyWrapper = document.createElement('div')
            let isWordWrapperActive = false
            for(let i = 0 ; i < textValue.length ; i++){
                keyWrapper.setAttribute('id','word')
                if(!isWordWrapperActive){
                    keyWrapper.setAttribute('class','active')
                    setActiveWordWrapper(keyWrapper)
                    console.log('passed')
                    isWordWrapperActive = true
                }
                if(textValue[i] === ' '){ // check for space
                    if(textWrapper.current) textWrapper.current.appendChild(keyWrapper)
                    keyWrapper = document.createElement('div')
                }
                const word = document.createElement('span')
                word.textContent = textValue[i]
                word.setAttribute('data-uid',`${i}`)   
                keyWrapper.appendChild(word)
            }
    
        }
    }
    useEffect(AttachTextToTextWrapper,[textValue,replaceText])
    function RefreshText(){
        isReplaced.current = true
        AttachTextToTextWrapper()
    }
    return(
        <div className='typer-container'>
            <div id='text-wrapper-container'>
                <div id='text-wrapper'>
                {/* <div id='cursor'>
                </div> */}
                </div>
                <div id='refresh-btn-wrapper'>
                    <button onClick={RefreshText} id='refresh-btn'>
                    <svg  height="40px" width="30px" xmlns="http://www.w3.org/2000/svg">
                        <path d = "M 18 8 C 0 8 , 0 22 , 18 22" />
                        <path d="M18 7.5 L 18 10.5 L 21 9 Z" /> 
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default TyperContainer
