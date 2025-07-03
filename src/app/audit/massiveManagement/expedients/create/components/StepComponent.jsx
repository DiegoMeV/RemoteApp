import { AffectedExpedients } from './affectedExpedients'
import { ApplyGenReport } from './applyGenReport'
import { BasicData } from './basicData'
import { InfoExpedients } from './infoExpedients'
import { UploadDocuments } from './uploadDocuments'
import { UploadFile } from './uploadFiles'

const StepComponent = ({
  step,
  form,
  queueInfo,
  setActiveStep,
  idMassiveActivity,
  getMassiveActivitiesQueue,
}) => {
  const stepComponents = {
    0: (
      <BasicData
        form={form}
        queueInfo={queueInfo}
      />
    ),
    1: (
      <UploadDocuments
        form={form}
        setActiveStep={setActiveStep}
      />
    ),
    2: <AffectedExpedients form={form} />,
    3: (
      <UploadFile
        idMassiveActivity={idMassiveActivity}
        form={form}
        setActiveStep={setActiveStep}
      />
    ),
    4: (
      <ApplyGenReport
        idMassiveActivity={idMassiveActivity}
        queueInfo={queueInfo}
        getMassiveActivitiesQueue={getMassiveActivitiesQueue}
      />
    ),
    5: (
      <InfoExpedients
        form={form}
        idMassiveActivity={idMassiveActivity}
        getMassiveActivitiesQueue={getMassiveActivitiesQueue}
        queueInfo={queueInfo}
      />
    ),
  }

  return stepComponents[step] || null
}

export default StepComponent
