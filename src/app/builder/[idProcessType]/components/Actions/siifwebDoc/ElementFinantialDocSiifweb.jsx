import { Box } from '@mui/material'
import { ContentSwitch } from '../subcomponentsActions'
import { sxAccordionStyles } from '../../../styles'
import { BackdropLoading, ClassicIconButton, useBoolean } from '@/lib'
import { siifwebTypeVoucher, useGenericActionItem } from '../../../hooks'
import { ElementInteraction, ModalConfigParameters } from '../callOracleForm/ui'
import {
  findVoucherTypeObject,
  iconActions,
  ITEMS_SIIFWEB_BIND_FINANTIAL_DOC,
} from '../../../funcs'
import toast from 'react-hot-toast'

const ElementFinantialDocSiifweb = ({ element, action, actionItemsInfo }) => {
  const elementToSend = {
    siifwebData: {
      voucherType: element?.actionItemSpecs?.siifwebData?.voucherType?.value ?? null,
      parameters: element?.actionItemSpecs?.siifwebData?.parameters ?? {},
    },
  }

  const handleValueSetter = (data) => {
    const { actionItemSpecs, ...dataItem } = data
    const { siifwebData, ...dataItemSpecs } = actionItemSpecs

    const voucherTypeObject = findVoucherTypeObject(data)

    return {
      ...dataItem,
      actionItemSpecs: {
        ...dataItemSpecs,
        siifwebData: { ...siifwebData, voucherType: voucherTypeObject },
      },
    }
  }

  const [stateVars, stateFns] = useGenericActionItem({
    element,
    action,
    elementToSend,
    actionItemsInfo,
    handleValueSetter,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, watch, handleSubmit, handleDeleteElement, setValue, getValues } =
    stateFns

  const inputs = ITEMS_SIIFWEB_BIND_FINANTIAL_DOC({
    isDisabled: loadingElement,
    options: siifwebTypeVoucher ?? [],
  })

  const actionsButtons = iconActions(handleDeleteElement, action, element)

  const openModal = useBoolean()

  // Additional step for send data to the backend
  const handleSaveItem = (data) => {
    if (!data?.actionItemSpecs?.siifwebData?.voucherType) {
      toast.error('Debe seleccionar un tipo de comprobante')
      return
    }

    const newData = handleValueSetter(data)

    handleSaveElement(newData)
  }

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <BackdropLoading loading={loadingElement} />
      <Box
        component='form'
        onSubmit={handleSubmit(handleSaveItem)}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <ElementInteraction
          inputs={inputs}
          control={control}
          openModal={openModal}
          sizeBtn='3'
        />
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ContentSwitch control={control} />
          <Box>
            {actionsButtons.map((action, index) => (
              <ClassicIconButton
                onClick={action?.onClick}
                key={index}
                hoverColor={action?.hoverColor}
                title={action?.title}
                placement='bottom'
                color='default'
                type={action?.type}
                disabled={loadingElement}
              >
                {action?.icon}
              </ClassicIconButton>
            ))}
          </Box>
        </Box>
      </Box>
      {openModal?.show && (
        <ModalConfigParameters
          control={control}
          open={openModal?.show}
          handleClose={openModal?.handleShow}
          watch={watch}
          setValue={setValue}
          element={element}
          handleSaveElement={handleSaveItem}
          getValues={getValues}
          arrayName={'actionItemSpecs.siifwebData.parameters'}
        />
      )}
    </Box>
  )
}

export default ElementFinantialDocSiifweb
