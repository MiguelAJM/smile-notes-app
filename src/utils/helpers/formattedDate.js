// Formatear la fecha con el dia/mes/año
export const formattedDate = (date, options, mode) => {
  const newDate = new Date(date)

  if (mode.time === 'hours') {
    return newDate.toLocaleTimeString('es-ES', options)
  }

  if (mode.time === 'full-date') {
    return newDate.toLocaleDateString('es-ES', options)
  }
}

// Comprobar si es ayer o hoy
export const isTodayOrYesterday = (date, options, mode) => {
  const newDate = formattedDate(date, options, mode)
  const storedDate = new Date(date)
  const currentDate = new Date()

  if (
    storedDate.getDate() === currentDate.getDate() &&
    storedDate.getMonth() === currentDate.getMonth() &&
    storedDate.getFullYear() === currentDate.getFullYear()
  ) {
    return `Hoy a las: ${newDate}`
  }

  currentDate.setDate(currentDate.getDate() - 1)
  if (
    storedDate.getDate() === currentDate.getDate() &&
    storedDate.getMonth() === currentDate.getMonth() &&
    storedDate.getFullYear() === currentDate.getFullYear()
  ) {
    return `Ayer a las: ${newDate}`
  }

  const option = {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour12: true
  }
  return formattedDate(date, option, { time: 'full-date' })
}
