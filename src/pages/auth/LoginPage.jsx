import React from 'react'
import useLogin from '../../hooks/useLogin'
import { Link } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'

export default function LoginPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useLogin()

  return (
    <div className='flex flex-col gap-4 w-[350px]'>
      <Button color='success' onPress={handleSignGoogle}>
        Acceder con google
      </Button>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <Input
          type='email'
          name='email'
          value={user.email}
          onChange={handleChange}
          label='Correo'
        />
        <Input
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          label='Contraseña'
        />
        <Button color='primary' type='submit'>
          Iniciar sesion
        </Button>
      </form>

      <Link to='/register'>Registrarse</Link>
    </div>
  )
}
