import { useState } from 'react'

export const useStateAccordionChange = () => {
  const [expanded, setExpanded] = useState(false)
  const handleChange = () => {
    setExpanded(!expanded)
  }
  return { expanded, handleChange }
}
