import { Link } from 'react-router-dom'
import useRegister from '../../hooks/useRegister'
import { Button, Input } from '@nextui-org/react'

export default function RegisterPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useRegister()

  return (
    <div className='flex flex-col gap-4 w-[350px]'>
      <Button color='success' onPress={handleSignGoogle}>
        Acceder con google
      </Button>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <Input
          type='email'
          name='email'
          value={user.title}
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
        <Button color='secondary' type='submit'>Registrarse</Button>
      </form>

      <Link to='/login'>Iniciar sesion</Link>
    </div>
  )
}
