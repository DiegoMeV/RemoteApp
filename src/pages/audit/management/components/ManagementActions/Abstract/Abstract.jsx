import { DescriptionOutlined } from '@mui/icons-material'
import { DynamicSection, InformationSection } from '.'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'
import { BackdropLoading, CustomAccordion, useMutationDynamicBaseUrl } from '@/libV4'
import { useState } from 'react'

const Abstract = ({
  dataManagement,
  idProcess,
  activityToCreate,
  setActivityToCreate,
  actualActivity,
  setActualActivity,
}) => {
  const { processInfo, activityInfo } = dataManagement

  const [resumeText, setResumeText] = useState(
    activityInfo?.[0]?.description?.trim() !== '' && activityInfo?.[0]?.description
      ? activityInfo?.[0]?.description?.trim()
      : processInfo?.description?.trim() !== '' && processInfo?.description
      ? processInfo?.description
      : ''
  )

  const { mutateAsync: postAnonymActivity, isPending: isPendingAnonymActivity } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/processes/${idProcess}/activities`,
      onSuccess: (response) => {
        toast.success('Actividad guardada correctamente')
        setActualActivity(response?.data?.id)
      },
      onError: (error) => {
        toast.error(error?.message ?? 'Error al guardar la actividad')
      },
    })

  return (
    <CustomAccordion
      title='Resumen'
      icon={<DescriptionOutlined color='primary' />}
      accordionprops={{
        defaultExpanded: true,
      }}
    >
      <BackdropLoading loading={isPendingAnonymActivity} />
      <div className='grid grid-cols-12 gap-2 p-2 backgroundwhite1 rounded-md'>
        <div className='col-span-12 md:col-span-8 grid grid-cols-12 gap-2'>
          <InformationSection
            dataManagement={dataManagement}
            idProcess={idProcess}
            activityToCreate={activityToCreate}
            setActivityToCreate={setActivityToCreate}
            actualActivity={actualActivity}
          />
        </div>
        <div className='xs:col-span-12 md:col-span-4'>
          <DynamicSection
            idProcess={dataManagement?.processInfo?.[0]?.id}
            processInfo={dataManagement?.processInfo?.[0]}
            activityInfo={activityInfo}
            resumeText={resumeText}
            setResumeText={setResumeText}
          />
        </div>
      </div>
      <div className='flex justify-end pt-2'>
        <Button
          variant='contained'
          disabled={actualActivity}
          onClick={() => {
            postAnonymActivity({
              body: {
                idTask: activityToCreate?.id,
              },
            })
          }}
          sx={{
            minWidth: '100px',
          }}
        >
          Guardar
        </Button>
      </div>
    </CustomAccordion>
  )
}

export default Abstract
