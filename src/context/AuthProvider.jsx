import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { toast } from 'sonner'

const AuthContext = createContext()

export function useAuth() {
  const CONTEXT = useContext(AuthContext)
  if (!CONTEXT) {
    throw new Error(
      'You need to wrap the application in the provider: AuthProvider'
    )
  }
  return CONTEXT
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const { displayName, email, photoURL } = user ?? ''

  async function handleSignOut() {
    try {
      await signOut(auth)
      toast.success('Sesión cerrada exitosamente. !Vuelva pronto!')
      navigate('/login')
    } catch (error) {
      toast.error('Ha ocurrido un error inesperado, inténtalo más tarde.')
    }
  }

  useEffect(() => {
    const cancelledSuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return cancelledSuscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{ displayName, email, photoURL, user, loading, handleSignOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
