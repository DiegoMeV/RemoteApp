const useOnSubmit = ({
  activeStep,
  setActiveStep,
  idMassiveActivity,
  createMassiveActivity,
  editMassiveActivity,
}) => {
  const onSubmit = (data) => {
    const filterData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== null)
    )
    if (activeStep === 0 && idMassiveActivity === null) {
      createMassiveActivity({ body: { ...filterData } })
    }
    if (activeStep === 0 && idMassiveActivity !== null) {
      editMassiveActivity({ qry: `/${idMassiveActivity}`, body: { ...filterData } })
      if (data?.rowsCount === 0) {
        setActiveStep(1)
        return
      }
      setActiveStep(2)
    }
    if (activeStep === 1) {
      setActiveStep(2)
    }
    if (activeStep === 2) {
      if (data?.action === 'UPLOAD_FILE') {
        setActiveStep(3)
        return
      }
      setActiveStep(4)
    }
    if (activeStep === 3) {
      setActiveStep(4)
    }
    if (activeStep === 4) {
      setActiveStep(5)
    }
  }
  return onSubmit
}

export default useOnSubmit
