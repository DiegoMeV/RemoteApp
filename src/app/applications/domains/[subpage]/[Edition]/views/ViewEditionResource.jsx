import { TitleAlerts } from '@/app/applications/components'
import { titles } from '../../constants'
import { ErrorPage, Loading } from '@/lib'
import { FormDomain } from '../components'

const ViewEditionResource = ({ subPage, infoDomain, isLoading, isError, idEdition }) => {
  const title = `${infoDomain?.data?.[0]?.nombre || ''}`
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación' : 'Edición'} de ${titles[subPage]} ${title}`}
            backpath={`/applications/domains/${subPage}`}
          />
          <FormDomain
            infoDomain={infoDomain}
            subPage={subPage}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionResource
