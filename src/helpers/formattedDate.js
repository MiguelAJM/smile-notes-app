// Formatear la fecha con el dia/mes/año
export const formattedDate = (date, options, onlyHourOrFull) => {
  const newDate = new Date(date)

  if (onlyHourOrFull) {
    return newDate.toLocaleTimeString('es-ES', options)
  } else {
    return newDate.toLocaleDateString('es-ES', options)
  }
}

// Comprobar si es ayer o hoy
export const isTodayOrYesterday = (date, options, onlyHourOrFull) => {
  const newDate = formattedDate(date, options, onlyHourOrFull)
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
  return formattedDate(date, option, false)
}
