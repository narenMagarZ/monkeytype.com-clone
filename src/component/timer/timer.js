import { useEffect, useRef, useState } from 'react'
import '../../style/timer.css'
function Timer({start}){
    console.log('rerenderd')
    const [timerValue,setTimerValue] = useState(30)
    const timerTimeOut = useRef(null)
    const isDone = useRef(false)
    function test(){
        setTimerValue((initTimerValue)=>{
            if(initTimerValue === 22)
            isDone.current = true
            return initTimerValue - 1
        }) 
        console.log(timerValue,'timer value')
        if(isDone.current) {
            console.log('passed')
            clearInterval(timerTimeOut.current)
         }
    }
     if(start){
         if(!timerTimeOut.current)
         timerTimeOut.current = setInterval(test,1000);
         
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