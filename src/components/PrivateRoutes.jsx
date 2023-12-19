import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function PrivateRoutes({ children }) {
  const { user } = useAuth()

  if (user !== null) {
    return children
  }

  return <Navigate replace to='/login' />
}
