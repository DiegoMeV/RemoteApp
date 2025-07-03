import toast from 'react-hot-toast'

export const submitForm = ({
  activeStep,
  setActiveStep,
  idInspectionPlan,
  createInspectionPlan,
  editInspectionPlan,
  generateProcesses,
  setModalOpen,
}) => {
  const onSubmit = (data) => {
    const filterData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== null)
    )
    if (activeStep === 0 && idInspectionPlan === null) {
      createInspectionPlan({ body: { module: 'X', dataSourceType: 'EXTERNAL', ...filterData } })
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
      if (data.rowsCount === 0) {
        setActiveStep(2)
      } else {
        setActiveStep(3)
      }
    }
    if (activeStep === 2) {
      setActiveStep(3)
    }
    if (activeStep === 3) {
      generateProcesses()
    }
    if (activeStep === 4) {
      setModalOpen(true)
    }
  }
  return { onSubmit }
}
