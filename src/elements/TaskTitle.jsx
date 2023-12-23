import React from 'react'
import { formattedDate } from '../helpers/formattedDate'

export default function TaskTitle({ item }) {
  return (
    <div>
      <h2 className='text-2xl font-bold'>{item.title}</h2>
      <p className='text-sm text-white/50 uppercase'>
        {formattedDate(item.date_created)}
      </p>
    </div>
  )
}
