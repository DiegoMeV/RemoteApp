import { useQueryDynamicApi } from '@/lib'
import { ChooseActions } from '.'

const RenderActions = ({
  ids,
  action,
  refetchManagement,
  form,
  accordionsState,
  setAccordionsState,
  modalForm,
  processInfo,
  activityInfo,
}) => {
  const [idProcess, idActivity] = ids

  const {
    data: elements,
    isLoading: loadingElementActions,
    isError: errorElementActions,
    isFetching: fechingElementActions,
    refetch: refetchElementActions,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${action?.id}`,
    enabled: !!accordionsState?.[action?.id],
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
        elementData={elements?.data ?? []}
        loadingElements={loadingElements}
        errorElements={errorElementActions}
        fechingElementActions={fechingElementActions}
        accordionsState={accordionsState?.[action?.id] ?? false}
        onChangeAccordion={onChangeAccordion}
        modalForm={modalForm}
        processInfo={processInfo}
        activityInfo={activityInfo}
      />
    </>
  )
}

export default RenderActions
