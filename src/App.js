import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import {GetText} from "./component/text";
import { useEffect, useRef, useState } from "react";

function App() {
  let cursorPos = useRef([0,0])
  let textIndex = useRef(0)
  let prevPressedLetter = null
  let prevActiveWrapperParent = useRef(null)
  
  useEffect(()=>{
    prevActiveWrapperParent.current = document.querySelector(`[data-id="0"]`) || null
  })
  const [text,setText] = useState('')
  useEffect(()=>{
    setText(()=>GetText())
  },[])
  function ListenTypingEvent(){
    const textWrapper = document.getElementById('text-wrapper')
    document.body.addEventListener('keydown',(e)=>{
      const pressedKey = e.key
      const cursor = document.getElementById('cursor')
      if(textWrapper){
        const validPressedKey = /^[A-z\W]{1}$/
        if(validPressedKey.test(pressedKey)){
          const pressedElem =  document.querySelector(`[data-uid="${textIndex.current}"]`)
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
          }
          else {
           if(pressedElem) pressedElem.style.color = "#ff0000"
          }
          let keyboardBtn = null
          if(pressedKey === ' ') keyboardBtn = document.querySelector(`[data-key="space"]`)
          else keyboardBtn = document.querySelector(`[data-key=${pressedKey}]`)
          ColoredPressedKeyButton(keyboardBtn)
          textIndex.current ++
        }
        else if(pressedKey === 'Backspace'){
          textIndex.current -- 
          if(textIndex.current < -1) textIndex.current = 0
          prevPressedLetter = document.querySelector(`[data-uid="${textIndex.current}"]`)
          if(prevPressedLetter) prevPressedLetter.style.color = "#000000"
          cursorPos.current = [prevPressedLetter.offsetWidth - cursorPos.current[0],0]
          cursor.style.transform = `translateX(${cursorPos.current[0]}px)`
        }
      }
    })
  }
  function ColoredPressedKeyButton(btn){
    btn.style.background = "#ff0000"
    setTimeout(() => {
      btn.style.background = 'transparent'
    }, 100);
  }
  function ReplaceText(){
    textIndex.current = 0
    setText(()=>GetText())
  }
  ListenTypingEvent()
  return (
    <div className="app">
      <TyperContainer textValue={text} replaceText={{ReplaceText}} />
      <KeyboardLayout/>
    </div>
  );
}

export default App;
