import { Listbox, ListboxItem, Skeleton } from '@nextui-org/react'
import { IconArrowBadgeRightFilled } from '@tabler/icons-react'
import { useCategory } from '../context/CategoryProvider'
import { useParams } from 'react-router-dom'
import CategoryButton from '../elements/CategoryButton'
import { bgHover, bgPrimary } from '../themes'

export default function ListCategories() {
  const { id } = useParams()
  const { categories, status } = useCategory()

  if (status === 'pending' || status === 'idle') {
    return <Skeleton className='max-w-full h-11 my-20 rounded-lg' />
  }

  if (status === 'rejected') {
    return (
      <article className='my-20 overflow-y-auto'>
        <h2 className='text-lg font-medium text-center'>
          Ha ocurrido un error, inténtalo más tarde.
        </h2>
      </article>
    )
  }

  return categories.length === 0 ? (
    <article className='my-20 overflow-y-auto'>
      <h2 className='text-xl font-medium text-center'>No hay categorias.</h2>
    </article>
  ) : (
    <Listbox
      aria-label='Categories'
      className='h-full my-20 flex flex-col gap-3 overflow-y-auto'
    >
      {categories.map((item) => {
        const path = item.categoryTitle.split(' ').join('-').toLowerCase()
        const baseStyles = {
          base: [
            'group/edit',
            `dark:hover:${bgHover}`,
            `${path === id ? bgPrimary : ''}`
          ]
        }
        return (
          <ListboxItem
            key={item.id}
            textValue={item.categoryTitle}
            href={`/task/${path}`}
            startContent={<IconArrowBadgeRightFilled />}
            endContent={<CategoryButton item={item} />}
            classNames={baseStyles}
          >
            <h2 className='text-xl'>{item.categoryTitle}</h2>
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}
