import { useQueryDynamicApi } from '@/lib'
import { ChooseActions } from '.'
import { sortByPosition } from './funcs'

const RenderActions = ({
  ids,
  action,
  refetchManagement,
  form,
  accordionsState,
  setAccordionsState,
  modalForm,
  processInfo,
  dataManagement,
}) => {
  const [idProcess, idActivity] = ids

  const specificAction = action?.actionType === 'BACK_TO_PREV_ACTIVITY'

  const {
    data: elements,
    isLoading: loadingElementActions,
    isError: errorElementActions,
    isFetching: fechingElementActions,
    refetch: refetchElementActions,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${action?.id}`,
    enabled: !!accordionsState?.[action?.id] && !specificAction,
  })

  const loadingElements = loadingElementActions

  const onChangeAccordion = () => {
    setAccordionsState((prevState) => ({
      ...prevState,
      [action?.id]: !prevState[action?.id],
    }))
  }

  return (
    <>
      <ChooseActions
        ids={ids}
        action={action}
        refetchManagement={refetchManagement}
        refetchElementActions={refetchElementActions}
        form={form}
        elementData={sortByPosition(elements?.data)}
        loadingElements={loadingElements}
        errorElements={errorElementActions}
        fechingElementActions={fechingElementActions}
        accordionsState={accordionsState?.[action?.id] ?? false}
        onChangeAccordion={onChangeAccordion}
        modalForm={modalForm}
        processInfo={processInfo}
        specificAction={specificAction}
        dataManagement={dataManagement}
      />
    </>
  )
}

export default RenderActions
