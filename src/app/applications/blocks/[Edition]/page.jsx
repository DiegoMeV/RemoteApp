import { NoAccessCard, useListBlocksInfo } from '@/lib'
import { ViewEditionBlock } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionBlocks = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoBlock,
    isFetching,
    isError,
  } = useListBlocksInfo({ enabled: idEdition !== 'new', qry: `/${idEdition}` })

  return (
    <AccessControl
      privilege={idEdition === 'new' ? 'cgr.alertas.crear_bloques' : 'cgr.alertas.editar_bloques'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionBlock
        infoBlock={infoBlock}
        isLoading={isFetching}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionBlocks
