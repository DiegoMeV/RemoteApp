import { Filters } from '../components'
import toast from 'react-hot-toast'
import RegistriesTable from '../../RegistriesTable'

export const useAccordionsManagementReport = ({
  setZoom,
  setCenter,
  form,
  onSubmit,
  infoExecutiveInfo,
  loadingExecutiveInfo,
  errorExecutiveInfo,
  modalManagementReport,
  setInfoRow,
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
          modalExecutiveInfo={modalManagementReport}
          setInfoRow={setInfoRow}
        />
      ),
    },
  ]
  if (errorExecutiveInfo) {
    toast.error('Error al cargar la información')
  }

  return accordions
}
