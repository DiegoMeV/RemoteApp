import { TitleAlerts } from '@/app/applications/components'
import { FormVariables } from '../components'
import { ErrorPage, Loading } from '@/lib'

const ViewEditionVariables = ({ infoVariables, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación de variable' : 'Edición de variable'}
            backpath={`/applications/variables`}
          />
          <FormVariables
            infoVariables={infoVariables}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionVariables
