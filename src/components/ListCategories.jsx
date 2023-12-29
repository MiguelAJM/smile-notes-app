import { Listbox, ListboxItem } from '@nextui-org/react'
import { IconArrowBadgeRightFilled } from '@tabler/icons-react'
import { useCategory } from '../context/CategoryProvider'
import { useParams } from 'react-router-dom'
import { bgHover, bgPrimary } from '../themes'
import { Grid } from 'react-loader-spinner'
import { useAuth } from '../context/AuthProvider'
import CategoryButton from '../elements/CategoryButton'

export default function ListCategories() {
  const { id } = useParams()
  const { user } = useAuth()
  const { categories, status } = useCategory()

  if (status === 'pending' || status === 'idle') {
    return (
      <div className='w-full flex justify-center'>
        <Grid
          visible={true}
          height='80'
          width='80'
          color='#6667E2'
          ariaLabel='grid-loading'
          radius='12.5'
          wrapperStyle={{}}
          wrapperClass='my-24 grid-wrapper'
        />
      </div>
    )
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
      className='lg:h-full my-16 lg:my-20 flex flex-col gap-3 overflow-y-auto'
    >
      {categories.map((item) => {
        const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]+/g
        const path = item.categoryTitle.replace(regex, '-').toLowerCase()
        const title = item.categoryTitle.replace(regex, ' ').toLowerCase()
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
            href={`/task/${path}/u/${user.uid}`}
            startContent={<IconArrowBadgeRightFilled />}
            endContent={<CategoryButton item={item} />}
            classNames={baseStyles}
          >
            <h2 className='text-xl capitalize line-clamp-1'>{title}</h2>
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}
