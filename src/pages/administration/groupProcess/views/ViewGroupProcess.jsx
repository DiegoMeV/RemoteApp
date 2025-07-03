import { BasicTitle, useQueryDynamicApi } from '@/libV4'
import { AddCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import { AplicationsList } from '../components'

const ViewGroupProcess = () => {
  const {
    data: dataApplication,
    isFetching: isFetchingApplication,
    isError: errorApplication,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: '/process-type-groups/full-info',
  })

  const userData = useStoreState((state) => state.user.userData)

  const isSuperSayayin = userData?.superSaiyayin

  const navigate = useNavigate()

  const props = {
    dataApplication: dataApplication?.data,
    isLoading: isFetchingApplication,
    isError: errorApplication,
  }

  return (
    <main>
      <BasicTitle
        title='Bandeja'
        className={'justify-between py-7 px-5'}
      >
        {isSuperSayayin && (
          <IconButton
            title='Agregar aplicación'
            onClick={() => navigate('/administration/groupProcess/applications')}
          >
            <AddCircle />
          </IconButton>
        )}
      </BasicTitle>
      <AplicationsList {...props} />
    </main>
  )
}

export default ViewGroupProcess
