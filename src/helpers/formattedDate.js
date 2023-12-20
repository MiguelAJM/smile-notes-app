export function formattedDate(fecha) {
  const newDate = new Date(fecha)

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  return newDate.toLocaleDateString('es-ES', options)
}
