import { ClassicIconButton, GenericTable } from '@/lib'
import { ContentPasteGo } from '@mui/icons-material'
import { useStoreActions } from 'easy-peasy'

const TableProcessDocuments = ({ processDocuments, loadingProcessDocuments }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  return (
    <GenericTable
      rows={processDocuments}
      columns={[
        {
          field: 'nombreMostrar',
          headerName: 'Nombre',
          width: 200,
          valueGetter: (params) => `${params?.row?.nombreMostrar ?? ''}`,
        },
        {
          field: 'nombre',
          headerName: 'Nombre archivo',
          width: 200,
          renderCell: (params) => `${params?.row?.nombre ?? ''}`,
        },
        {
          field: 'options',
          headerName: '',
          width: 60,
          renderCell: ({ id }) => (
            <ClassicIconButton
              title='Visualizar'
              onClick={async () => {
                setPreviewer({
                  open: true,
                  idDocument: id,
                  loadingPreviewer: true,
                })
              }}
              color='secondary'
            >
              <ContentPasteGo />
            </ClassicIconButton>
          ),
        },
      ]}
      loading={loadingProcessDocuments}
      sx={{ minHeight: '500px' }}
    />
  )
}

export default TableProcessDocuments
