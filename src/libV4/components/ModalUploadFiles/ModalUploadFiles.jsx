import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getStepComponents, onSubmitForm, usePushFileData } from './funcs'
import { Box } from '@mui/material'
import { ButtonsSubmit } from './components'
import { BackdropLoading, BackdropLoadingLabel, StepperRequirements } from '@/lib'

const ModalUploadFiles = ({ closeModal, infoTypeDoc, body, pushUrl, pushBase }) => {
  const stepsForMedMag = [
    'Seleccionar archivo',
    'Vista previa del archivo',
    'Correspondencia de columnas',
    'Verificación de datos',
    'importación de datos',
  ]
  const [activeStep, setActiveStep] = useState(0)
  const [rowsFile, setRowsFile] = useState([])
  const [columnsFile, setColumnsFile] = useState([])

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(null)
  const { ...form } = useForm()

  const { massiveInsert } = usePushFileData(
    setActiveStep,
    setErrors,
    errors,
    setLoadingProgress,
    body,
    pushUrl,
    pushBase
  )
  const onSubmit = onSubmitForm({
    activeStep,
    setColumnsFile,
    setRowsFile,
    setActiveStep,
    errors,
    massiveInsert,
    setLoading,
    closeModal,
    form,
    infoTypeDoc,
  })

  const stepComponents = getStepComponents({
    form,
    rowsFile,
    columnsFile,
    infoTypeDoc,
    errors,
    setErrors,
  })

  return (
    <>
      {!!loadingProgress && loadingProgress !== 100 && (
        <>
          <BackdropLoadingLabel
            value={loadingProgress}
            label={'Insertando datos...'}
          />
        </>
      )}
      {!!loading && !loadingProgress && <BackdropLoading loading={loading} />}
      <StepperRequirements
        steps={stepsForMedMag}
        step={activeStep}
        stepperContentProps={{ orientation: 'horizontal' }}
        sxStepper={{
          //Conector styles
          '& .MuiStepConnector-line': {
            borderColor: 'rgba(0, 0, 0, 0.42)',
            borderWidth: '2px',
            margin: '2%',
          },
          //Icon styles
          '& .MuiStepIcon-root': {
            fontSize: '2rem',
          },
        }}
      />
      <Box
        bgcolor='backgroundGrey1'
        borderRadius='10px'
        border='1px solid #0000000f'
        p={2}
        mt={2}
      >
        {stepComponents[activeStep]}
        <ButtonsSubmit
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  )
}
export default ModalUploadFiles
