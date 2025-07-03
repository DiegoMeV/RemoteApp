import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import { Controller } from 'react-hook-form'
import { populationInputs, SensitiveData } from './funcs'
import { GenericForm, GenericRadioGroup } from '@/libV4'

const PopulationInformation = ({ form }) => {
  // Definitions
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const populationData = populationInputs({ form })
  // Reset the form when changing the processingSensitiveData field
  useEffect(() => {
    if (form.watch('authSensibleData') === 'N') {
      const allValues = form.getValues()
      const populationKeys = populationData.map((input) => input.name)
      const hasOtherData = Object.keys(allValues).some(
        (key) =>
          key !== 'authSensibleData' &&
          populationKeys.includes(key) &&
          allValues[key] !== '' &&
          allValues[key] !== null
      )
      if (hasOtherData) {
        setConfirmAlertProps({
          open: true,
          icon: 'warning',
          title: 'Cambio tratamiento de datos personales sensibles',
          content:
            '¿Está seguro de que desea cambiar el tratamiento de datos personales sensibles ? Esto eliminará los datos ingresados previamente.',
          onConfirm: () => {
            const filteredValues = Object.keys(allValues)
              .filter((key) => !populationKeys.includes(key))
              .reduce((acc, key) => {
                acc[key] = allValues[key]
                return acc
              }, {})

            form.reset({
              ...filteredValues,
            })
          },
          onClose: () => {
            form.setValue('authSensibleData', 'Y')
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('authSensibleData'), form, setConfirmAlertProps])
  return (
    <div className='flex flex-col w-full gap-5 px-8'>
      <div className='flex flex-col gap-6'>
        <div className='text-b5 text-gray-light text-justify leading-[17px]'>
          Con fundamento en el art. 6 e) de la Ley 1581 de 2012 y el Decreto 1499 de 2017,
          solicitamos su autorización para tratar sus datos personales sensibles con fines
          estadísticos que ayuden a identificar necesidades ciudadanas, segmentar poblaciones y
          mejorar nuestros servicios. Esta información es voluntaria; puede abstenerse. Para conocer
          más o ejercer sus derechos, consulte nuestra Política de Participación Ciudadana y
          Caracterización de Población.
        </div>
        <Controller
          name='authSensibleData'
          control={form.control}
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field, fieldState: { error } }) => (
            <GenericRadioGroup
              {...field}
              label='¿Autoriza el tratamiento de sus datos personales sensibles? *'
              classNameLabel='flex col-span-full text-[#002250]'
              className='!grid grid-cols-12 gap-4 w-full'
              options={SensitiveData}
              error={error}
            />
          )}
        />
        <div className='grid grid-cols-12 gap-4 w-full mt-12'>
          {form.watch('authSensibleData') === 'Y' && (
            <GenericForm
              control={form.control}
              inputs={populationData}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PopulationInformation
