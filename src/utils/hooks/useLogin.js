import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfig'

export default function useLogin() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Iniciar sesion
  async function handleSubmit(e) {
    e.preventDefault()

    const REGULAR_EXPRESION = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

    if ([user.email, user.password].includes('')) {
      return toast.error('Por favor, rellena todos los campos.')
    } else if (!REGULAR_EXPRESION.test(user.email)) {
      return toast.error('Por favor, escribe un correo válido. ')
    }

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password)
      toast.success('Inicio de sesión exitoso. ¡Bienvenido/a de vuelta!')
      navigate('/')
    } catch (err) {
      // Errores
      switch (err.code) {
        case 'auth/invalid-email':
          return toast.error('Este correo electronico no es válido.')
        case 'auth/user-not-found':
          return toast.error('Este usuario no existe.')
        case 'auth/invalid-credential':
          return toast.error('El correo o contraseña no son válidos.')
        case 'auth/wrong-password':
          return toast.error('Contraseña incorrecta.')
        default:
          return toast.error('Hubo un error al iniciar sesión.')
      }
    }
  }

  // Iniciar sesion con google
  async function handleSignGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Inicio de sesión exitoso. ¡Bienvenido/a de vuelta!')
      navigate('/')
    } catch (error) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          return toast.info('Inicio de sesión cancelado.')
        case 'auth/unauthorized-domain':
          return toast.error('No se puede iniciar sesión en este dominio.')
        case 'auth/popup-blocked':
          return toast.error(
            'Se requiere acceso a ventanas emergentes para iniciar sesión.'
          )
        case 'auth/cancelled-popup-request':
          return toast.error(
            'Solo se puede abrir una ventana emergente a la vez.'
          )
        case 'auth/account-exists-with-different-credential':
          return toast.error(
            'No se puede crear una nueva cuenta con este correo electrónico.'
          )
        default:
          return toast.error(
            'Ha ocurrido un error inesperado, inténtalo más tarde.'
          )
      }
    }
  }

  return { user, handleSubmit, handleChange, handleSignGoogle }
}
