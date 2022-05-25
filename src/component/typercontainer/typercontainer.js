import React, { useEffect, useRef, useState } from 'react'
import '../../style/typercontainer.css'

function TyperContainer({textValue,replaceText}){
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
            for(let i = 0 ; i < textValue.length ; i++){
                const word = document.createElement('span')
                word.textContent = textValue[i]
                word.dataset.id = i    
                if(textWrapper.current) textWrapper.current.appendChild(word)
            }
    
        }
    }
    useEffect(AttachTextToTextWrapper)
    function RefreshText(){
        isReplaced.current = true
        AttachTextToTextWrapper()
    }
    return(
        <div className='typer-container'>
            <div id='text-wrapper-container'>
                <div id='cursor'>
                </div>
                <div id='text-wrapper'>
                </div>
                <div id='refresh-btn-wrapper'>
                    <button onClick={RefreshText} id='refresh-btn'>
                    <svg  height="40px" width="30px" xmlns="http://www.w3.org/2000/svg">
                        <path d = "M 18 10 C 0 10 , 0 30 , 18 30" />
                        <path d="M18 8.5 L 18 12.5 L 21 10.5 Z" /> 
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default TyperContainer
