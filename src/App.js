import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import { TEXT } from "./component/text";
function App() {
  let cursorPos = 0
  let prevPressedLetter = null
  
  function ListenTypingEvent(){
    document.body.addEventListener('keydown',(e)=>{
      const textWrapper = document.getElementById('text-wrapper')
      const pressedKey = e.key
      console.log(pressedKey)
      if(textWrapper){
        const validPressedKey = /^[A-z\W]{1}$/
        if(validPressedKey.test(pressedKey)){
          const pressedElem = textWrapper.children[cursorPos]
          if(TEXT[cursorPos] === pressedKey){
          if(pressedElem) pressedElem.style.color = "#0000ff"
          }
          else {
           if(pressedElem) pressedElem.style.color = "#ff0000"
          }
          let keyboardBtn = null
          if(pressedKey === ' ') keyboardBtn = document.querySelector(`[data-key="space"]`)
          else keyboardBtn = document.querySelector(`[data-key=${pressedKey}]`)
          ColoredPressedKeyButton(keyboardBtn)
          console.log(keyboardBtn)
          cursorPos ++
        }
        else if(pressedKey === 'Backspace'){
          cursorPos -- 
          if(cursorPos < -1) cursorPos = 0
          prevPressedLetter = textWrapper.children[cursorPos]
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
  ListenTypingEvent()
  return (
    <div className="app">
      <TyperContainer />
      <KeyboardLayout/>
    </div>
  );
}

export default App;
