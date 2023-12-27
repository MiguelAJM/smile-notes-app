import { useEffect, useState } from 'react'

export default function useCategoryInfo(categoryName, categories) {
  const [currentCategory, setCurrentCategory] = useState(null)
  const [categoryDate, setCategoryDate] = useState(null)

  // Obtener la categoria actual

  useEffect(() => {
    const formattedCategory =
      categoryName.replace(/-/g, ' ').charAt(0).toUpperCase() +
      categoryName.slice(1)
    setCurrentCategory(formattedCategory)

    const categoryDateCreated = categories.find(
      (item) => item.categoryId === categoryName
    )
    const dateCreated = categoryDateCreated?.date_created
    setCategoryDate(dateCreated)
  }, [currentCategory, categoryDate])

  return { currentCategory, categoryDate }
}
