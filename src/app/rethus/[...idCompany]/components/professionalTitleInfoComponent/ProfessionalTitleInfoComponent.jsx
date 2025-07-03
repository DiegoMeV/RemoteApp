import ViewFormComponent from '../ViewFormComponent'
import { inputList } from './constant'

const ProfessionalTitleInfoComponent = ({ control, setValue }) => {
  const columnsModal = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      flex: 1,
    },
  ]
  return (
    <ViewFormComponent
      columnsModal={columnsModal}
      inputList={inputList}
      setValue={setValue}
      control={control}
    />
  )
}

export default ProfessionalTitleInfoComponent
