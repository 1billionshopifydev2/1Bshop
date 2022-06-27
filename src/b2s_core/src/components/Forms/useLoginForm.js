import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  emailValidation,
  passwordValidation,
  renderFieldError,
} from '../../utils/validation'

const useLoginForm = ({ login, associateCustomer, redirectAfterTo }) => {
  const userErrors = useSelector(store => store.session.userErrors)
  const dispatch = useDispatch()

  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  const onSubmit = async data => {
    setIsProcessing(true)
    try {
      await dispatch(login(data.email.toLowerCase(), data.password))
      dispatch(associateCustomer())
      setIsProcessing(false)
      window.location.replace(redirectAfterTo ? redirectAfterTo : '/dashboard')
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return {
    redirectAfterTo,
    handleSubmit,
    onSubmit,
    isProcessing,
    userErrors,
    register,
    errors,
    renderFieldError,
    emailValidation,
    passwordValidation,
  }
}

export default useLoginForm
