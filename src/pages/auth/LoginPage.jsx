import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  IconBrandGoogleFilled,
  IconLock,
  IconMailFilled
} from '@tabler/icons-react'
import useLogin from '../../hooks/useLogin'

export default function LoginPage() {
  const { user, handleSubmit, handleChange, handleSignGoogle } = useLogin()

  return (
    <motion.section
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      className='w-full min-h-screen flex items-center justify-center p-2 xs:p-4 md:p-8'
    >
      <article className='max-w-[675px] w-full'>
        <Card className='bg-blue-chill-950 border-1 border-blue-chill-600 md:p-4'>
          <CardHeader className='flex flex-col gap-5'>
            <h2 className='text-3xl font-bold'>Iniciar sesión</h2>
            <Button
              fullWidth
              startContent={<IconBrandGoogleFilled />}
              className='bg-blue-chill-400 text-blue-chill-950 transition-all ease-in-out duration-300 hover:bg-blue-chill-300'
              onPress={handleSignGoogle}
            >
              Acceder con google
            </Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <Input
                label='Correo'
                placeholder='Introduce un correo'
                name='email'
                type='email'
                startContent={<IconMailFilled />}
                value={user.email}
                onChange={handleChange}
              />
              <Input
                label='Contraseña'
                placeholder='Introduce tu contraseña'
                name='password'
                type='password'
                startContent={<IconLock />}
                value={user.password}
                onChange={handleChange}
              />
              <Divider />
              <Button
                type='submit'
                className='bg-blue-chill-400 text-blue-chill-950 transition-all ease-in-out duration-300 hover:bg-blue-chill-300'
              >
                Iniciar sesión
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <p className='text-sm text-center mx-auto'>
              ¿No tienes cuenta?{' '}
              <Link className='text-blue-chill-400 underline' to='/register'>
                Registrarse
              </Link>
            </p>
          </CardFooter>
        </Card>
      </article>
    </motion.section>
  )
}
