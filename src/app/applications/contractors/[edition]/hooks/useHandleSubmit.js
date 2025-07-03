import { usePutOrPostContractors } from './usePutOrPostContractors'

/**
 * Custom hook to handle form submission.
 *
 * This hook sets up a function that, when called with form data, will attempt to update a contract type.
 * If the update is successful, the user will be redirected to the contracts types page and a success message will be displayed.
 * If the update fails, an error message will be displayed.
 *
 * @param {string} idEdition - The ID of the contract type to update.
 * @returns {Object} The onSubmit function and the loading state.
 * @property {function} onSubmit - The function to call with the form data when the form is submitted.
 * @property {boolean} loadingAction - Whether the update request is currently pending.
 */

export const useHandleSubmit = (idEdition, pathBack, handleClose) => {
  const { putInfoContractor, postInfoContractor, loadingAction } = usePutOrPostContractors(
    idEdition,
    pathBack,
    handleClose
  )
  const onSubmit = (data) => {
    const adaptData = {
      ...data,
      municipio_id: data?.municipioInfo?.id,
      departamento_id: data?.departamentoInfo?.id,
    }
    delete adaptData.municipioInfo
    delete adaptData.departamentoInfo

    if (idEdition === 'new') {
      postInfoContractor(adaptData)
    } else {
      putInfoContractor(adaptData)
    }
  }

  return { onSubmit, loadingAction }
}
