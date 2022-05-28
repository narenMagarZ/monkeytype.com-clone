function ScrollTextWrapper(textWrapper,scrollByValue){
    const SCROLLSTEP = 35
    textWrapper.scrollTo(0,scrollByValue)
    return scrollByValue + SCROLLSTEP
}

export default ScrollTextWrapper