import { TitleAlerts } from '@/app/applications/components'
import FormProvince from '../components/FormProvince'

const ViewEditionProvince = ({ infoProvince, idEdition }) => {
  const title = `${infoProvince?.data?.[0]?.nombre || ''}`
  return (
    <>
      <TitleAlerts
        title={`${idEdition}` === 'new' ? 'Creación de departamento' : `Edición de ${title}`}
        backpath={`/applications/ubication/province`}
      />
      <FormProvince
        infoProvince={infoProvince}
        idEdition={idEdition}
      />
    </>
  )
}

export default ViewEditionProvince
