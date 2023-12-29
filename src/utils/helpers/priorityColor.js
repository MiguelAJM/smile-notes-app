export const priorityTask = (priorityName) => {
  if (priorityName === 'none') {
    return 'bg-gray-500'
  }
  if (priorityName === 'low') {
    return 'bg-lime-500'
  }
  if (priorityName === 'medium') {
    return 'bg-orange-500'
  }
  if (priorityName === 'high') {
    return 'bg-red-500'
  }
  return ''
}
