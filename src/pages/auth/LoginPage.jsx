import React from 'react'
import useLogin from '../../hooks/useLogin'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useLogin()

  return (
    <div>
      <button onClick={handleSignGoogle}>Acceder con google</button>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          name='email'
          value={user.email}
          onChange={handleChange}
          placeholder='Correo'
        />
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          placeholder='Contraseña'
        />
        <button>Iniciar sesion</button>
      </form>

      <Link to='/register'>Registrarse</Link>
    </div>
  )
}
