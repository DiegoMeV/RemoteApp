import { SearchTable } from '@/lib'
import { Cached, FileDownloadOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Tooltip } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const CustomToolbar = ({
  requestSearch,
  refetchInfoRows,
  handleSearch,
  handleClearText,
  downloadExcel,
}) => {
  const searchText = useStoreState((state) => state.searchText.searchText)
  const stateSideBar = useStoreState((state) => state.stateSideBar.stateSideBar)
  const handleClickRefetchInfoRows = async () => {
    try {
      await refetchInfoRows()
      toast.success('Bandeja actualizada')
    } catch (error) {
      toast.error(error?.message ?? 'Error al actualizar la bandeja')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='flex justify-between p-2 shadow-md rounded-t-lg bg-white dark:bg-transparent'>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          display='flex'
          alignItems='center'
        >
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <SearchTable
              onChange={requestSearch}
              searchText={searchText}
              clearSearch={handleClearText}
              handleKeyDown={handleKeyDown}
              width='100%'
            />
          </Box>
          <Button
            variant='contained'
            onClick={handleSearch}
            sx={{ ml: 1 }}
          >
            Buscar
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
            <Tooltip title='Refrescar'>
              <Button
                sx={{ fontSize: { xs: 0, md: stateSideBar ? 0 : 12, lg: 12 } }}
                onClick={handleClickRefetchInfoRows}
                startIcon={<Cached color='primary' />}
              >
                Refrescar
              </Button>
            </Tooltip>

            <Tooltip title='Excel'>
              <Button
                sx={{ fontSize: { xs: 0, md: stateSideBar ? 0 : 12, lg: 12 } }}
                onClick={() => {
                  downloadExcel()
                }}
                startIcon={<FileDownloadOutlined />}
              >
                Excel
              </Button>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomToolbar
