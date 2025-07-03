import { Button } from '@mui/material'

import { CardAppsByCompany } from '../components'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import {
  BackdropLoading,
  BasicTitle,
  GenericTextfield,
  LoadingError,
  useMutationDynamicBaseUrl,
} from '@/libV4'

const ViewAppsByCompany = ({
  idCompany,
  appsByCompany,
  loadingAppsByCompany,
  errorAppsByCompany,
  refetchAppsByCompany,
}) => {
  const setVLProps = useStoreActions((actions) => {
    return actions.valueList.setVLProps
  })

  const { mutateAsync: addingCompany, isPending: addingCompanie } = useMutationDynamicBaseUrl({
    isCompanyRequest: false,
    baseKey: 'urlUsers',
    url: `/apps`,
    onSuccess: () => {
      toast.success('Aplicación agregada correctamente')
      refetchAppsByCompany?.()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al agregar aplicación')
    },
  })

  const toggleDisabled = (id) => {
    return appsByCompany?.data?.find((app) => app.id === id)
  }

  const selectedOption = (row) => {
    addingCompany({ body: { idApplication: row.id, idCompany } })
  }

  const openmodal = () => {
    setVLProps({
      open: true,
      title: 'Agregar aplicación',
      requestParams: {
        isCompanyRequest: true,
        baseKey: 'urlApps',
        url: '/application?',
      },
      toggleDisabled,
      selectedOption,
      shouldClose: false,
      columns: [
        {
          field: 'fullName',
          headerName: 'Nombre',
        },
        {
          field: 'info',
          headerName: '',
          renderCell: ({ row }) => {
            const isDisabled = toggleDisabled(row.id)
            return isDisabled ? 'La aplicacion ya pertenece a esta compañia' : ''
          },
        },
      ],
    })
  }

  return (
    <div className='general_page_container'>
      <LoadingError
        loading={loadingAppsByCompany}
        error={errorAppsByCompany}
      >
        <BackdropLoading loading={addingCompanie} />
        <div className='grid gap-6 w-full max-w-screen-2xl pb-5'>
          <BasicTitle
            title='Aplicaciones por compañía'
            backpath='/companies'
          />
        </div>
        <div className='grid gap-6 w-full max-w-screen-2xl grid-cols-12'>
          <div className='col-span-9'>
            <GenericTextfield label='Buscar aplicación' />
          </div>
          <Button
            variant='contained'
            className='col-span-3'
            onClick={openmodal}
          >
            Agregar aplicación
          </Button>
        </div>
        <CardAppsByCompany appsByCompany={appsByCompany} />
      </LoadingError>
    </div>
  )
}

export default ViewAppsByCompany
