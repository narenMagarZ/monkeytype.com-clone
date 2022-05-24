export default function KeyboardRow({row}){
  return row['keyboardRow'].map((keyName,index)=>{
        return <button id="keyboard-key-btn" key={index} >
            {keyName}
        </button>
    })
}