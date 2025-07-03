import { CustomAccordion, DataGridCustom } from '@/libV4'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const ViewOffice = ({ idProcessType, handleEdit, handleDeleteOffice }) => {
  return (
    <CustomAccordion title='Dependencias'>
      <DataGridCustom
        requestProps={{
          baseKey: 'urlProcess',
          url: `/process-types/${idProcessType}/for-office?inclOffice=true`,
          isCompanyRequest: true,
          isPaginated: false,
        }}
        toolbarProps={{
          searchProps: {},
          buttonProps: {
            label: 'Agregar Dependencia',
            onClick: () => {
              handleEdit({ isNew: true })
            },
            className:
              'xs:col-span-12 md:col-span-6 md:col-start-7 xl:col-span-4 xl:col-start-9 2xl:col-span-3 2xl:col-start-10',
          },
        }}
        tableProps={{
          columns: [
            {
              headerName: 'Nombre',
              field: 'name',
              renderCell: (data) => data?.officeData?.name ?? '',
            },
            {
              headerName: '',
              field: 'options',
              pinned: 'right',
              width: 90,
              renderCell: (data) => {
                return (
                  <div className='flex items-center'>
                    <IconButton
                      title='Editar'
                      onClick={() => handleEdit(data)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      title='Eliminar'
                      onClick={() => handleDeleteOffice(data?.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                )
              },
            },
          ],
          containerProps: {
            className: 'h-[300px]',
          },
        }}
      />
    </CustomAccordion>
  )
}

export default ViewOffice
