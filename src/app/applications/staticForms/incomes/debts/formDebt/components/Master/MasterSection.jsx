import { BasicTitle, GenericForm } from '@/libV4'
import { inputsDebt } from '../../constants'

const MasterSection = ({ form }) => {
  return (
    <div className='flex flex-col'>
      <BasicTitle title='Datos del vehículo' />
      <form className='general_form_container formContainer'>
        <GenericForm
          inputs={inputsDebt}
          control={form.control}
        />
      </form>
    </div>
  )
}

export default MasterSection
