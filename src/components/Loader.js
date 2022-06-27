import React from 'react'
const LoaderTmpl = require(`../../themes/${process.env.B2S_THEME_NAME}/LoaderTmpl`)
  .default

const Loader = () => <LoaderTmpl />

export default Loader
