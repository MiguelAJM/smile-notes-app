import { Listbox, ListboxItem, Spinner } from '@nextui-org/react'
import { IconArrowBadgeRightFilled } from '@tabler/icons-react'
import { useCategory } from '../context/CategoryProvider'
import { useParams } from 'react-router-dom'
import CategoryButton from '../elements/CategoryButton'

export default function ListCategories() {
  const { id } = useParams()
  const { categories, status } = useCategory()

  // const TEST = 'pending'

  if (status === 'pending' || status === 'idle') {
    return <Spinner size='lg' color='secondary' className='my-20' />
  }

  return categories.length === 0 ? (
    <article className='my-20 overflow-y-auto'>
      <h2 className='text-xl font-medium text-center'>No hay categorias</h2>
    </article>
  ) : (
    <Listbox
      aria-label='Categories'
      className='h-full my-20 flex flex-col gap-3 overflow-y-auto'
    >
      {categories.map((item) => {
        const { categoryTitle } = item
        const URL = categoryTitle.split(' ').join('-').toLowerCase()
        return (
          <ListboxItem
            textValue={item.categoryTitle}
            startContent={<IconArrowBadgeRightFilled />}
            endContent={<CategoryButton item={item} />}
            classNames={{
              base: [
                'group/edit',
                'dark:hover:bg-purple-800',
                `${URL === id ? 'bg-purple-600' : ''}`
              ]
            }}
            key={item.id}
            href={`/task/${URL}`}
          >
            <h2 className='text-xl'>{item.categoryTitle}</h2>
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}
