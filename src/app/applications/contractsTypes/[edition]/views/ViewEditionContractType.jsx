import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormContractType } from '../components'

const ViewEditionContractType = ({ infoContractsTypes, isLoading, isError, idEdition }) => {
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
              idEdition === 'new'
                ? 'Creación de modalidad de contratación'
                : 'Edición de modalidad de contratación'
            }
            backpath={`/applications/contractsTypes`}
          />
          <FormContractType
            infoContractsTypes={infoContractsTypes}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionContractType
