import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'

import { EditingContractorsForm } from '../components'

const ViewEditionContractors = ({ idEdition, infoEditing, isError, loadingInfoRow, title }) => {
  return (
    <>
      <TitleAlerts
        title={title}
        backpath={`/applications/contractors/`}
      />
      {loadingInfoRow ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <EditingContractorsForm
          idEdition={idEdition}
          infoEditing={infoEditing}
          pathBack={`/applications/contractors/`}
        />
      )}
    </>
  )
}

export default ViewEditionContractors
