import { Bars } from 'react-loader-spinner'
import { Button } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useTask } from '../context/TaskProvider'
import { useModal } from '../context/ModalProvider'
import Layout from '../components/Layout'
import TasksStats from '../components/tasks/TaskStats'

export default function Home() {
  const { status } = useTask()
  const { toggleModalCategory } = useModal()

  if (status === 'pending' || status === 'idle') {
    return (
      <Layout>
        <div className='w-full h-full flex justify-center items-center'>
          <Bars
            height='275'
            width='275'
            color='#181818'
            ariaLabel='bars-loading'
            visible={true}
          />
        </div>
      </Layout>
    )
  }

  if (status === 'rejected') {
    return (
      <Layout>
        <div className='w-full flex flex-col items-start'>
          <h2 className='text-xl font-medium text-center'>
            No se ha podido obtener la categoria.
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col justify-between text-center mt-20 lg:mt-5 p-4 overflow-hidden'>
      <article className='flex flex-col gap-4 mb-4'>
        <h1 className='col-span-3 text-3xl md:text-7xl font-medium'>Hola de nuevo</h1>
        <p className='hidden md:block text-lg text-white/75'>Crea una categoria y empieza a listar</p>
      </article>
        <TasksStats />
        <Button
          onPress={() => toggleModalCategory()}
          size='lg'
          startContent={<IconPlus />}
          className='bg-[#181818] mt-3'
        >
          Crear categoria
        </Button>
      </div>
    </Layout>
  )
}
