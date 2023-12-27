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
          return toast.error(
            'Ya existe un correo electronico con esta dirección.'
          )
        case 'auth/invalid-email':
          return toast.error('Este correo electronico no es válido.')
        case 'auth/weak-password':
          return toast.error('La contraseña debe tener al menos 6 carácteres.')
        default:
          return toast.error(
            'Hubo un error al crear la cuenta, inténtalo más tarde.'
          )
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
