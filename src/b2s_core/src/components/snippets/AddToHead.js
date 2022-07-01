import React from 'react'
import Helmet from 'react-helmet'

export const AddToHead = ({children}) => (
    <Helmet>
        {children}
    </Helmet>
)