import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormBlock } from '../components'

const ViewEditionBlock = ({ infoBlock, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación de bloque' : 'Edición de bloque'}
            backpath={`/applications/blocks`}
          />
          <FormBlock
            infoBlock={infoBlock}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionBlock
