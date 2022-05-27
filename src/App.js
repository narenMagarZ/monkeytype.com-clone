import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import {GetText} from "./component/text";
import { useEffect, useRef } from "react";
import ScrollTextWrapper from "./helpers/scroll_text_wrapper";
import {useSelector,useDispatch} from 'react-redux'
import { LoadNewText } from "./globalstate/action";
function App() {
  
  let cursorPos = useRef([0,0])
  let textIndex = useRef(0)
  let prevPressedKey = null
  let prevActiveWrapperParent = useRef(null)
  let initialWordWrapperPos = useRef(316.5)
  const SCROLLDOWNHELPER = 246.5
  let scrollUpValue = useRef(35)

  const loadTextDispatcher = useDispatch()
  const TEXT = useSelector((textState)=>textState.LoadNewText)

  useEffect(()=>{
    prevActiveWrapperParent.current = document.querySelector(`[data-id="0"]`) || null
    document.getElementById('text-wrapper')?.scrollTo(0,0)
  })
  useEffect(()=>{
    loadTextDispatcher(LoadNewText(GetText()))
  },[loadTextDispatcher])
  function ListenTypingEvent(){
    const textWrapper = document.getElementById('text-wrapper')
    document.body.addEventListener('keydown',(e)=>{
      const pressedKey = e.key
      const cursor = document.getElementById('cursor')
      if(textWrapper){
  
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
            if(TEXT[textIndex.current] === pressedKey){
            if(pressedElem) pressedElem.style.color = "#0000ff"
            }
            else {
             if(pressedElem) pressedElem.style.color = "#ff0000"
            }
            let keyboardBtn = null
            if(pressedKey === ' ') keyboardBtn = document.querySelector(`[data-key="space"]`)
            else keyboardBtn = document.querySelector(`[data-key=${pressedKey}]`)
            ColoredPressedKeyButton(keyboardBtn)
            if(prevActiveWrapperParent.current.getBoundingClientRect().top === initialWordWrapperPos.current){
              scrollUpValue.current = ScrollTextWrapper(textWrapper,scrollUpValue.current,35)
            }
            textIndex.current ++
          }
        }
        else if(pressedKey === 'Backspace'){
          prevPressedKey = document.querySelector(`[data-uid="${textIndex.current - 1}"]`)
          console.log(prevPressedKey,'test')
          console.log(textIndex.current,'text index current')
          if(prevPressedKey){
            if(prevPressedKey.textContent !== ' '){
              textIndex.current -- 
              if(textIndex.current < 0) textIndex.current = 0
              if(prevPressedKey) prevPressedKey.style.color = "#000000"
              if((cursorPos.current[0] - prevPressedKey.offsetWidth)>=0){
                cursorPos.current = [ cursorPos.current[0] - prevPressedKey.offsetWidth,0] 
                cursor.style.transform = `translateX(${cursorPos.current[0]}px)`
              }
            }
          }

          // if(prevPressedKey.textContent === ' '){
            // prevActiveWrapperParent.current = document.querySelector(`[data-uid="${textIndex.current - 1}"]`).parentElement
            // prevPressedKey.parentElement.classList.remove('active')
            //   prevActiveWrapperParent.current.appendChild(cursor)
            //   prevActiveWrapperParent.current.setAttribute('class','active')
            //   cursor.style.transition = '0ms'
            //   cursor.style.transform = `translateX(${prevActiveWrapperParent.current.clientWidth}px)`
            //   cursorPos.current = [prevActiveWrapperParent.current.clientWidth, 0]
            //   setTimeout(() => {
            //     cursor.style.transition = '0.1s linear'
            //   }, 50);
            // }
          //  if(prevPressedKey.textContent !== ' ') {
           
            // }
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
      <TyperContainer  />
      <KeyboardLayout/>
    </div>
  );
}

export default App;
