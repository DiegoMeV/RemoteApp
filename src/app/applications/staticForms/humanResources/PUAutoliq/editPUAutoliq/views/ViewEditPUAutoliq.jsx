import {
  BackdropLoading,
  BasicTitle,
  encodeKeys,
  encodeString,
  formatDayjsProperties,
  getFormValuesFiltered,
  isEmpty,
  iterationNumber,
} from '@/libV4'
import { DetailTable, FormPUAtoliq } from '../components'
import { useStoreActions } from 'easy-peasy'
import { useCallMultipleOracleReports, useFormHandlers } from '../hooks'
import toast from 'react-hot-toast'
import { getPUAutoliqDif } from '../funcs'
import { payrollReports } from '../constants'
import { savableFields } from '../constants'
import { useEffect, useMemo, useState } from 'react'

const ViewEditPUAutoliq = ({
  infoPlanilla,
  form,
  secuence,
  titleForm,
  nit_compania,
  getQueryResult,
  isPendingQuery,
  isNew,
  navigate,
}) => {
  const isPayed = infoPlanilla?.estado === 'P'
  const setVLProps = useStoreActions((actions) => actions.valueList.setVLProps)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const numIterations = iterationNumber()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })

  const {
    handleGetDetail,
    handleGenerateSequence,
    infoDetail,
    setInfoDetail,
    executeAction,
    isExecuting,
  } = useFormHandlers({
    nit_compania,
    getQueryResult,
    form,
    navigate,
    secuence,
    isNew,
    numIterations,
    paginationModel,
  })
  const totalCount = infoDetail?.[0]?.total_count ?? 0

  const diferences = useMemo(
    () => getPUAutoliqDif({ form, infoPlanilla }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form?.formState?.isDirty]
  )
  const arePendingChanges = !isNew && !isEmpty(diferences)

  const handleSave = async () => {
    const diferences = getPUAutoliqDif({ form, infoPlanilla })
    const formatedDiferences = formatDayjsProperties({ obj: diferences, dateKeys: ['fechapag'] })
    const filteredFields = getFormValuesFiltered({ form, array: savableFields })
    const formatedFilteredFields = formatDayjsProperties({
      obj: filteredFields,
      dateKeys: ['fechapag'],
    })

    if (!isNew && !isEmpty(formatedDiferences)) {
      executeAction({
        body: {
          action: encodeString(numIterations, 'update'),
          data: encodeKeys(formatedDiferences, numIterations),
          where: encodeKeys({ secuencia: secuence, nit_compania }, numIterations),
        },
      })
    } else if (isNew && !isEmpty(formatedFilteredFields)) {
      executeAction({
        body: {
          action: encodeString(numIterations, 'insert'),
          data: encodeKeys(formatedFilteredFields, numIterations),
        },
      })
    } else if (isEmpty(formatedDiferences) && !isNew) {
      toast.error('No hay cambios para guardar.')
    }
  }

  const handleConfirmSave = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Guardar cambios',
      content: `¿Está seguro que desea guardar cambios?`,
      onConfirm: () => handleSave(),
    })
  }

  const { handleCallMultipleOracleReports } = useCallMultipleOracleReports({
    reportNames: payrollReports,
    queryParams: `extra_unaplanilla=${secuence}`,
  })

  useEffect(() => {
    if (secuence) {
      handleGetDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel])

  return (
    <>
      <BackdropLoading loading={isPendingQuery} />
      <BasicTitle
        title={`${isNew ? 'Creación de planilla' : titleForm}`}
        backpath='/applications/staticForms/humanResources/PUAutoliq'
      />
      <div className='p-5 backgroundGray1 flex flex-col gap-5'>
        <FormPUAtoliq
          form={form}
          nit_compania={nit_compania}
          navigate={navigate}
          setVLProps={setVLProps}
          setInfoDetail={setInfoDetail}
          getQueryResult={getQueryResult}
          handleGetDetail={handleGetDetail}
          handleGenerateSequence={handleGenerateSequence}
          handleConfirmSave={handleConfirmSave}
          handleCallOracleReport={handleCallMultipleOracleReports}
          secuence={secuence}
          isNew={isNew}
          isPayed={isPayed}
          isExecuting={isExecuting}
          arePendingChanges={arePendingChanges}
        />
        <DetailTable
          infoDetail={infoDetail}
          totalCount={totalCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </div>
    </>
  )
}

export default ViewEditPUAutoliq
