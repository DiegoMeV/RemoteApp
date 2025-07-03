import { useQueryDynamicApi } from '@/libV4'
import ViewBasicDataInbox from './ViewBasicDataInbox'

const BasicDataInbox = ({ idProcess }) => {
  const { data: info, isFetching: isLoading } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}?inclOfficeData=true&inclInspectionPlan=true`,
  })

  return (
    <ViewBasicDataInbox
      info={info?.data?.[0]}
      isLoading={isLoading}
      idProcess={idProcess}
    />
  )
}

export default BasicDataInbox
