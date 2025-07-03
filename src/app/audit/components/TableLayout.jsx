import { Box } from '@mui/material'
import { CardContentPage, TitlePage } from '.'
import toast from 'react-hot-toast'
import { DataGridCustom } from '@/libV4'

const TableLayout = ({ columns, title, buttonClick, error, urlApi, additionalQry }) => {
  if (error) {
    return toast.error('Error al cargar la información')
  }
  const buttonProps = {
    onClick: buttonClick,
  }
  return (
    <>
      <TitlePage
        title={title}
        backpath={'/audit/notify'}
      />
      <CardContentPage>
        <Box width='100%'>
          <DataGridCustom
            requestProps={{
              isCompanyRequest: true,
              baseKey: 'urlFiscalizacion',
              additionalQry: additionalQry,
              url: urlApi,
            }}
            tableProps={{
              columns: columns ?? [],
              containerProps: { className: 'h-[calc(100vh-450px)] min-h-[300px]' },
            }}
            toolbarProps={{ buttonProps }}
          />
        </Box>
      </CardContentPage>
    </>
  )
}

export default TableLayout
