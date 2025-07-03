import { useState } from 'react'

const useSearch = () => {
  const [searchText, setSearchText] = useState('')
  const handleSearchText = (value) => {
    setSearchText(value)
  }
  const clearSearch = () => {
    setSearchText('')
  }
  return { searchText, handleSearchText, clearSearch }
}

export default useSearch
