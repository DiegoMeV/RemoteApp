import { ElementContainer } from '..'
import { CustomTextfieldSV, SaveButton } from '.'
import { Box, Typography } from '@mui/material'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import styles from '../styles/Actions.module.css'
import { useSaveFormDataActivities } from './hooks'

const SaveForm = ({ action, elementData, ids, processInfo }) => {
  const idAlert = processInfo?.[0]?.processData?.cgrAlertas?.idAlert
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
