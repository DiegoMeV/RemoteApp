import { ElementContainer } from '../'
import { CustomTextfieldSV, SaveButton } from './'
import { Box, Divider, Typography } from '@mui/material'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import styles from '../styles/Actions.module.css'
import { useSaveFormDataActivities } from './hooks'
import { ResultsAct } from './specificFields'

const SaveForm = ({ action, elementData, ids, processInfo }) => {
  const idAlert = processInfo?.[0]?.processData?.cgrAlertas?.idAlert
  const originOfficeData = processInfo?.[0]?.originOfficeData
  const defaultValues = elementData?.reduce((acc, element) => {
    acc[element.id] = element.activityActionItemData?.variableValue
    return acc
  }, {})
  const [idProcess, idActivity] = ids || []
  const { handleSubmit, control } = useForm({ defaultValues })

  const { modifyItemInformation, loadingItemCreation } = useSaveFormDataActivities(
    idProcess,
    idActivity,
    action
  )

  const onSubmit = async (data) => {
    const keys = Object.keys(data)
    const body = keys
      .filter((input) => data[input] !== undefined && data[input] !== null && data[input] !== '')
      .map((inputs) => {
        const findVariableName = elementData?.find((input) => inputs === input.id)
        return { id: inputs, value: data[inputs], variableName: findVariableName?.variableName }
      })

    await modifyItemInformation({ body: body })
  }

  const onError = () => {}

  const thereIsResultsAct = elementData?.find(
    (element) => element.variableName === 'RESULTADOS_ACTUACION'
  )

  return (
    <>
      <BackdropLoading loading={loadingItemCreation} />
      {elementData?.length > 0 ? (
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.documentContainer}
        >
          <ElementContainer>
            {elementData
              ?.filter((elementAction) => !elementAction.isDeleted || !elementAction.isEnabled)
              .map((elementAction, index) => {
                return (
                  <CustomTextfieldSV
                    ids={ids}
                    control={control}
                    elementAction={elementAction}
                    idAlert={idAlert}
                    key={index}
                  />
                )
              })}
            <SaveButton />
            <Divider orientation='horizontal' />
            {!!thereIsResultsAct && (
              <ResultsAct
                ids={ids}
                idAlert={idAlert}
                originOfficeData={originOfficeData}
              />
            )}
          </ElementContainer>
        </Box>
      ) : (
        <Typography variant='body1'>
          Revisar parametrización, esta acción no contiene elementos.
        </Typography>
      )}
    </>
  )
}

export default SaveForm
