import React, { useRef, useState, useEffect } from 'react'
import { reset } from '@b2s_core/src/reducers/session'
import useResetForm from '@b2s_core/src/components/Forms/useResetForm';

const ResetFormTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Forms/ResetFormTmpl`).default

const ResetForm = () => {
  const ownProps = useResetForm({ reset });

  return <ResetFormTmpl {...ownProps} />
}

export default ResetForm
