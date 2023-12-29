export const isCategoryExists = (categories, name) => {
  const categoryName = name.toLowerCase()

  // Comprobamos si ya la categoria existe
  const currentCategory = categories.filter(
    (item) => item.categoryId === categoryName
  )
  return currentCategory[0]?.categoryId === categoryName
}
