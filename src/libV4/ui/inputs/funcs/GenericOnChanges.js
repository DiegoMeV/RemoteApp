import { useState } from 'react'

export const useSearch = () => {
  const [value, setValue] = useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return {
    value,
    handleChange,
  }
}
