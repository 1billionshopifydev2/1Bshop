import React from 'react' 
import Link from '@b2s_core/src/utils/Link'


const CookiesBarTmpl = (props) => (
  <div className="cookiesBar">
    <div className="cookiesBar-content">
      <div>
        We use cookies for analytics and marketing. To find out more about our
        use of cookies, please see our
        {<Link to="/privacy-policy">privacy policy</Link>}. By continuing to
        browse our website, you agree to our use of cookies.
      </div>
      <button onClick={() => props.handleClick()} className="btn btn-primary">
        OK
      </button>
    </div>
  </div>
)

export default CookiesBarTmpl
