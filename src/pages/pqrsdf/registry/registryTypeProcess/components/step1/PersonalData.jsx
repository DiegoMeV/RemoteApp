import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import { Controller } from 'react-hook-form'
import { typeSelector, usePersonalInputs } from './funcs'
import { GenericForm, GenericRadioGroup } from '@/libV4'
import toast from 'react-hot-toast'
import { ValueListGlobal } from '@/lib'

const PersonalData = ({ form }) => {
  // Definitions
  const { personalData, arrayModals, errorLovs } = usePersonalInputs({ form })
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  // Reset the form when changing to anonymous type
  useEffect(() => {
    if (form.watch('isAnonymous') === 'Y') {
      const allValues = form.getValues()
      const personalKeys = personalData.map((input) => input.name)
      const hasOtherData = Object.keys(allValues).some(
        (key) =>
          key !== 'isAnonymous' &&
          personalKeys.includes(key) &&
          allValues[key] !== '' &&
          allValues[key] !== null
      )
      if (hasOtherData) {
        setConfirmAlertProps({
          open: true,
          icon: 'warning',
          title: 'Cambio de actor',
          content:
            '¿Está seguro de que desea cambiar el tipo de registro a anónimo? Esto eliminará los datos ingresados previamente.',
          onConfirm: () => {
            form.reset({
              tipoRegistro: allValues.tipoRegistro,
            })
          },
          onClose: () => {
            form.setValue('isAnonymous', 'N')
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('isAnonymous'), form, setConfirmAlertProps])
  // Set typeDocument when juridico is selected
  useEffect(() => {
    if (form.watch('applicantType') === 'juridica') {
      form.setValue('documentType', 'NIT')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('applicantType'), form])
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)
  // Error handling
  useEffect(() => {
    if (errorLovs) {
      toast.error(`Error in LOVs : ${errorLovs}`)
    }
  }, [errorLovs])
  return (
    <div className='flex flex-col w-full gap-5 px-8'>
      <ValueListGlobal
        {...infoModal}
        selectedOption={(params) => {
          form?.setValue(infoModal.name, params.row)
        }}
        searchOptions={infoModal?.searchOptions}
      />
      <div className='text-st1'>Seleccione de que manera desea registrar la solicitud</div>
      <div className='flex flex-col gap-5 items-center'>
        <div className='max-w-lg w-full'>
          <Controller
            name='isAnonymous'
            control={form.control}
            rules={{
              required: 'Este campo es requerido',
            }}
            render={({ field, fieldState: { error } }) => (
              <GenericRadioGroup
                {...field}
                className='flex flex-col gap-4'
                options={typeSelector}
                error={error}
              />
            )}
          />
        </div>
        {form.watch('isAnonymous') === 'Y' ? (
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
          <div className='grid grid-cols-12 gap-4 w-full'>
            <GenericForm
              control={form.control}
              inputs={personalData}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonalData
