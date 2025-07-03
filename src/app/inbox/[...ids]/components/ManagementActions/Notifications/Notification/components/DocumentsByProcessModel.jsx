import { ValueListGlobal, useGetDocument } from '@/lib'
import { columnsToNotificationVL } from '../funcs'
import { useStoreActions } from 'easy-peasy'

const DocumentsByProcessModel = ({
  idProcess,
  documentProcessModal,
  selectDocOfValueList,
  arrayOfFiles,
}) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const columns = columnsToNotificationVL({ setPreviewer })

  const { data: docsByActivity, isFetching: loadingDocsByActivity } = useGetDocument({
    qry: `/${idProcess}/proceso`,
    enabled: documentProcessModal.show,
    refetchOnMount: 'always',
  })

  const toggleDisabled = (params) => {
    const isMatch = arrayOfFiles?.find((doc) => {
      return doc?.id === params?.row?.id
    })
    return isMatch ? true : false
  }

  return (
    <ValueListGlobal
      title='Documentos del proceso'
      openOptions={documentProcessModal}
      rows={docsByActivity?.data ?? []}
      columns={columns ?? []}
      shouldClose={false}
      toggleDisabled={toggleDisabled}
      initialState={{
        pagination: { paginationModel: { pageSize: 50 } },
        pinnedColumns: {
          right: ['prev', 'options'],
        },
      }}
      loading={loadingDocsByActivity}
      selectedOption={selectDocOfValueList}
    />
  )
}

export default DocumentsByProcessModel
