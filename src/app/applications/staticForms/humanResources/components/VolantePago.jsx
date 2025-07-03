import FormComponent from '@/app/applications/dynamicForm/[idComponent]/[...formComponent]/page'

const VolantePago = ({ componentForm, infoVolante }) => {
  const componentParams = {
    periodo: infoVolante?.periodo,
    nomina: infoVolante?.nomina,
    tercero: infoVolante?.tercero,
    tercero_type: infoVolante?.tercero_type,
    nit_compania: infoVolante?.nit_compania,
  }
  const componentProps = {
    formComponent: '337e2bb9-8c36-4f2d-b0b9-2c30492497d9',
    idForm: 'c55835bf-9aa4-41e0-b743-7cc8173b7b9d',
    idApplication: '994aefa5-414b-4c69-9bda-d44089c64c1b',
  }
  return (
    <FormComponent
      componentProps={componentProps}
      componentParams={componentParams}
      componentForm={componentForm}
    />
  )
}

export default VolantePago
