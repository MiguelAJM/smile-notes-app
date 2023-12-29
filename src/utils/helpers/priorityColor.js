export const priorityTask = (priorityName) => {
  if (priorityName === 'none') {
    return {
      chip_color: 'bg-gray-500',
      text_color: 'text-gray-500',
      name: 'Ninguna'
    }
  }
  if (priorityName === 'low') {
    return {
      chip_color: 'bg-lime-500',
      text_color: 'text-lime-500',
      name: 'Baja'
    }
  }
  if (priorityName === 'medium') {
    return {
      chip_color: 'bg-orange-500',
      text_color: 'text-orange-500',
      name: 'Media'
    }
  }
  if (priorityName === 'high') {
    return {
      chip_color: 'bg-red-500',
      text_color: 'text-red-500',
      name: 'Alta'
    }
  }
  // Por si acaso la prioridad no coincide con ninguna de las anteriores
  return {
    chip_color: 'bg-gray-500',
    text_color: 'text-gray-500',
    name: 'Ninguna'
  }
}
