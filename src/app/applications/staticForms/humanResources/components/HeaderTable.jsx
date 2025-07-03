import { SearchTable } from '@/lib'
import { Button } from '@mui/material'

const HeaderTable = ({ searchOptions, handleSearch = () => {}, handleAdd = () => {} }) => {
  const handleKeyDown = (e) => {
    e.key === 'Enter' && handleSearch(searchOptions?.searchText)
  }

  const handleClear = () => {
    searchOptions?.clearSearch()
    handleSearch('')
  }

  return (
    <>
      <SearchTable
        searchText={searchOptions?.searchText}
        onChange={searchOptions?.handleSearchText}
        clearSearch={handleClear}
        handleKeyDown={handleKeyDown}
        className='xs:col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-8'
        width='100%'
      />
      <Button
        className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
        onClick={() => handleSearch(searchOptions?.searchText)}
        variant='contained'
        color='primary'
        size='small'
        fullWidth
      >
        Buscar
      </Button>
      <Button
        className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
        onClick={() => handleAdd()}
        variant='contained'
        color='primary'
        size='small'
        fullWidth
      >
        Agregar
      </Button>
    </>
  )
}

export default HeaderTable
