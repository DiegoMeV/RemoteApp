import {
  BackdropLoading,
  CustomModal,
  CustomToolbarDatagrid,
  ErrorPage,
  GenericForm,
  GenericTable,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { AddCircle } from '@mui/icons-material'
import { companyParamsColumns } from '../funcs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import toast from 'react-hot-toast'

const ParamsTable = ({ idCompany }) => {
  const [selectedParam, setSelectedParam] = useState({})

  const editionModal = useBoolean(null, {
    icon: 'warning',
    title: '¿Estás seguro de cancelar?',
  })

  const form = useForm({})

  useEffect(() => {
    if (!selectedParam?.isNew) {
      const defaultValue = {
        paramName: selectedParam?.paramName,
        paramValue: selectedParam?.paramValue,
        paramKey: selectedParam?.paramKey,
      }
      form.reset(defaultValue)
      return
    }
    form.reset()
  }, [selectedParam])

  const handleEdit = (row) => {
    setSelectedParam(row)
    editionModal.handleShow()
  }

  const columns = companyParamsColumns(handleEdit)

  const {
    data: globalParams,
    isFetching: loadingGlobalParams,
    isError: errorGlobalParams,
    refetch: refetchGlobalParams,
  } = useQueryDynamicApi({
    isCompanyRequest: false,
    baseKey: 'urlApps',
    url: `/${idCompany}/global-params`,
  })

  const { mutateAsync: modifyGlobalParams, isPending: modifyingGlobalParams } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: false,
      baseKey: 'urlApps',
      url: `/${idCompany}/global-params`,
      onSuccess: () => {
        toast.success('Parámetro guardado con éxito')
        refetchGlobalParams?.()
        editionModal.handleShow()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al guardar el parámetro')
      },
    })

  const onSubmit = (data) => {
    if (selectedParam?.isNew) {
      modifyGlobalParams({ body: data })
      return
    }
    modifyGlobalParams({ body: data, methodBody: 'put', qry: `/${selectedParam?.id}` })
  }

  return errorGlobalParams ? (
    <ErrorPage />
  ) : (
    <>
      <GenericTable
        rows={globalParams?.data ?? []}
        columns={columns}
        toolbar={CustomToolbarDatagrid}
        loading={loadingGlobalParams}
        toolbarProps={{
          buttons: [
            {
              icon: <AddCircle />,
              title: 'Agregar parámetro',
              onClick: () => handleEdit({ isNew: true }),
            },
          ],
        }}
        sx={{
          height: 'calc(100vh - 300px)',
        }}
      />
      {editionModal.show && (
        <CustomModal
          open={editionModal.show}
          handleClose={() => editionModal.handleShowConfirm()}
          modalType='form'
          onSubmit={form.handleSubmit(onSubmit)}
          title={
            selectedParam.isNew
              ? 'Agregar parámetro'
              : `Edición de parámetro - ${selectedParam.paramName}`
          }
          actions={[
            { label: 'Cancelar', onClick: () => editionModal.handleShowConfirm(), color: 'error' },
            { label: 'Guardar', type: 'submit' },
          ]}
        >
          <BackdropLoading loading={modifyingGlobalParams} />
          <Grid
            container
            spacing={2}
          >
            <GenericForm
              control={form.control}
              inputs={[
                { label: 'Clave', name: 'paramKey', required: true, validate: true, space: 12 },
                { label: 'Nombre', name: 'paramName', required: true, validate: true, space: 12 },
                { label: 'Valor', name: 'paramValue', required: true, validate: true, space: 12 },
              ]}
            />
          </Grid>
        </CustomModal>
      )}
    </>
  )
}

export default ParamsTable
