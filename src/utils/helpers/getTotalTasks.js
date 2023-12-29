export const getTotalTasks = (tasks, options) => {
  if (options.task === 'completed') {
    return tasks.filter((item) => item.completed !== false).length
  }
  if (options.task === 'no-completed') {
    return tasks.filter((item) => item.completed === false).length
  }
  if (options.task === 'all') {
    return tasks.length
  }
  return 0
}
