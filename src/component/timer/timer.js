import { useEffect, useRef, useState ,useReducer} from 'react'
import '../../style/timer.css'
function Timer({start,typedKeyInfo}){
    const [timerValue,setTimerValue] = useState(30)
    const timerTimeOut = useRef(null)
    const WPM = useRef(0)
    const accuracy = useRef(0)
    const timerCount = useRef(0)
    const {matchedKey,unmatchedKey} = typedKeyInfo
    const typingInfo = useRef([{counter:0,match:0,error:0}])
    const [isTimerActivate,setTimerActivation] = useState(false)
    const reducer = (state,action)=>{
        if(action.type === 'test'){
            return [...state,action.payload]
        }
        else return [{...state}]
      }
    const initstate = [{counter:0,match:0,errors:0}]
    
      const [state,dispatch] = useReducer(reducer,initstate)
    
    
    useEffect(()=>{
        if(isTimerActivate){
            typingInfo.current.push({counter:timerCount.current,match:matchedKey,error:unmatchedKey})
            setTimerActivation(()=>false)
        }
    },[matchedKey,unmatchedKey,isTimerActivate])

    useEffect(()=>{
        if(timerValue === 0){
            clearInterval(timerTimeOut.current)
            CalculateWPM()
            CalculateAccuracy()
        }
    },[timerValue])

    function CalculateWPM(){
        WPM.current = parseInt(matchedKey / (5 * 0.5))
        console.log(WPM.current,'this is the wpm')
        return WPM.current
    }

    function CalculateAccuracy(){
        const totalKeyTyped = matchedKey + unmatchedKey
        accuracy.current = (matchedKey * 100 ) / totalKeyTyped
        console.log(accuracy.current,'this is the accuracy ')
    }
    function TimerStarter(){
        setTimerValue((initTimerValue)=>{
            return initTimerValue - 1
        }) 
        timerCount.current = timerCount.current + 1
        setTimerActivation(()=>true)
        // dispatch({type:'test',payload:{counter:timerCount.current,match:matchedKey,errors:unmatchedKey}})
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