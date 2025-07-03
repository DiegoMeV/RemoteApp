import { columnsManagementDocs, TableAddRows, useApisActors } from '@/app/inbox/components'
import { useBoolean } from '@/lib'
import { usePersonalInputs } from '@/pages/pqrsdf/registry/registryTypeProcess/components/step1/funcs'
import { populationInputs } from '@/pages/pqrsdf/registry/registryTypeProcess/components/step2/funcs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onSubmitModal, useEventsHandler } from './hook'
import { getValidateInputs } from './func'
import { useStoreActions } from 'easy-peasy'

const ViewStep1 = ({ idProcess, form }) => {
  const formModal = useForm()
  const columns = columnsManagementDocs()
  const handlerModal = useBoolean()
  const [actorsInfo, setActorsInfo] = useState([])
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const {
    getProcessActor,
    createActor,
    editActor,
    deleteActor,
    loadingActors,
    loadingHandlerActor,
  } = useApisActors({
    idProcess,
    formModal,
    handlerModal,
    setActorsInfo,
    form,
    typeActor: 'REMITENTE',
  })

  const { personalData, arrayModals, errorLovs, loadingInputs } = usePersonalInputs({
    form: formModal,
  })
  const inputsPopulationPQRSDF = populationInputs({ form: formModal })

  useEventsHandler({
    formModal,
    personalData,
    inputsPopulationPQRSDF,
    idProcess,
    getProcessActor,
    errorLovs,
  })
  const handleSubmit = () => {
    onSubmitModal({
      formModal,
      createActor,
      idProcess,
      editActor,
    })
  }
  const handleDelete = (id) => {
    deleteActor({ qry: `/${id}` })
  }

  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)
  const additionalData = actorsInfo?.map((item) => ({
    ...item.actorData?.additionalData,
    id: item.id,
  }))
  const validateInputs = getValidateInputs({
    formModal,
    inputsPopulationPQRSDF,
    setConfirmAlertProps,
    personalData,
  })
  return (
    <TableAddRows
      columns={columns}
      inputsList={[
        validateInputs[0],
        ...(formModal?.watch('isAnonymous') === 'N' ? personalData : []),
        validateInputs[1],
        ...(formModal?.watch('authSensibleData') === 'Y' ? inputsPopulationPQRSDF : []),
      ]}
      loadingInputs={loadingInputs || loadingActors}
      loadingHandlers={loadingHandlerActor}
      formModal={formModal}
      infoModal={infoModal}
      handlerModal={handlerModal}
      onSubmit={handleSubmit}
      defaultRows={additionalData}
      handleDelete={handleDelete}
      nameOption='remitente'
    />
  )
}

export default ViewStep1
