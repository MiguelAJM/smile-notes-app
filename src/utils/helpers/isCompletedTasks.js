export const isCompletedTasks = (tasks, completedTasks) => {
  return tasks.filter((item) => {
    if (completedTasks) {
      return item.completed === completedTasks || item.completed
    }
    return tasks
  })
}
