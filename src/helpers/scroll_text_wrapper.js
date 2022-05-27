function ScrollTextWrapper(textWrapper,scrollByValue,scrollStep){
    textWrapper.scrollTo(0,scrollByValue)
    return scrollByValue + scrollStep
}

export default ScrollTextWrapper