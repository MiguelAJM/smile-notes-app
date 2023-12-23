export function formattedDate(fecha) {
  const newDate = new Date(fecha)

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  return newDate.toLocaleTimeString('es-ES', options)
}

export function formattedDateCategory(fecha) {
  const newDate = new Date(fecha)

  const options = {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  }

  return newDate.toLocaleDateString('es-ES', options)
}
