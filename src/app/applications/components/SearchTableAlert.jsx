import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { searchTableBlocksContainer } from './styles'
import { SearchTable } from '@/lib'

const SearchTableAlertBlock = ({ searchText, handleChange, btnText }) => {
  return (
    <Box sx={searchTableBlocksContainer}>
      <SearchTable
        searchText={searchText}
        onChange={handleChange}
        width='70%'
      />
      <Button
        variant='contained'
        startIcon={<Add />}
      >
        {btnText}
      </Button>
    </Box>
  )
}

export default SearchTableAlertBlock
