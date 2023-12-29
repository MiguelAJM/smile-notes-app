import { Card, CardFooter } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useCategory } from '../../context/CategoryProvider'
import { formattedDate } from '../../utils/helpers/formattedDate'

export default function TaskHeader() {
  const { id: category } = useParams()

  const { categories } = useCategory()

  // Opciones para formatear la fecha
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour12: true
  }

  // Obtener la categoria actual
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]+/g
  const categoryName = category.replace(regex, ' ')

  // Obtener la fecha de ceracion de la categoria
  const categoryCreated = categories.find((item) => item.date_created)
  const dateCreated = categoryCreated?.date_created

  return (
    <Card className='col-span-4 justify-end  min-h-32 lg:min-h-40 p-2 shadow-none'>
      <CardFooter className='w-full flex flex-col md:flex-row  gap-2 justify-between items-end'>
        <article className='w-full flex flex-col'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl capitalize font-light line-clamp-1 pb-2'>
            {categoryName}
          </h2>
          <h3 className='text-sm md:text-lg lg:text-xl font-light capitalize'>
            {formattedDate(dateCreated, options, { time: 'full-date' })}
          </h3>
        </article>
      </CardFooter>
    </Card>
  )
}
