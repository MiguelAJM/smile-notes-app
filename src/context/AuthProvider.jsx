import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig'

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

  useEffect(() => {
    const cancelledSuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return cancelledSuscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
