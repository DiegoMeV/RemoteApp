import { useBoolean } from '@/lib'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { columnsManagementDocs, TableAddRows, useApisActors } from '../../components'
import { usePersonalInputs } from '@/pages/pqrsdf/registry/registryTypeProcess/components/step1/funcs'
import { populationInputs } from '@/pages/pqrsdf/registry/registryTypeProcess/components/step2/funcs'
import { getValidateInputs } from '../../RegistryIncomingCorrespondence/components/step1/func'
import { useStoreActions } from 'easy-peasy'

const ViewStep2 = ({ idProcess, form }) => {
  const formModal = useForm()
  const columns = columnsManagementDocs({ copy: true })
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
    typeActor: 'DESTINATARIO',
  })

  const { personalData, arrayModals, errorLovs, loadingInputs } = usePersonalInputs({
    form: formModal,
  })
  const inputsPopulationPQRSDF = populationInputs({ form: formModal })
  const validateInputs = getValidateInputs({
    formModal,
    inputsPopulationPQRSDF,
    setConfirmAlertProps,
    personalData,
  })
  useEffect(() => {
    if (idProcess) {
      getProcessActor({
        qry: '&actorTypeKey=DESTINATARIO',
      })
    }
  }, [getProcessActor, idProcess])

  useEffect(() => {
    if (errorLovs) {
      toast.error('Error al traer los datos de las listas de valores')
    }
  }, [errorLovs])

  const onSubmit = async () => {
    const validation = await formModal?.trigger()
    if (!validation) return
    const data = formModal.getValues()
    if (!data?.isEdit) {
      const newRow = { ...data }
      delete newRow.id
      const bodyActor = {
        actorTypeKey: 'DESTINATARIO',
        actorData: {
          additionalData: newRow,
        },
      }
      createActor({ qry: `/${idProcess}/actors`, body: bodyActor })
      return
    }
    const newRow = { ...data }
    delete newRow.isEdit
    delete newRow.id
    editActor({
      qry: `/${data?.id}`,
      methodBody: 'put',
      body: { actorData: { additionalData: newRow } },
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
      onSubmit={onSubmit}
      defaultRows={additionalData}
      handleDelete={handleDelete}
      nameOption='Destinatario'
    />
  )
}

export default ViewStep2
