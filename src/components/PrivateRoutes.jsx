import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function PrivateRoutes({ children }) {
  const { user } = useAuth()
  return user !== undefined ? children : <Navigate replace to='/login' />
}
