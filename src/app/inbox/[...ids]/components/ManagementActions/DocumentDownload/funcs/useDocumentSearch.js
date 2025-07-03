import { useState } from 'react'

const useDocumentSearch = ({ rows }) => {
  const [searchDocument, setSearchDocument] = useState('')

  const clearSearch = () => {
    setSearchDocument('')
  }
  const onSearchChange = (value) => {
    setSearchDocument(value)
  }
  let documents = rows

  if (searchDocument !== '') {
    documents = documents.filter((document) => {
      return document?.ActionItemRel?.name.toLowerCase().includes(searchDocument.toLowerCase())
    })
  }
  return { documents, onSearchChange, searchDocument, clearSearch }
}

export default useDocumentSearch
