import { TitleAlerts } from '@/app/applications/components'
import { StepsToCreateAModel } from '../components'
import { ErrorPage } from '@/lib'

const ViewEditingModel = ({ infoModels, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <isLoading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación de modelo' : 'Edición de modelo'}
            backpath='/applications/models'
          />
          <StepsToCreateAModel
            infoModels={infoModels}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditingModel
