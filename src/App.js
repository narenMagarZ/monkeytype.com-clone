import KeyboardLayout from "./component/keyboardlayout/keyboardlayout";
import TyperContainer from "./component/typercontainer/typercontainer";
import { TEXT } from "./component/text";
function App() {
  let cursorPos = 0
  function ListenTypingEvent(){
    document.body.addEventListener('keypress',(e)=>{
      const textWrapper = document.getElementById('text-wrapper')
      const pressedKey = e.key
      if(textWrapper){
        const validPressedKey = /^[A-z\W]{1}$/
        if(validPressedKey.test(pressedKey)){
          console.log(pressedKey)
          const pressedElem = textWrapper.children[cursorPos]
          if(TEXT[cursorPos] === pressedKey){
            pressedElem.style.color = "#00ff00"
          }
          else {
            pressedElem.style.color = "#ff0000"
          }
          cursorPos ++
          console.log(cursorPos,'cursor position')
        }
      }
    })
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
