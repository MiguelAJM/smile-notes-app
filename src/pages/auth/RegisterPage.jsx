import { Link } from 'react-router-dom'
import useRegister from '../../hooks/useRegister'

export default function RegisterPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useRegister()

  return (
    <div>
      <button onClick={handleSignGoogle}>Acceder con google</button>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          name='email'
          value={user.title}
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
        <button>Registrarse</button>
      </form>

      <Link to='/Login'>Iniciar sesion</Link>
    </div>
  )
}
