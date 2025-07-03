import { ErrorPage, Loading, NoAccessCard, useGetProvince } from '@/lib'
import { ViewEditionProvince } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionProvince = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoProvince,
    isLoading,
    isError,
  } = useGetProvince({ qry: `/${idEdition}`, enabled: idEdition !== 'new' })
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <AccessControl
          privilege={
            idEdition === 'new'
              ? 'cgr.alertas.crear_departamentos'
              : 'cgr.alertas.editar_departamentos'
          }
          nodeContent={<NoAccessCard />}
        >
          <ViewEditionProvince
            infoProvince={infoProvince}
            idEdition={idEdition}
          />
        </AccessControl>
      )}
    </>
  )
}

export default EditionProvince
