import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import {GetText} from "./component/text";
import { useEffect, useRef, useState } from "react";
function App() {
  let cursorPos = useRef(0)
  let prevPressedLetter = null
  const [text,setText] = useState('')
  useEffect(()=>{
    setText(()=>GetText())
  },[])
  function ListenTypingEvent(){
    const textWrapper = document.getElementById('text-wrapper')
    document.body.addEventListener('keydown',(e)=>{
      const pressedKey = e.key
      if(textWrapper){
        const validPressedKey = /^[A-z\W]{1}$/
        if(validPressedKey.test(pressedKey)){
          const pressedElem = textWrapper.children[cursorPos.current]
          if(text[cursorPos.current] === pressedKey){
          if(pressedElem) pressedElem.style.color = "#0000ff"
          }
          else {
           if(pressedElem) pressedElem.style.color = "#ff0000"
          }
          let keyboardBtn = null
          if(pressedKey === ' ') keyboardBtn = document.querySelector(`[data-key="space"]`)
          else keyboardBtn = document.querySelector(`[data-key=${pressedKey}]`)
          ColoredPressedKeyButton(keyboardBtn)
          cursorPos.current ++
        }
        else if(pressedKey === 'Backspace'){
          cursorPos.current -- 
          if(cursorPos.current < -1) cursorPos.current = 0
          prevPressedLetter = textWrapper.children[cursorPos.current]
          if(prevPressedLetter) prevPressedLetter.style.color = "#000000"
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
    cursorPos.current = 0
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
