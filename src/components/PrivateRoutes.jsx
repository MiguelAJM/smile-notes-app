import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function PrivateRoutes({ children }) {
  const { user } = useAuth()
  return user !== null ? children : <Navigate replace to='/login' />
}
