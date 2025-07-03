// TO-DO: CHANGE THIS COMPONENT
import { Box } from '@mui/material'
import { sxAccordionStyles } from '../../../styles'
import { ClassicIconButton } from '@/lib'

import { ButtonSelectModal, ContentInputsCallApi, ModalInfoApi } from './ui'
import { useCallApi } from '../../../hooks'
import { useState } from 'react'
import { ContentSwitch } from '../subcomponentsActions'

const ElementCallApi = ({ element, action, actionItemsInfo }) => {
  const [stateVars, stateFns] = useCallApi(element, action, actionItemsInfo)

  const { loadingElement, iconActions, open, control } = stateVars
  const { handleSaveElement, handleSubmit, handleOpenClose, watch, setValue, getValues } = stateFns

  const [especificInfoModal, setEspecificInfoModal] = useState('')

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <Box
        component='form'
        onSubmit={handleSubmit(handleSaveElement)}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <ContentInputsCallApi
          action={action}
          loadingElement={loadingElement}
          control={control}
        />
        <ButtonSelectModal
          handleOpenClose={handleOpenClose}
          setEspecificInfoModal={setEspecificInfoModal}
        />
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ContentSwitch control={control} />
          <Box>
            {iconActions.map((action, index) => (
              <ClassicIconButton
                onClick={action.onClick}
                key={index}
                hoverColor={action.hoverColor}
                title={action.title}
                placement='bottom'
                color='default'
                type={action.type}
              >
                {action.icon}
              </ClassicIconButton>
            ))}
          </Box>
        </Box>
      </Box>
      {/* TODO: 
        1. Mejorar, ya que los inputs deben ser obligatorios, por lo tanto cuando se ejecute el submit, la
        page debe denegar el guardado hasta que se llenen los datos.
        2. Si se agrega un item, este item solo debe guardarse si el usuario ejecute el submit
        - Contexto: Si el usuario realiza el evento de cerrar el modal, el arreglo aun asi tendra los items
        que recien se crearon pero no se guardaron
      */}
      {open && especificInfoModal && (
        <ModalInfoApi
          handleSaveElement={handleSaveElement}
          control={control}
          open={open}
          typeModal={especificInfoModal}
          watch={watch}
          handleClose={handleOpenClose}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </Box>
  )
}

export default ElementCallApi
