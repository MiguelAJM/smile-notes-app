import { Card, CardFooter, Skeleton } from '@nextui-org/react'
import { formattedDateCategory } from '../helpers/formattedDate'
import { useCategory } from '../context/CategoryProvider'
import { useParams } from 'react-router-dom'

export default function HeaderTask() {
  // Obtener la categoria por la URL
  const { id } = useParams()
  const CATEGORY = id

  const { categories, status } = useCategory()
  // Obtener la categoria actual
  const NEW_CATEGORY =
    CATEGORY[0].toUpperCase() + CATEGORY.slice(1).split('-').join(' ')

  // Obtener la fecha de creacion de la categoria
  const GET_CATEGORY = categories.find((item) => item.categoryId === CATEGORY)
  const CATEGORY_CREATED = GET_CATEGORY?.date_created

  if (status === 'pending' || status === 'idle') {
    return (
      <Card className='justify-end h-48 p-2'>
        <CardFooter className='w-full flex flex-col items-start'>
          <Skeleton className='w-[155px] h-[60px] mb-2 rounded-lg' />
          <Skeleton className='w-64 h-8 rounded-lg' />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className='justify-end min-h-48 p-2'>
      <CardFooter className='w-full flex flex-col items-start'>
        <h2 className='text-6xl font-light mb-2'>{NEW_CATEGORY}</h2>
        <h3 className='text-2xl font-light capitalize'>
          {formattedDateCategory(CATEGORY_CREATED)}
        </h3>
      </CardFooter>
    </Card>
  )
}
