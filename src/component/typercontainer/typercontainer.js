import React, { useEffect } from 'react'
import '../../style/typercontainer.css'
import { TEXT } from '../text'
function TyperContainer(){


         useEffect(()=>{
             const textWrapper = document.getElementById('text-wrapper')
             if(textWrapper){
                 for(let i = 0 ; i < TEXT.length ; i++){
                     const word = document.createElement('span')
                     word.textContent = TEXT[i]
                     word.dataset.id = i        
                     textWrapper.appendChild(word)
                 }

             }

         })
        //  setTimeout(()=>{
        //      const textWrapper = document.getElementById('text-wrapper')
        //      textWrapper.scrollTo(0,0)
        //  },2000)
    return(
        <div className='typer-container'>
            <div className=''>
                <div id='text-wrapper'></div>
                <div id='refresh-btn-wrapper'>
                    <button id='refresh-btn'>
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