import { useState } from 'react'

export const useModelPagination = () => {
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const handlePaginationModelChange = (model) => {
    setModel(model)
  }
  return { model, handlePaginationModelChange }
}
