import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import {GetText} from "./component/text";
import { useEffect, useRef, useState } from "react";

function App() {
  let cursorPos = useRef([0,0])
  let textIndex = useRef(0)
  let prevPressedKey = null
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
          if(textIndex.current < 0) textIndex.current = 0
          console.log(textIndex.current)
          prevPressedKey = document.querySelector(`[data-uid="${textIndex.current}"]`)
          if(prevPressedKey.textContent === ' '){
            prevActiveWrapperParent.current = document.querySelector(`[data-uid="${textIndex.current - 1}"]`).parentElement
            console.log(prevActiveWrapperParent.current,'this is parent element')
            console.log(prevPressedKey.parentElement,'this is prev parent element')
            prevPressedKey.parentElement.classList.remove('active')
            prevActiveWrapperParent.current.appendChild(cursor)
            prevActiveWrapperParent.current.setAttribute('class','active')
            cursor.style.transition = '0ms'
            cursor.style.transform = `translateX(${prevActiveWrapperParent.current.clientWidth}px)`
            cursorPos.current = [prevActiveWrapperParent.current.clientWidth, 0]
            setTimeout(() => {
              cursor.style.transition = '0.1s linear'
              
            }, 50);
          }
          // else if(prevActiveWrapperParent.current !== prevPressedKey.parentElement){
          //   console.log('parent is changed')
          //   if(prevPressedKey) prevPressedKey.style.color = "#000000"
          //   prevActiveWrapperParent.current = prevPressedKey.parentElement
          // }
          else {
            if(prevPressedKey) prevPressedKey.style.color = "#000000"
            cursorPos.current = [ cursorPos.current[0] - prevPressedKey.offsetWidth,0]
            console.log(cursorPos.current,'cursorpos')
            cursor.style.transform = `translateX(${cursorPos.current[0]}px)`
          }
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
  ListenTypingEvent()
  return (
    <div className="app">
      <TyperContainer textValue={text}  />
      <KeyboardLayout/>
    </div>
  );
}

export default App;
