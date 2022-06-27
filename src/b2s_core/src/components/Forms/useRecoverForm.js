import { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { emailValidation, renderFieldError } from '../../utils/validation'

const useRecoverForm = ({ recover }) => {
  const userErrors = useSelector(store => store.session.userErrors)
  const dispatch = useDispatch()

  const [isSuccess, setIsSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  const handleRecaptchaChange = value => {
    setIsButtonDisabled(false)
  }
  const handleRecaptchaExpire = () => {
    setIsButtonDisabled(true)
  }

  const onSubmit = async data => {
    if (isButtonDisabled) return

    setIsProcessing(true)
    setIsSuccess(false)

    try {
      await dispatch(recover(data.email))
      setIsProcessing(false)
      setIsSuccess(true)
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return {
    handleRecaptchaChange,
    handleRecaptchaExpire,
    handleSubmit,
    onSubmit,
    isProcessing,
    isButtonDisabled,
    isSuccess,
    register,
    errors,
    userErrors,
    renderFieldError,
    emailValidation,
  }
}

export default useRecoverForm
