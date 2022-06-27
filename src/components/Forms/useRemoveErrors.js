import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeErrors } from '@b2s_core/src/reducers/session'

const useRemoveErrors = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(removeErrors())
  }, [])
}

export default useRemoveErrors
