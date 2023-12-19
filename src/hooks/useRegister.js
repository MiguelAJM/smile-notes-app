import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import { auth } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Crear la cuenta
  async function handleSubmit(e) {
    e.preventDefault()

    const REGULAR_EXPRESION = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

    if ([user.email, user.password].includes('')) {
      return toast.error('Por favor, rellena todos los campos.')
    } else if (!REGULAR_EXPRESION.test(user.email)) {
      return toast.error('Por favor, escribe un correo válido. ')
    }

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
      toast.success('Cuenta creada con exito.')
      navigate('/')
    } catch (err) {
      // Errores
      switch (err.code) {
        case 'auth/email-already-in-use':
          toast.error('Ya existe un correo electronico con esta dirección.')
          break
        case 'auth/invalid-email':
          toast.error('Este correo electronico no es válido.')
          break
        case 'auth/weak-password':
          toast.error('La contraseña debe tener al menos 6 carácteres.')
          break
        default:
          toast.error('Hubo un error al crear la cuenta, inténtalo más tarde.')
          break
      }
    }
  }

  // Iniciar sesion con google
  async function handleSignGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Inicio de sesión exitoso.')
      navigate('/')
    } catch (error) {
      toast.error('Ha ocurrido un error inesperado, inténtalo más tarde.')
    }
  }

  return { user, handleSubmit, handleChange, handleSignGoogle }
}
