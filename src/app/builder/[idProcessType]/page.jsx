import { useStoreActions } from 'easy-peasy'
import { ErrorPage, Loading, NoAccessCard, useTypeProcessInfo } from '@/lib'
import { WithAuth } from '@/app/middleware'
import { ViewConstructor } from './views'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const Builder = () => {
  const params = useParams()
  const setTypeProcessSelected = useStoreActions(
    (actions) => actions.reactFlowState.setTypeProcessSelected
  )
  const setVariationParams = useStoreActions((actions) => actions.reactFlowState.setVariationParams)

  const { idProcessType } = params

  setTypeProcessSelected({ id: idProcessType })

  useEffect(() => {
    setVariationParams({
      builderService: 'urlProcess',
      byActionTypes: 'process',
    })
  }, [])

  const {
    data: infoTypeProcess,
    isLoading: loadingTypeProcess,
    isError,
    isSuccess,
  } = useTypeProcessInfo({ baseKey: 'urlProcess' })

  return (
    <WithAuth>
      <AccessControl
        privilege='procesos.tipos_procesos.parametrizar'
        nodeContent={<NoAccessCard />}
      >
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
      </AccessControl>
    </WithAuth>
  )
}

export default Builder
