import { BackdropLoading } from '@/lib'
import { Box, Typography } from '@mui/material'
import { BasicDataInputs } from './basicDataAlert'
import { VariablesByBlock } from './blocks'
import { RegionAlerts } from './regionAlert'
import ButtonsForm from './ButtonsForm'
import { UploadFile } from './uploadFiles'
import { sxContainer } from '@/app/applications/styles'
import ContractAffected from './contractAffected/ContractAffected'
import AlertManagementProcesses from './alertManagementProcesses/AlertManagementProcesses'
import { SentAlerts } from './sentAlerts'
import { RegionContract } from './regionContract'
import { SGDEA } from './SGDEA'

const ViewStepsUpdateAlert = ({
  handleSubmit,
  loadingCreateAlert,
  loadingUpdateAlert,
  onSubmit,
  control,
  setValue,
  infoAlert,
  blocksByModel,
  errors,
  handleBack,
  errorInfo,
  loadingVars,
  idEdition,
  watch,
  isView,
}) => {
  const renderContractAffected = watch('tipo_alerta')

  return (
    <Box
      sx={sxContainer}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={loadingCreateAlert || loadingUpdateAlert || loadingVars} />
      <BasicDataInputs
        control={control}
        setValue={setValue}
        infoAlert={infoAlert}
        idEdition={idEdition}
        watch={watch}
        isView={isView}
      />
      {infoAlert ? (
        <>
          {blocksByModel?.data.map((block, index) => (
            <>
              <VariablesByBlock
                key={index}
                blockInfo={block}
                control={control}
                setValue={setValue}
                isView={isView}
              />
            </>
          ))}
          <UploadFile
            infoAlert={infoAlert}
            isView={isView}
          />
          {renderContractAffected == 'ALERTA CONTRACTUAL' ||
          renderContractAffected == 'ALERTA PRECONTRACTUAL' ? (
            <>
              <ContractAffected
                idAlert={infoAlert?.id}
                setValue={setValue}
                watch={watch}
                isView={isView}
              />
              <RegionContract idAlert={infoAlert?.id} />
            </>
          ) : (
            <RegionAlerts
              infoAlert={infoAlert}
              isView={isView}
            />
          )}
          <AlertManagementProcesses idAlerta={infoAlert?.id} />
          <SentAlerts idEdition={infoAlert?.id} />
          {infoAlert?.sgdea_numero_expediente && <SGDEA infoAlert={infoAlert} />}
        </>
      ) : null}
      {errors?.variables && (
        <Box
          display='flex'
          width='100%'
          justifyContent='flex-end'
          mt='20px'
        >
          <Typography
            color='error'
            variant='body1'
          >
            <strong>Error:</strong> En el bloque <em>{errorInfo?.bloques_datos_nombre}</em>, la
            variable <em>{errorInfo?.variable_nombre}</em> es requerida.
          </Typography>
        </Box>
      )}
      {isView ? null : <ButtonsForm handleBack={handleBack} />}
    </Box>
  )
}

export default ViewStepsUpdateAlert
