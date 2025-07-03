import { useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib/api'
import { BackdropLoading, CustomModal, GenericForm, SquareIconButton, useBoolean } from '@/lib/ui'
import { Add } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { inputFolder, inputForFolderCreation } from './funcs'
import { useStoreState } from 'easy-peasy'

const FolderManagementSIGEDOC = ({
  form,
  sigedocData,
  disabled,
  hiddenBtnCreateFolder = false,
}) => {
  const userData = useStoreState((state) => state.user.userData)

  const seriesForm = form?.watch('serie')

  const buildTRDComplete = `${seriesForm?.codigo}`

  const validation = !!seriesForm?.codigo

  const folderValue = form?.watch('folder')

  const formFolder = useForm({
    defaultValues: {
      autor: {
        identificacion: {
          numero: userData?.documentId ?? '9999999999',
        },
      },
      serie: { codigo: buildTRDComplete },
      fechaInicial: '',
      nombre: '',
    },
  })

  const {
    data: folders,
    isFetching: loadingFolders,
    refetch: refetchFolders,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    url: `/SIGEDOC/consultar-carpetas/${buildTRDComplete}`,
    enabled: validation,
  })

  useEffect(() => {
    if (!sigedocData?.idFolder) return

    if (!folders?.data?.Carpetas) return

    const idFolder = sigedocData?.idFolder

    const defaultFolder = folders?.data?.Carpetas?.find((folder) => folder?.idCarpeta === idFolder)

    form?.setValue('folder', defaultFolder)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders, folders?.data, sigedocData])

  const modalFolder = useBoolean()
  const handleAppend = () => {
    modalFolder?.handleShow()
  }

  useEffect(() => {
    formFolder?.setValue('serie.codigo', buildTRDComplete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildTRDComplete])

  const onSuccessFolder = (response) => {
    if (!response?.success) {
      toast.error('Error al crear el expediente')
      return
    }
    toast.success('Expediente creado con éxito')
    refetchFolders()
    modalFolder?.handleShow()
  }

  const onErrorEvent = () => toast.error('Error al crear el expediente')

  const { mutateAsync: createFolder, isPending: loadingCreateFolder } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgrInt',
    isCompanyRequest: true,
    url: `/SIGEDOC/crear-carpeta`,
    onSuccess: onSuccessFolder,
    onError: onErrorEvent,
  })

  const INPUTS_CREATE_FOLDER = inputForFolderCreation(disabled)
  const INPUT_FOLDER = inputFolder({ folders, loadingFolders, disabled })

  const onSubmit = (data) => {
    createFolder({ body: data })
  }

  const actions = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: () => {
        formFolder?.setValue('nombre', '')
        formFolder?.setValue('fechaInicial', '')
        modalFolder?.handleShow()
      },
    },
    {
      label: 'Guardar',
      variant: 'contained',
      type: 'submit',
    },
  ]

  return (
    <>
      <BackdropLoading loading={loadingCreateFolder || loadingFolders} />
      <Grid
        item
        xs={6}
        sm={6}
      >
        <GenericForm
          inputs={INPUT_FOLDER}
          control={form?.control}
        />
      </Grid>
      {!hiddenBtnCreateFolder && (
        <Grid
          item
          xs={12}
          sm={12}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <SquareIconButton
            text={'Crear expediente'}
            tooltip={'Crear expediente'}
            IconComponent={<Add />}
            onClick={handleAppend}
            sx={{ width: '250px', minWidth: '200px' }}
            disabled={disabled || folderValue}
          />
        </Grid>
      )}
      {modalFolder?.show && (
        <CustomModal
          title={'Creación de Expediente'}
          onSubmit={formFolder?.handleSubmit(onSubmit)}
          open={modalFolder?.show}
          handleClose={modalFolder?.handleShow}
          modalType='form'
          size='md'
          height='200px'
          actions={actions}
        >
          <Grid
            container
            spacing={2}
          >
            <GenericForm
              inputs={INPUTS_CREATE_FOLDER}
              control={formFolder?.control}
            />
          </Grid>
        </CustomModal>
      )}
    </>
  )
}

export default FolderManagementSIGEDOC
