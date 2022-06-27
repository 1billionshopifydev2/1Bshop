import { useEffect, useRef, useState } from 'react'
import { globalHistory, navigate } from '@reach/router'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  passwordRepeatValidation,
  passwordValidation,
  renderFieldError,
} from '../../utils/validation'

const useResetForm = ({ reset }) => {
  const userErrors = useSelector(store => store.session.userErrors)
  const dispatch = useDispatch()

  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  const { search } = globalHistory.location
  const urlParams = new URLSearchParams(search)
  const id = urlParams.get('id')
  const token = urlParams.get('token')
  const userEmail = urlParams.get('email')
  const resetUrl = `https://${process.env.CHECKOUT_DOMAIN}/account/reset/${id}/${token}`

  useEffect(() => {
    if (!id || !token) {
      navigate('/')
    }
  }, [])

  const onSubmit = async data => {
    setIsProcessing(true)

    try {
      await dispatch(reset(resetUrl, data.password))
      setIsProcessing(false)
      window.location.replace('/dashboard')
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return {
    userEmail,
    handleSubmit,
    onSubmit,
    isProcessing,
    register,
    errors,
    userErrors,
    password,
    renderFieldError,
    passwordValidation,
    passwordRepeatValidation,
  }
}

export default useResetForm
