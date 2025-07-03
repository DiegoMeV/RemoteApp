import { ClassicIconButton } from '@/lib'
import { AccessControl } from '@/libV4'
import { DocumentScanner, Settings } from '@mui/icons-material'

const OptionsInVersionsTable = ({ params, handleEditVersion, downloadTemplate }) => {
  return (
    <div className='flex w-full justify-evenly items-center'>
      <ClassicIconButton
        title='Descargar'
        onClick={(event) => {
          event.stopPropagation()
          downloadTemplate({ idTemplate: params?.idPlantilla, idVersion: params?.id }, true)
        }}
        color='secondary'
      >
        <DocumentScanner />
      </ClassicIconButton>
      <AccessControl privilege='documentos.plantillas.editar_plantillas'>
        <ClassicIconButton
          title='Opciones'
          onClick={(event) => handleEditVersion(event, params)}
          color='secondary'
        >
          <Settings />
        </ClassicIconButton>
      </AccessControl>
    </div>
  )
}

export default OptionsInVersionsTable
