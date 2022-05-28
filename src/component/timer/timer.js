import { useEffect, useRef, useState } from 'react'
import '../../style/timer.css'
function Timer({start}){
    console.log('rerenderd')
    const [timerValue,setTimerValue] = useState(30)
    const timerTimeOut = useRef(null)
    useEffect(()=>{
        console.log(timerValue,'timer value from useEffect')
        if(timerValue === 0){
            clearInterval(timerTimeOut.current)
        }
    },[timerValue])
    
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