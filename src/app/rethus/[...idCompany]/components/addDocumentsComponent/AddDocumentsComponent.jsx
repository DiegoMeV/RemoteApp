import { useActivityInfo, useGetDocument, useQueryDynamicApi } from '@/lib'
import ViewAddDocumentsComponent from './view/ViewAddDocumentsComponent'

const AddDocumentsComponent = ({ setValue, idCompany, infoProcessSelected, control }) => {
  const idProcess = infoProcessSelected?.id
  const idActivity = infoProcessSelected?.pendingActivities?.[0].id
  const {
    data: infoActivity,
    isFetching: loadingActivity,
    isError,
    refetch: refetchInfoProcess,
  } = useActivityInfo({
    idProcess: idProcess,
    idActivity: idActivity,
    idCompany: idCompany,
  })
  const actionsToPerformId = infoActivity?.data?.[0].actionsToPerform?.[0].id
  const idActivityAction = infoActivity?.data?.[0].actionsToPerform?.[0].activityActionData?.id
  const {
    data: elements,
    isFetching: loadingElementActions,
    isError: errorElementActions,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    idCompany: idCompany,
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${actionsToPerformId}`,
  })
  const fileRequired = elements?.data.map((file) => ({
    id: file.id,
    name: file.name,
    required: file.isRequired,
  }))
  const {
    data: docsActivity,
    isFetching: loadingDocsActivity,
    isError: errorDocsActivity,
    refetch: refetchInfoDocs,
  } = useGetDocument({ qry: `/${idActivity}/activity`, idCompany: idCompany })

  return (
    <ViewAddDocumentsComponent
      setValue={setValue}
      fileRequired={fileRequired}
      isPending={loadingActivity || loadingDocsActivity || loadingElementActions}
      infoProcessSelected={infoProcessSelected}
      idCompany={idCompany}
      isError={isError || errorDocsActivity || errorElementActions}
      idTaskAction={actionsToPerformId}
      control={control}
      docsActivity={docsActivity?.data}
      refetchInfoDocs={refetchInfoDocs}
      idActivityAction={idActivityAction}
      idProcess={idProcess}
      refetchInfoProcess={refetchInfoProcess}
    />
  )
}

export default AddDocumentsComponent
