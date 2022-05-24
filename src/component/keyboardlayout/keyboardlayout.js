
import React from 'react'
import '../../style/keyboardlayout.css'
import KeyboardRow from './keyboardrow'
function KeyboardLayout(){
    const keyboardFirstRow = ['q','w','e','r','t','y','u','i','o','p']
    const keyboardSecondRow = ['a','s','d','f','g','h','j','k','l']
    const keyboardThirdRow = ['z','x','c','v','b','n','m']
    return(
        <div className='keyboard-layout'>
            <div>
                <div>
                    <KeyboardRow row={{keyboardRow:keyboardFirstRow}} />
                </div>
                <div>
                <KeyboardRow row={{keyboardRow:keyboardSecondRow}} />
                </div>
                <div>
                <KeyboardRow row={{keyboardRow:keyboardThirdRow}} />
                </div>
                <div>
                    <button data-key="space" id='space-btn'>
                        space
                    </button>
                </div>
            </div>
        </div>
    )
}

export default KeyboardLayout