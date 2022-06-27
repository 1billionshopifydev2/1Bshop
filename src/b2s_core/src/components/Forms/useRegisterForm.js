import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  renderFieldError,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordRepeatValidation,
  passwordValidation,
} from '../../utils/validation'

const useRegisterForm = ({ signup }) => {
  const userErrors = useSelector(store => store.session.userErrors)
  const dispatch = useDispatch()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const { register, setValue, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const handleRecaptchaChange = value => {
    setIsButtonDisabled(false)
  }
  const handleRecaptchaExpire = () => {
    setIsButtonDisabled(true)
  }

  const onSubmit = async data => {
    if (isButtonDisabled) return

    const { email, password, firstName, lastName } = data

    try {
      setIsProcessing(true)
      await dispatch(signup(email, password, firstName, lastName, true))
      setIsProcessing(false)
      window.location.replace('/dashboard')
    } catch (e) {
      setIsProcessing(false)
      console.error(e)
    }
  }

  return {
    handleRecaptchaChange,
    handleRecaptchaExpire,
    handleSubmit,
    onSubmit,
    isProcessing,
    isButtonDisabled,
    userErrors,
    register,
    errors,
    password,
    renderFieldError,
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation,
    passwordRepeatValidation,
  }
}

export default useRegisterForm
