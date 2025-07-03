import { useGetProcess } from '@/lib'
import { ViewActivitySelection } from './views'
import { useParams } from 'react-router-dom'

const SelectActivity = () => {
  const { idProcess, idActivity } = useParams()

  const {
    data: suggestedActivities,
    isLoading,
    isError,
  } = useGetProcess({ qry: `/${idProcess}/suggested-activities/${idActivity}` })

  return (
    <ViewActivitySelection
      suggestedActivities={suggestedActivities}
      isLoading={isLoading}
      isError={isError}
      ids={[idProcess, idActivity]}
    />
  )
}

export default SelectActivity
