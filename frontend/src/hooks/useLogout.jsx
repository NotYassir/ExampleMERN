import { useAuthContext } from './useAuthContext'
import { useExamplesContext } from './useExamplesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchExamples } = useExamplesContext()
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchExamples({ type: 'SET_EXAMPLES', payload: null })
  }

  return { logout }
}