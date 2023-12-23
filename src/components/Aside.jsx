import { Button } from '@nextui-org/react'
import { useCategory } from '../context/CategoryProvider'
import { useModal } from '../context/ModalProvider'
import { Link } from 'react-router-dom'

export default function Aside() {
  const { categories } = useCategory()
  const { activeCategoryModal } = useModal()

  return (
    <aside className='w-1/4 rounded-lg flex flex-col z-10'>
      <header className='relative h-full flex flex-col gap-5'>
        <Button
          onPress={activeCategoryModal}
          size='lg'
          radius='full'
          className='absolute top-0 left-0 right-0 bg-purple-600'
        >
          + Nueva categoria
        </Button>

        <ul className='h-full mt-20 flex flex-col gap-3 overflow-y-auto'>
          {categories.map((item) => {
            const { categoryTitle } = item
            const URL = categoryTitle.split(' ').join('-').toLowerCase()
            return (
              <li key={item.id}>
                <Link to={`/task/${URL}`}>
                  <p>{item.categoryTitle}</p>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className='bg-background absolute bottom-0 left-0'>
          user
        </div>
      </header>
    </aside>
  )
}
