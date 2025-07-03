import toast from 'react-hot-toast'
import { Filters } from '../components'
import RegistriesTable from '../../RegistriesTable'

export const useAccordionsExecutiveInfo = ({
  setZoom,
  setCenter,
  form,
  onSubmit,
  infoExecutiveInfo,
  loadingExecutiveInfo,
  errorExecutiveInfo,
  modalExecutiveInfo,
  setRegistryAriSigeDoc,
}) => {
  const accordions = [
    {
      name: 'filtros',
      title: 'Filtros',
      content: (
        <Filters
          setCenter={setCenter}
          setZoom={setZoom}
          form={form}
          onSubmit={onSubmit}
          loadingExecutiveInfo={loadingExecutiveInfo}
        />
      ),
    },
    {
      name: 'tabla',
      title: 'Registros',
      content: (
        <RegistriesTable
          infoExecutiveInfo={infoExecutiveInfo}
          loadingExecutiveInfo={loadingExecutiveInfo}
          modalExecutiveInfo={modalExecutiveInfo}
          setRegistryAriSigeDoc={setRegistryAriSigeDoc}
        />
      ),
    },
  ]
  if (errorExecutiveInfo) {
    toast.error('Error al cargar la información')
  }
  return accordions
}
