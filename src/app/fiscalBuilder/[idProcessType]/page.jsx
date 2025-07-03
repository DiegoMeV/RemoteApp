import { useStoreActions } from 'easy-peasy'
import { ErrorPage, Loading, useTypeProcessInfo } from '@/lib'
import { WithAuth } from '@/app/middleware'
import { ViewConstructor } from '@/app/builder/[idProcessType]/views'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const FiscalBuilder = () => {
  const setTypeProcessSelected = useStoreActions(
    (actions) => actions.reactFlowState.setTypeProcessSelected
  )
  const setVariationParams = useStoreActions((actions) => actions.reactFlowState.setVariationParams)
  const { idProcessType } = useParams()

  setTypeProcessSelected({ id: idProcessType })

  useEffect(() => {
    setVariationParams({
      builderService: 'urlFiscalizacion',
      byActionTypes: 'fiscal',
    })
  }, [])

  const {
    data: infoTypeProcess,
    isLoading: loadingTypeProcess,
    isError,
    isSuccess,
  } = useTypeProcessInfo({ baseKey: 'urlFiscalizacion' })

  return (
    <WithAuth>
      {/* TODO */}
      {/* <AccessControl
        privilege='procesos.tipos_procesos.parametrizar'
        nodeContent={<NoAccessCard />}
      > */}
      {loadingTypeProcess ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ViewConstructor
          infoTypeProcess={infoTypeProcess}
          isSuccess={isSuccess}
        />
      )}
      {/* </AccessControl> */}
    </WithAuth>
  )
}

export default FiscalBuilder
