import { GenericAlertForm } from '@/app/applications/components'

import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { generalForm } from '@/app/applications/constants'
import { conditionalRequest, useUpdateRequest } from '../funcs'

const FormContractType = ({ infoContractsTypes, idEdition, pathBack, handleClose }) => {
  const navigate = useNavigate()
  const typesContractsValues = infoContractsTypes?.data?.[0] || {}
  const state = infoContractsTypes?.data?.[0]?.activo === 'N' ? false : true
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: typesContractsValues?.nombre,
      activo: state,
      descripcion: typesContractsValues?.descripcion,
    },
  })
  const { createTypeContract, editTypeContract, loadingUpdate } = useUpdateRequest({
    idContractType: idEdition,
    pathBack,
    handleClose,
  })

  const onSubmit = async (data) => {
    await conditionalRequest(data, editTypeContract, createTypeContract, idEdition)
  }

  const onClickCancel = () => {
    if (pathBack) {
      navigate(pathBack)
    }
    if (handleClose) {
      handleClose()
    }
  }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={generalForm}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={onClickCancel}
      />
    </>
  )
}

export default FormContractType
