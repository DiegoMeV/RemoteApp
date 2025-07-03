import { NoAccessCard } from '@/lib'
import { getStepComponents } from '../funcs'
import { FormRethus } from '../components'

const ViewRethus = ({
  activeStep,
  setValue,
  control,
  handleSubmit,
  onSubmit,
  setActiveStep,
  infoGroupProcess,
  isLoading,
  error,
  getValues,
  watch,
  infoProcessSelected,
  idCompany,
  unregister,
  isEditing,
  hasPrivilege,
}) => {
  const stepComponents = getStepComponents(
    control,
    setValue,
    infoGroupProcess,
    getValues,
    watch,
    infoProcessSelected,
    idCompany,
    unregister,
    isEditing
  )
  const props = {
    isLoading,
    infoGroupProcess,
    error,
    activeStep,
    handleSubmit,
    onSubmit,
    stepComponents,
    setActiveStep,
  }
  return (
    <>
      {isEditing ? (
        hasPrivilege ? (
          <FormRethus
            editing={true}
            {...props}
          />
        ) : (
          <NoAccessCard />
        )
      ) : (
        <FormRethus {...props} />
      )}
    </>
  )
}

export default ViewRethus
