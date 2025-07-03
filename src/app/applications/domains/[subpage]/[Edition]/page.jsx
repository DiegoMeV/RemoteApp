import { NoAccessCard, useGetDomains } from '@/lib'
import { ViewEditionResource } from './views'
import { privileges } from '../constants'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionResource = () => {
  const params = useParams()
  const subPage = params?.subpage || ''
  const idEdition = params?.idEdition || undefined
  const {
    data: infoDomain,
    isLoading,
    isError,
  } = useGetDomains({ enabled: idEdition !== 'new', qry: `/${idEdition}` })
  return (
    <AccessControl
      privilege={
        idEdition === 'new'
          ? `cgr.alertas.crear_${privileges[subPage]}`
          : `cgr.alertas.editar_${privileges[subPage]}`
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionResource
        infoDomain={infoDomain}
        subPage={subPage}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionResource
