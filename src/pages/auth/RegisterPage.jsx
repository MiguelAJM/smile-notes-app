import { Button, Card, Input } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import useRegister from '../../utils/hooks/useRegister'
import { bgSecondary, textSecondary } from '../../themes'

export default function RegisterPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useRegister()

  return (
    <section className='flex min-w-screen min-h-screen'>
      <Card className='max-w-[480px] lg:max-w-[540px] mx-auto lg:mx-0 w-full flex flex-col gap-8 justify-center items-center p-8 z-[10]'>
        <div className='w-full'>
          <div className='flex flex-col'>
            <strong className='text-3xl uppercase font-light mb-5'>
              Crear cuenta
            </strong>
            <Button
              onClick={handleSignGoogle}
              className={`${bgSecondary} relative mt-6 rounded-full py-3 text-sm hover:shadow-lg`}
            >
              <span className='text-xl text-white'>Acceder con Google</span>
              <span className='absolute left-2 top-0 flex items-center justify-center h-full w-10 text-white'>
                <IconBrandGoogleFilled />
              </span>
            </Button>
          </div>
          <div className='relative mt-10 h-px bg-gray-300'>
            <div className='absolute left-0 top-0 flex justify-center w-full -mt-2'>
              <span className='bg-[#181818] px-4 text-xs text-gray-500 uppercase'>
                Con correo
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='mt-10 flex flex-col'>
            <Input
              className='p-3 text-dark rounded-full mb-5 outline-2 outline-secondary/75'
              type='text'
              name='email'
              id='email'
              value={user.email}
              onChange={handleChange}
              variant='underlined'
              placeholder='Correo electronico'
            />
            <Input
              className='p-3 text-dark rounded-full mb-5 outline-2 outline-secondary/75'
              type='password'
              name='password'
              id='pass'
              value={user.password}
              onChange={handleChange}
              variant='underlined'
              placeholder='Contraseña'
            />

            <Button
              type='submit'
              className={`${bgSecondary} relative mt-6 rounded-full py-3 text-sm text-gray-800 hover:shadow-lg'`}
            >
              <span className='text-xl text-white'>Crear cuenta</span>
            </Button>

            <span className='mt-8 px-4 text-center text-md'>
              ¿Ya tienes una cuenta?{' '}
              <Link
                className={`${textSecondary} font-semibold hover:underline'`}
                to={'/login'}
              >
                Inicia sesión
              </Link>
            </span>
          </form>
        </div>
      </Card>
    </section>
  )
}
