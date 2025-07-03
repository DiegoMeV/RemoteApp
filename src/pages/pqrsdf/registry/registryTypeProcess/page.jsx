import { StepperContent, useMutationDynamicBaseUrl } from '@/lib'
import { AccountCircle, DriveFolderUpload, ErrorOutline, Visibility } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ButtonsForm,
  PersonalData,
  PopulationInformation,
  ReceptionData,
  ProcessInfo,
} from './components'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { BackdropLoading } from '@/libV4'

const RegistryTypeProcess = () => {
  const [activeStep, setActiveStep] = useState(0)
  const form = useForm()
  const { id, idProcess } = useParams()
  const { mutateAsync: getProcessDataPQRSDF, isPending: loadingDataPQRSDF } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlApps',
      url: `/app-specific/pqrsd/${idProcess}`,
      isCompanyRequest: true,
      companyId: id,
      method: 'GET',
      onSuccess: (e) => {
        if (e?.data?.length > 0) {
          const formData = e.data[0]
          Object.keys(formData).forEach((key) => {
            form.setValue(key, formData[key])
          })
        }
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.error || 'Error al obtener información del plan de inspección'
        )
      },
    })
  const { mutateAsync: insertData, isPending: loadingInsert } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: `/app-specific/pqrsd/${idProcess}`,
    isCompanyRequest: true,
    companyId: id,
    method: 'PUT',
    onSuccess: () => {
      getProcessDataPQRSDF()
      activeStep !== 3 && setActiveStep(activeStep + 1)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al insertar información.')
    },
  })
  useEffect(() => {
    if (idProcess) {
      getProcessDataPQRSDF()
    }
  }, [getProcessDataPQRSDF, idProcess])
  const onSubmit = (data) => {
    if (activeStep === 0) {
      insertData({ body: { isAnonymous: data?.isAnonymous, personalData: data?.personalData } })
    }
    if (activeStep === 1) {
      insertData({
        body: {
          authSensibleData: data?.authSensibleData,
          populationInfo: data?.populationInfo,
        },
      })
    }
    if (activeStep === 2) {
      insertData({
        body: {
          receptionInfo: data?.receptionInfo,
        },
      })
    }
    if (activeStep === 3) {
      insertData({
        body: {
          affair: data?.affair,
          affairDescription: data?.affairDescription,
        },
      })
    }
    // setActiveStep(activeStep + 1)
  }
  const sxStepper = {
    //Conector styles
    '& .MuiStepConnector-root': {
      top: '26px',
    },
    '& .MuiStepConnector-line': {
      borderColor: 'rgba(0, 0, 0, 0.42)',
      borderWidth: '2px',
      marginX: '10%',
    },
    '& .Mui-completed .MuiStepConnector-line': {
      borderColor: 'primary.main',
    },
    '& .Mui-active .MuiStepConnector-line': {
      borderColor: 'primary.main',
    },
  }
  const icons = {
    1: <AccountCircle />,
    2: <ErrorOutline />,
    3: <DriveFolderUpload />,
    4: <Visibility />,
  }
  const stepComponents = [
    <PersonalData
      key='personal-data'
      form={form}
    />,
    <PopulationInformation
      key='population-info'
      form={form}
    />,
    <ReceptionData
      key='reception-data'
      form={form}
    />,
    <ProcessInfo
      key='process-info'
      form={form}
      insertData={insertData}
    />,
  ]

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex flex-col items-center mt-5'
    >
      <div className='flex flex-col w-full justify-center gap-10'>
        <div className='backgroundGray1 rounded-md p-6 shadow-md'>
          <StepperContent
            step={activeStep}
            steps={[
              'Datos personales',
              'Información poblacional',
              'Datos de recepción',
              'Datos de la solicitud',
            ]}
            icons={icons}
            sxStepper={sxStepper}
          />
        </div>
        <BackdropLoading loading={loadingDataPQRSDF || loadingInsert} />
        <div>{stepComponents[activeStep] || null}</div>
        <ButtonsForm
          backPath={'/pqrsdf/registry'}
          endStep={3}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </form>
  )
}

export default RegistryTypeProcess
