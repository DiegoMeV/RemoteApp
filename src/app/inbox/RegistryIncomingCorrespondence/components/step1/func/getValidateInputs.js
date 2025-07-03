export const getValidateInputs = ({
  formModal,
  inputsPopulationPQRSDF,
  setConfirmAlertProps,
  personalData,
}) => [
  {
    name: 'isAnonymous',
    description:
      formModal?.watch('isAnonymous') === 'Y' ? (
        <div className='text-b5 text-gray-light text-justify leading-[17px]'>
          <p className='mb-4'>
            Según el art. 81 de la Ley 962 de 2005: &quot;(...) ninguna denuncia o queja anónima
            podrá promover acción jurisdiccional, penal, disciplinaria, fiscal, o actuación de la
            autoridad administrativa competente (excepto cuando se acredite, por lo menos
            sumariamente la veracidad de los hechos denunciados) o cuando se refiera en concreto a
            hechos o personas claramente identificables. (...)&quot;.
          </p>
          <p>
            Esto significa que deberá revelar su identidad al momento de realizar la denuncia o
            queja. Esta disposición busca garantizar la transparencia y la veracidad de las
            denuncias, ya que al identificar al denunciante se facilita la verificación de la
            información proporcionada y se evita el uso indebido de denuncias o quejas anónimas.
          </p>
        </div>
      ) : (
        ''
      ),
    label: 'Registrar la solicitud',
    type: 'radioSelect',
    required: true,
    className: '!grid grid-cols-12 gap-4 w-full col-span-12',
    options: [
      { value: 'N', label: 'A nombre personal', className: 'general_form_item' },
      { value: 'Y', label: 'Anónimo', className: 'general_form_item' },
    ],
    onChange: (e) => {
      if (e.target.value === 'Y') {
        const allValues = formModal.watch()
        const personalKeys = personalData.map((input) => input.name)
        const personalKeysWithoutPersonalData = personalKeys.map(
          (key) => key.replace('personalData.', '') ?? key
        )
        const hasOtherData = allValues?.personalData
          ? Object.keys(allValues.personalData).some(
              (key) =>
                personalKeysWithoutPersonalData.includes(key) &&
                allValues.personalData[key] !== '' &&
                allValues.personalData[key] !== null
            )
          : false
        if (hasOtherData) {
          setConfirmAlertProps({
            open: true,
            icon: 'warning',
            title: 'Cambio de tipo de remitente',
            content:
              '¿Está seguro de que desea cambiar el tipo de remitente ? Esto eliminará los datos ingresados previamente.',
            onConfirm: () => {
              formModal.setValue('personalData', {})
              formModal.setValue('personalData.fullName', 'Anónimo')
              formModal.setValue('isAnonymous', e.target.value)
            },
            onClose: () => {
              formModal.setValue('isAnonymous', 'N')
            },
          })
          return
        }
      }
      formModal.setValue('isAnonymous', e.target.value)
      if (formModal.watch('isAnonymous') === 'Y') {
        formModal.setValue('personalData.fullName', 'Anónimo')
      } else {
        formModal.setValue('personalData.fullName', '')
      }
    },
  },
  {
    name: 'authSensibleData',
    description: (
      <div className='text-b5 text-gray-light text-justify leading-[17px]'>
        Con fundamento en el art. 6 e) de la Ley 1581 de 2012 y el Decreto 1499 de 2017, solicitamos
        su autorización para tratar sus datos personales sensibles con fines estadísticos que ayuden
        a identificar necesidades ciudadanas, segmentar poblaciones y mejorar nuestros servicios.
        Esta información es voluntaria; puede abstenerse. Para conocer más o ejercer sus derechos,
        consulte nuestra Política de Participación Ciudadana y Caracterización de Población.
      </div>
    ),
    label: '¿Autoriza el tratamiento de sus datos personales sensibles?',
    type: 'radioSelect',
    required: true,
    className: '!grid grid-cols-12 gap-4 w-full col-span-12',
    options: [
      { value: 'Y', label: 'Sí', className: 'general_form_item' },
      { value: 'N', label: 'No', className: 'general_form_item' },
    ],
    onChange: (e) => {
      if (e.target.value !== 'Y') {
        const allValues = formModal.watch()
        const populationKeys = inputsPopulationPQRSDF.map((input) => input.name)
        const populationKeysWithoutPopulationInfo = populationKeys.map(
          (key) => key.replace('populationInfo.', '') ?? key
        )
        const hasOtherData = allValues?.populationInfo
          ? Object.keys(allValues.populationInfo).some(
              (key) =>
                populationKeysWithoutPopulationInfo.includes(key) &&
                allValues.populationInfo[key] !== '' &&
                allValues.populationInfo[key] !== null
            )
          : false
        if (hasOtherData) {
          setConfirmAlertProps({
            open: true,
            icon: 'warning',
            title: 'Cambio de tipo de remitente',
            content:
              '¿Está seguro de que desea cambiar el tipo de remitente ? Esto eliminará los datos ingresados previamente.',
            onConfirm: () => {
              formModal.setValue('populationInfo', {})
              formModal.setValue('authSensibleData', e.target.value)
            },
            onClose: () => {
              formModal.setValue('authSensibleData', 'Y')
            },
          })
          return
        }
      }
      formModal.setValue('authSensibleData', e.target.value)
    },
  },
]
