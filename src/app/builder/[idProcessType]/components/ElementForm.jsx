import { Box, TextField, MenuItem, Badge } from '@mui/material'
import { DeleteOutlined, Save, TuneOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { inputTypeSaveForm, useFormAction } from '../hooks'
import { sxAccordionStyles } from '../styles'
import { ClassicIconButton, CommonTextField, CustomModal, toArray } from '@/lib'
import { ElementSwitchButtons } from '.'
import RageInputs from './rageInputs/RageInputs'
import { useFieldArray, useForm } from 'react-hook-form'

//TODO: Re hacer componente Element
const ElementForm = ({ element, action, actionItemsInfo, item }) => {
  const [stateVars, stateFns] = useFormAction({ element, action, actionItemsInfo })
  const { value, loadingElement, optionsInputLocal, advanceSettingState } = stateVars
  const {
    handleChange,
    handleDeleteElement,
    handleSaveElement,
    setOptionsInputLocal,
    handleModalSubmit,
  } = stateFns
  const labels = [
    {
      identifier: 'Identificador del campo',
      name: 'Nombre del Dato',
      description: 'Descripción del Dato',
    },
  ]

  const iconActions = [
    {
      title: 'Configuración avanzada',
      icon: <TuneOutlined />,
      onClick: () => {
        if (!inputTypeSaveForm.some((type) => value.variableType === type.value)) {
          toast.error('Debe escoger un tipo de campo.')
          return
        } else {
          advanceSettingState.handleShow()
        }
      },
    },
    {
      title: 'Guardar elemento',
      icon: <Save />,
      onClick: () => {
        handleSaveElement(action, element)
      },
    },
    {
      title: 'Eliminar elemento',
      icon: <DeleteOutlined />,
      onClick: () => {
        handleDeleteElement(action, element)
      },
      hoverColor: 'red',
    },
  ]
  const actionsActivityParams = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: () => {
        advanceSettingState.handleShow()
        setOptionsInputLocal(value.options)
      },
    },
    {
      label: 'Guardar',
      variant: 'contained',
      type: 'submit',
    },
  ]

  const attributeWithValue = (options) => {
    return options.url === ''
  }

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      actionItemSpecs: toArray(value?.options),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actionItemSpecs',
  })

  const onSubmit = (data) => {
    if (value.variableType !== 'lov') {
      handleModalSubmit({ data: {}, isArr: false })
    } else {
      handleModalSubmit({ data, isArr: true })
    }
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginY: '5px' }}>
      <Box sx={sxAccordionStyles.accordionElementGeneration}>
        <Box
          display='flex'
          flexDirection='column'
          rowGap={2}
        >
          <Box
            display='flex'
            gap={2}
          >
            <CommonTextField
              label='Posición'
              value={value?.position}
              disabled={loadingElement}
              name='position'
              id={`${element?.id}_input_position_element_document`}
              handleChange={handleChange}
              sx={{ pointerEvents: '', width: '100px' }}
            />
            <CommonTextField
              label={labels[0].identifier}
              value={value?.variableName}
              disabled={loadingElement}
              name='variableName'
              id={`${item}_${action.id}_${element?.id}_input_identifier_element_document_${action.actionType}`}
              handleChange={handleChange}
              sx={{ pointerEvents: '' }}
            />
          </Box>
          <TextField
            id={`${item}_select-type-${element.id}-${action.id}`}
            variant='outlined'
            size='small'
            value={value.variableType}
            name='variableType'
            onChange={handleChange}
            select
            fullWidth
            label={'Tipo de Campo'}
            sx={{
              textAlign: 'start',
              pointerEvents: '',
            }}
          >
            {inputTypeSaveForm.map((option, index) => (
              <MenuItem
                key={`${item}_${index}_${option.value}_${element.id}-${action.id}`}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <CommonTextField
            label={labels[0].name}
            value={value?.name}
            disabled={loadingElement}
            name='name'
            id={`${item}_${action.id}_${element?.id}_input_name_element_document_${action.actionType}`}
            handleChange={handleChange}
            sx={{ pointerEvents: '' }}
          />
          <CommonTextField
            label={labels[0].description}
            value={value?.description}
            disabled={loadingElement}
            name='description'
            id={`${item}_${action.id}_${element?.id}_input_description_element_document_${action.actionType}`}
            handleChange={handleChange}
            multiline
            minRows={2}
            maxRows={3}
            sx={{ pointerEvents: '' }}
          />
        </Box>
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ElementSwitchButtons
            loadingElement={loadingElement}
            value={value}
            handleChange={handleChange}
          />
          <Box>
            {iconActions.map((action, index) =>
              action.title === 'Configuracion Avanzada' ? (
                <Badge
                  key={index}
                  color='error'
                  variant='dot'
                  invisible={value.type !== 'lov' || !attributeWithValue(optionsInputLocal)}
                >
                  <ClassicIconButton
                    onClick={action.onClick}
                    hoverColor={action.hoverColor}
                    title={action.title}
                    placement='bottom'
                    color='default'
                  >
                    {action.icon}
                  </ClassicIconButton>
                </Badge>
              ) : (
                <ClassicIconButton
                  onClick={action.onClick}
                  key={index}
                  hoverColor={action.hoverColor}
                  title={action.title}
                  placement='bottom'
                  color='default'
                >
                  {action.icon}
                </ClassicIconButton>
              )
            )}
          </Box>
        </Box>
      </Box>
      {advanceSettingState.show && (
        <CustomModal
          modalType='form'
          onSubmit={handleSubmit(onSubmit)}
          open={advanceSettingState.show}
          handleClose={advanceSettingState.handleShow}
          size='sm'
          height='300px'
          title='Opciones avanzadas'
          actions={actionsActivityParams}
        >
          <RageInputs
            value={value}
            optionsInputLocal={optionsInputLocal}
            setOptionsInputLocal={setOptionsInputLocal}
            control={control}
            handleSubmit={handleSubmit}
            setValue={setValue}
            getValues={getValues}
            fields={fields}
            append={append}
            remove={remove}
          />
        </CustomModal>
      )}
    </Box>
  )
}

export default ElementForm
