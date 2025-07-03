import { useGetProcess } from '@/lib'
import ViewBasicDataInbox from './ViewBasicDataInbox'

const BasicDataInbox = ({ idProcess, showPendingActs = true }) => {
  const { data: info, isLoading } = useGetProcess({
    qry: `/${idProcess}?inclPendingActs=true&inclActors=true&inclOfficeData=true&inclEntitesData=true`,
  })

  return (
    <ViewBasicDataInbox
      info={info?.data?.[0]}
      isLoading={isLoading}
      idProcess={idProcess}
      showPendingActs={showPendingActs}
    />
  )
}

export default BasicDataInbox
