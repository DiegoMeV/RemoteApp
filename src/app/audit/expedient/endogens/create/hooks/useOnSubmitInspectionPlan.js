import toast from 'react-hot-toast'

const useOnSubmitInspectionPlan = ({
  activeStep,
  idInspectionPlan,
  createInspectionPlan,
  editInspectionPlan,
  setActiveStep,
  setModalOpen,
}) => {
  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { idStartPeriod, idPeriod, ...restData } = data
    const filterData = Object.fromEntries(
      Object.entries(restData).filter(([, value]) => value !== null)
    )
    if (activeStep === 0 && idInspectionPlan === null) {
      createInspectionPlan({ body: { module: 'X', dataSourceType: 'INTERNAL', ...filterData } })
    }
    if (activeStep === 0 && idInspectionPlan !== null) {
      editInspectionPlan({ qry: `/${idInspectionPlan}`, body: { ...filterData } })
    }
    if (activeStep === 1) {
      //Verify if percentage is 100
      const totalPercentage = data.rows.reduce((acc, row) => acc + row.percentage, 0)
      if (totalPercentage !== 100) {
        toast.error('La suma de los porcentajes debe ser 100')
        return
      }
      setActiveStep(2)
    }
    if (activeStep === 2) {
      setModalOpen(true)
    }
  }
  return onSubmit
}

export default useOnSubmitInspectionPlan
