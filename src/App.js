import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import {  useCallback, useEffect, useReducer, useRef, useState } from "react";
import ScrollTextWrapper from "./helpers/scroll_text_wrapper";
import {useSelector} from 'react-redux'

import Timer from "./component/timer/timer";
import Graph from "./component/graph/graph";
function App() {
  const cursorPos = useRef([0,0])
  const textIndex = useRef(0)
  let prevPressedKey = null
  const prevActiveWrapperParent = useRef(null)
  const SCROLLUPBEGINPOS = useRef(0)
  const textWrapper = useRef(null)
  const [isTyped,setIsyped] = useState(false)
  const scrollUpValue = useRef(35)
  const {text} = useSelector((textState)=>textState.LoadNewText)
  const [matchedKey,setMatchedKey] = useState(0)
  const [unmatchedKey,setUnmatchedKey] = useState(0)







  useEffect(()=>{
    window.addEventListener('resize',()=>{
    SCROLLUPBEGINPOS.current = textWrapper.current?.getBoundingClientRect().bottom - 40
    })
  },[])

  useEffect(()=>{
    textWrapper.current = document.getElementById('text-wrapper')
    SCROLLUPBEGINPOS.current = textWrapper.current?.getBoundingClientRect().bottom - 40
    document.body.addEventListener('keydown',ListenKeyDown)
    prevActiveWrapperParent.current = document.querySelector(`[data-id="0"]`) || null
    document.getElementById('text-wrapper')?.scrollTo(0,0)
  },[])
  
    
    const ListenKeyDown = useCallback(({key})=>{
      
      setIsyped(()=>true)
      const pressedKey = key
      const cursor = document.getElementById('cursor')
      if(textWrapper.current){
        const validPressedKey = /^[A-z\W]{1}$/
        if(validPressedKey.test(pressedKey)){
          const pressedElem =  document.querySelector(`[data-uid="${textIndex.current}"]`)
          if(pressedElem){
            if(prevActiveWrapperParent.current !== pressedElem.parentElement && prevActiveWrapperParent.current){
              prevActiveWrapperParent.current.classList.remove('active')
              prevActiveWrapperParent.current = pressedElem.parentElement
              prevActiveWrapperParent.current.setAttribute('class','active')
              prevActiveWrapperParent.current.appendChild(cursor)
              cursor.style.transform = `translateX(0px)`
              cursorPos.current = [0,0]
            }
           else {
             cursorPos.current = [pressedElem.offsetWidth + cursorPos.current[0],0]
             cursor.style.transform = `translateX(${cursorPos.current[0]}px)`
           } 
            if(text[textIndex.current] === pressedKey){
            if(pressedElem) pressedElem.style.color = "#0000ff"
            setMatchedKey((prevMatchedKey)=>prevMatchedKey  + 1)
            }
            else {
             if(pressedElem) pressedElem.style.color = "#ff0000"
             setUnmatchedKey((prevUnmatchedKey)=>prevUnmatchedKey + 1)
            }
            let keyboardBtn = null
            if(pressedKey === ' ') keyboardBtn = document.querySelector(`[data-key="space"]`)
            else keyboardBtn = document.querySelector(`[data-key=${pressedKey}]`)
            ColoredPressedKeyButton(keyboardBtn)
            if(prevActiveWrapperParent.current.getBoundingClientRect().top === SCROLLUPBEGINPOS.current){
              scrollUpValue.current = ScrollTextWrapper(textWrapper.current,scrollUpValue.current)
            }
            textIndex.current ++
          }
        }
        else if(pressedKey === 'Backspace'){
          prevPressedKey = document.querySelector(`[data-uid="${textIndex.current - 1}"]`)
          if(prevPressedKey){
            if(prevPressedKey.textContent !== ' '){
              textIndex.current -- 
              if(textIndex.current < 0) textIndex.current = 0              
              function RGBToHex(r,g,b){
                  return "#" + ConvertToHex(r) + ConvertToHex(g) + ConvertToHex(b)
              }
              function ConvertToHex(c){
                let hexValue = c.toString(16)
                console.log(hexValue)
                return hexValue.length === 1 ? "0" + hexValue : hexValue
              }
              const rgbValue = prevPressedKey.style.color.split('(')[1].split(',')
              const redValue = parseInt(rgbValue[0].trim())
              const greenValue = parseInt(rgbValue[1].trim())
              const blueValue = parseInt(rgbValue[2].trim().split(')')[0])
              
              if(RGBToHex(redValue,greenValue,blueValue) === '#ff0000') setUnmatchedKey((prevUnmatchedKey)=>prevUnmatchedKey - 1)
              else setMatchedKey((prevMatchedKey)=>prevMatchedKey  - 1)

              
              if(prevPressedKey) prevPressedKey.style.color = "#000000"
              if((cursorPos.current[0] - prevPressedKey.offsetWidth)>=0){
                cursorPos.current = [ cursorPos.current[0] - prevPressedKey.offsetWidth,0] 
                cursor.style.transform = `translateX(${cursorPos.current[0]}px)`
              }
            }
          }
        }
      }
    
    },[]) 

  function ColoredPressedKeyButton(btn){
    btn.style.background = "#ff0000"
    setTimeout(() => {
      btn.style.background = 'transparent'
    }, 100);
  }
  return (
    <div className="app">
      <Graph/>
      <Timer  start={isTyped} typedKeyInfo = {{matchedKey:matchedKey,unmatchedKey:unmatchedKey}}/>
      <TyperContainer  />
      <KeyboardLayout/>
    </div>
  );
}

export default App;
