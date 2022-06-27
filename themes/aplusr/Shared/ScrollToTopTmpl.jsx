import React from 'react'

const ScrollToTopTmpl = (props) =>  
    <div className="scroll-to-top">
      {props.isVisible && <div onClick={() => props.scrollToTop()}></div>}
    </div> 

export default ScrollToTopTmpl
