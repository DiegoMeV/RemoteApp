import { TitleAlerts } from '@/app/applications/components'
import { FormVariablesContract } from '../components'
import { ErrorPage, Loading } from '@/lib'

const ViewEditionVariablesContract = ({ infoVariables, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={
              idEdition === 'new' ? 'Creación de variable contrato' : 'Edición de variable contrato'
            }
            backpath={`/applications/variablesContract`}
          />
          <FormVariablesContract
            infoVariables={infoVariables}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionVariablesContract
