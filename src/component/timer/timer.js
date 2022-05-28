import { useEffect, useRef, useState } from 'react'
import '../../style/timer.css'
function Timer({start,typedKeyInfo}){
    const [timerValue,setTimerValue] = useState(30)
    const timerTimeOut = useRef(null)
    const WPM = useRef(0)
    const {matchedKey,unmatchedKey} = typedKeyInfo
    useEffect(()=>{
        if(timerValue === 0){
            clearInterval(timerTimeOut.current)
            calculateWPM()
        }
    },[timerValue])
    function calculateWPM(){
        WPM.current =parseInt(matchedKey / (5 * 0.5))
        console.log(WPM.current,'this is the wpm')
    }
    function TimerStarter(){
        setTimerValue((initTimerValue)=>{
            return initTimerValue - 1
        }) 
    }
     if(start){
         if(!timerTimeOut.current)
         timerTimeOut.current = setInterval(TimerStarter,1000);
         
     }
    return (
        <div className='timer-container'>
            <div className='timer-wrapper'>
                <span>{timerValue}</span>
            </div>
        </div>
    )
}
export default Timer