import React, { useEffect, useRef, useState } from 'react'
import '../../style/typercontainer.css'
import {useSelector,useDispatch} from 'react-redux'
import { ActiveWordWrapper } from '../../globalstate/action'
function TyperContainer({textValue}){
    // const activeWordWrapper = useSelector((state)=>state.SetActiveWordWrapper)
    // const dispatch = useDispatch()
    let textWrapperContainer = useRef(null)
    let textWrapper = useRef(null)
    const activeWordWrapper = useRef(null)
    function AttachTextToTextWrapper(){
        textWrapperContainer.current = document.getElementById('text-wrapper-container')
        textWrapper.current = document.getElementById('text-wrapper')
        if(textWrapper){
            let keyWrapper = document.createElement('div')
            for(let i = 0 ; i < textValue.length ; i++){
                keyWrapper.setAttribute('id','word')
                if(!activeWordWrapper.current){
                    keyWrapper.setAttribute('class','active')
                    keyWrapper.setAttribute('data-id',`${i}`)
                    // dispatch(ActiveWordWrapper(keyWrapper))
                    activeWordWrapper.current = keyWrapper
                    const cursor  = document.createElement('div')
                    cursor.setAttribute('id','cursor')
                    activeWordWrapper.current.appendChild(cursor)
                }
                if(textValue[i] === ' '){ // check for space
                    if(textWrapper.current) textWrapper.current.appendChild(keyWrapper)
                    keyWrapper = document.createElement('div')
                    keyWrapper.setAttribute('data-id',`${i}`)
                }
                const word = document.createElement('span')
                word.textContent = textValue[i]
                word.setAttribute('data-uid',`${i}`)   
                keyWrapper.appendChild(word)
            }
    
        }
    }
    useEffect(AttachTextToTextWrapper,[textValue])
    function RefreshText(){
    
    }
    return(
        <div className='typer-container'>
            <div id='text-wrapper-container'>
                <div id='text-wrapper'>
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
