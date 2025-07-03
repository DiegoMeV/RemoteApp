import { TableComplainantOrAccused, useGetActorsFamilyServices } from '../../FormFamilyServices'

const StepThree = ({ step, openModal, formModal, setRowParams, setValidationComplainant, ids }) => {
  const { petitioners, loadingPetitioners, errorPetitioners } = useGetActorsFamilyServices(
    ids?.idProcess
  )

  return (
    <TableComplainantOrAccused
      actors={petitioners}
      loadingActors={loadingPetitioners}
      errorActors={errorPetitioners}
      step={step}
      key={step}
      type='PETICIONARIO'
      openModal={openModal}
      formModal={formModal}
      setRowParams={setRowParams}
      setValidationComplainant={setValidationComplainant}
    />
  )
}

export default StepThree
