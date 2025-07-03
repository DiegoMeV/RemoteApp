import { BasicTable, GenericForm } from '@/libV4'
import { inputsModalDebts } from '../../../constants'
import { useForm } from 'react-hook-form'

const DebtConceptsModal = () => {
  const columns = [
    { field: 'concepto', headerName: 'Concepto', width: 200 },
    { field: 'valor', headerName: 'Valor', width: 150 },
  ]
  //   Peticiones aca

  const rows = []

  const form = useForm({
    defaultValues: {},
  })

  const INPUTS_DEBTS = inputsModalDebts({})

  return (
    <div className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      {/* <h2 className='text-lg font-semibold'>{title}</h2> */}
      <BasicTable
        containerProps={{ className: 'h-[450px]' }}
        rows={rows}
        columns={columns}
        // loading={loading}
      />
      <div className='general_form_container'>
        <GenericForm
          control={form?.control}
          inputs={INPUTS_DEBTS}
        />
      </div>
    </div>
  )
}

export default DebtConceptsModal
