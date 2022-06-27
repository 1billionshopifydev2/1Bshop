import React from 'react'
import Loader from '../../../../src/components/Loader'

const EndlessLineTmpl = props => (
  <div id={props.id} className="posts-view__pagination">
    <Loader />
  </div>
)

export default EndlessLineTmpl
