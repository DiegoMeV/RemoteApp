import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { CommonTextField, GenericAutocomplete, GenericSelect, TextFieldReadOnly } from '@/lib'
import { Controller } from 'react-hook-form'
import { type_identifications } from '@/lib/components/SIGEDOC/funcs'

const ContainerForm = ({
  handleChange,
  comment,
  setComment,
  deliveryType,
  fileStoreType,
  setFileStoreType,
  infoSentDetails,
  setInfoSentDetails,
  basicInfo,
  setBasicInfo,
  infoThirdDestination,
  setInfoThirdDestination,
  control,
  infoDocument,
  handleBlurTercero,
}) => {
  const anonymousOptions = ['SFTP', 'Vista materializada atravez de VPN', 'WEB service', 'App UI']
  const handleInputChange = (newInputValue) => {
    setFileStoreType(newInputValue)
  }

  return (
    <Box
      sx={{
        padding: '50px',
        bgcolor: 'white',
        margin: '40px',
        overflow: 'auto',
        height: '70%',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Ejemplo de sombra
        borderRadius: '16px',
      }}
    >
      <TextFieldReadOnly
        lg={3}
        label='Descripción de la solicitud'
        value={
          infoDocument?.data?.especificaciones?.data?.DESCRIPCION_SOLICITUD ??
          'Dirección de información, análisis y reacción inmediata DIARI'
        }
      />
      <FormControl
        component='fieldset'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '10px',
          width: '100%',
        }}
      >
        <RadioGroup
          row
          name='opciones'
          value={deliveryType}
          onChange={handleChange}
        >
          <FormControlLabel
            value='EXTENTION'
            control={<Radio />}
            label='Prórroga'
          />
          <FormControlLabel
            value='PARTIAL'
            control={<Radio />}
            label='Envío parcial'
          />
          <FormControlLabel
            value='COMPLETE'
            control={<Radio />}
            label='Envío final'
          />
        </RadioGroup>
      </FormControl>
      <Box>
        <Box mt={5}>
          <Controller
            control={control}
            name='fileStoreType'
            render={({ field }) => {
              const autocompleteProps = {
                ...field,
                options: anonymousOptions,
                value: deliveryType === 'EXTENTION' ? null : fileStoreType,
                disabled: deliveryType === 'EXTENTION',
                onChange: (_, newValue) => handleInputChange(newValue),
                getOptionLabel: (option) => option,
                isOptionEqualToValue: (option, value) => option === value,
                startAdornment: <></>,
              }

              return (
                <GenericAutocomplete
                  autocompleteProps={autocompleteProps}
                  textFieldProps={{
                    label: 'Mecanismo por el que se envía la información',
                    fullWidth: true,
                  }}
                />
              )
            }}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label='Detalle de la información enviada'
            name='infoSentDetails'
            value={deliveryType === 'EXTENTION' ? '' : infoSentDetails}
            handleChange={(e) => setInfoSentDetails(e.target.value)}
            multiline={true}
            minRows={3}
            disabled={deliveryType === 'EXTENTION'}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label={deliveryType === 'EXTENTION' ? 'Justificación' : 'Observación adicionales'}
            name='comment'
            value={comment}
            handleChange={(e) => setComment(e.target.value)}
            multiline={true}
            minRows={3}
            required={true}
          />
        </Box>
        <Box my={5}>
          <CommonTextField
            label='Asunto'
            name='subject'
            value={basicInfo.subject}
            handleChange={(e) => setBasicInfo({ ...basicInfo, subject: e.target.value })}
            multiline={true}
            required={true}
            minRows={3}
          />
        </Box>
        Informacion tercero origen
        {/* TODO: CAMBIAR TODO EL FORM POR USEFORM */}
        <Box mt={5}>
          <GenericSelect
            label='Tipo de Identificacion'
            name='typeIdentification'
            value={infoThirdDestination.typeIdentification}
            onChange={(e) =>
              setInfoThirdDestination({
                ...infoThirdDestination,
                typeIdentification: e.target.value,
              })
            }
            handleBlur={handleBlurTercero}
            required={true}
            options={type_identifications}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label='Identificacion'
            name='identification'
            value={infoThirdDestination.identification}
            handleChange={(e) =>
              setInfoThirdDestination({ ...infoThirdDestination, identification: e.target.value })
            }
            handleBlur={handleBlurTercero}
            required={true}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label='Nombre'
            name='name'
            value={infoThirdDestination.name}
            handleChange={(e) =>
              setInfoThirdDestination({ ...infoThirdDestination, name: e.target.value })
            }
            required={true}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label='Apellido'
            name='lastName'
            value={infoThirdDestination.lastName}
            handleChange={(e) =>
              setInfoThirdDestination({ ...infoThirdDestination, lastName: e.target.value })
            }
            required={true}
          />
        </Box>
        <Box mt={5}>
          <CommonTextField
            label='Correo electronico'
            name='email'
            type='email'
            value={infoThirdDestination.correo}
            handleChange={(e) =>
              setInfoThirdDestination({ ...infoThirdDestination, correo: e.target.value })
            }
            required={true}
          />
        </Box>
      </Box>
      {/* <ClassicIconButton
          disabled={false}
          onClick={handleAddDoc}
          title='Agregar archivo'
          placement='bottom'
          hoverColor='gray'
        >
          <Add fontSize='large' />
        </ClassicIconButton>

      {docs.map((doc, index) => (
        <FormUploadDoc
          key={index}
          doc={doc}
          idCompany={idCompany}
          idActivity={idActivity}
          idProcess={idProcess}
        />
      ))} */}
    </Box>
  )
}

export default ContainerForm
