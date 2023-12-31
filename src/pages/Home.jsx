import { Bars } from 'react-loader-spinner'
import { Button } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useCategory } from '../context/CategoryProvider'
import { useModal } from '../context/ModalProvider'
import Layout from '../components/Layout'
import TasksStats from '../components/tasks/TaskStats'

export default function Home() {
  const { status, categories } = useCategory()
  const { toggleModalCategory } = useModal()

  const CATEGORIES_EMPTY = 0

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
            Ha ocurrido un error inesperado, vuelve en otro momento.
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col gap-2 text-center mt-20 lg:mt-5 p-4 overflow-hidden'>
        <article className='flex flex-col gap-4 my-4 lg:mb-8'>
          <h1 className='text-3xl md:text-7xl font-medium'>¡Hola de nuevo!</h1>
          {categories.length === CATEGORIES_EMPTY && (
            <p className='text-white/75 text-sm md:text-xl'>
              Empieza a listar tus tareas creando una categoria
            </p>
          )}
        </article>
        <Button
          onPress={() => toggleModalCategory()}
          size='lg'
          startContent={<IconPlus />}
          className='bg-[#181818] mb-4 min-h-16 text-xl'
        >
          Crear categoria
        </Button>
        <TasksStats />
      </div>
    </Layout>
  )
}
