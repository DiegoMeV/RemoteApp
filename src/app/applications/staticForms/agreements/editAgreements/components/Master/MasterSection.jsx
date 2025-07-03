import { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Button } from '@mui/material'
import { Save } from '@mui/icons-material'

import {
  inputsCancellationInformation,
  inputsDuesInfo,
  inputsInfoAgreementsCalc,
  inputsVehicleAgreements,
  inputsVehicleInfo,
} from '../../constants'
import {
  BackdropLoading,
  convertToNumber,
  GenericForm,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/libV4'
import { CardAgreementsExtra, MasterTitle } from './components'
import { useCalcValues } from './hooks'
import dayjs from 'dayjs'

const MasterSection = ({ form = {}, module = '', isNew } = {}) => {
  const navigate = useNavigate()

  const today = dayjs().toISOString()

  const userData = useStoreState((state) => state.user.userData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const setVLProps = useStoreActions((actions) => actions.valueList.setVLProps)

  const isVehicularAgreement = module === 'V'

  const infoVehicle = form?.watch('idCodigo')
  const agreementStatus = form?.watch('estado')
  const initialDate = form?.watch('fechaInicio')
  const dues = form?.watch('cuotas')
  const perFinancing = form?.watch('porcFinanciacion')

  const fechaISO = initialDate ? dayjs(initialDate).toISOString() : null

  const { loadingCalcs } = useCalcValues({ form, module, infoVehicle, isNew })

  const { data: mxCuotas, isFetching: loadingMxCuotas } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    isCompanyRequest: true,
    enabled: !!isNew,
    url: '/parametros/parametros?parametro=CUOTAS_CONV',
  })

  const { data: financingRate, isFetching: loadingFinancingRate } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    isCompanyRequest: true,
    enabled: !!fechaISO && !perFinancing,
    url: `/parametros/interes?fecha=${fechaISO}`,
  })

  const { data: currentVehicle, isFetching: loadingVehicle } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    isCompanyRequest: true,
    enabled: !!isVehicularAgreement,
    url: `/vehicular/vehiculos`,
  })

  const { mutateAsync: createAgreement, isPending: loadingAgreement } = useMutationDynamicBaseUrl({
    baseKey: 'urlRentasApi',
    url: '/convenios/crear-convenio',
    isCompanyRequest: true,
    onSuccess: (response) => {
      toast.success('Acuerdo de pago creado exitosamente')
      navigate(
        `/applications/staticForms/agreements/editAgreements?module=V&agreement=${response?.convenio}`
      )
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message ?? 'Error al crear el acuerdo de pago'),
  })

  // Solo se pueden crear acuerdos de pago, no se pueden editar
  const handleSave = (data) => {
    if (!isNew) {
      toast.error(
        'No se puede editar un acuerdo de pago existente. Solo se pueden crear nuevos acuerdos'
      )
      return
    }
    // const formValues = form?.getValues()

    // Datos minimos para crear un acuerdo de pago vehicular
    //   convenio: 2,
    //   modulo: 'V',
    //   fecha: '09/06/2024',
    //   idCodigo: 'AQDKJFIWER',
    //   modalidad: 'M',
    //   cuotas: '6',
    //   fechaInicio: '09/06/2024',
    //   congInteres: 'N',
    //   estado: 'L',
    //   periodoFin: '2024',
    //   subperiodoFin: '12',
    //   aplReprelegal: 'N',

    const filterDataToCreate = {
      ...data,
      usuCrea: userData?.aliases?.SIIFWEB ?? 'SYNCHROX',
    }

    if (isVehicularAgreement) {
      filterDataToCreate.idCodigo = data?.idCodigo?.idCodigo ?? null
    }

    createAgreement({ body: filterDataToCreate })
  }

  const handleConfirmSave = (data) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Guardar cambios',
      content: `¿Está seguro que desea guardar cambios?`,
      onConfirm: () => handleSave(data),
    })
  }

  useEffect(() => {
    // Informacion del vehiculo
    if (isVehicularAgreement) {
      const veh = currentVehicle?.data.find(
        (veh) => veh?.idCodigo === (infoVehicle?.idCodigo || infoVehicle)
      )

      form?.setValue('descMarca', veh?.descMarca ?? null)
      form?.setValue('descColor', veh?.descColor ?? null)
      form?.setValue('vserieMotor', veh?.vmodelo ?? null)
      form?.setValue('vserieMotor', veh?.vserieMotor ?? null)
      // TO-DO:
      // form?.setValue('telefonos', infoVehicle?.telefonos ?? null)
      // form?.setValue('correoe', infoVehicle?.correoe ?? null)
      // form?.setValue('vpropietario', infoVehicle?.vpropietario ?? null)
      // form?.setValue('documento', infoVehicle?.documento ?? null)
      // form?.setValue('dirCobro', infoVehicle?.dirCobro ?? null)
      // correoe
      // vmodelo
      // descClase
      // revisar que hago con razonSocial o propietario
      // documento
      // revisar si es direccion o dirCobro
      // vserieMotor
      // descLinea
      // descColor1
      // revisar: vserieChasis y vserieVin
      // telefonos11
    }
  }, [isVehicularAgreement, currentVehicle, infoVehicle])

  useEffect(() => {
    // Maximo de cuotas
    if (mxCuotas && dues) {
      const maxCuotas = mxCuotas?.data?.[0]?.valor ?? 0
      if (convertToNumber(dues) < convertToNumber(maxCuotas)) {
        form?.clearErrors('cuotas')
        return
      }
      form?.setError('cuotas', {
        type: 'manual',
        message: `El número de cuotas no puede ser mayor a ${maxCuotas}`,
      })
    }
  }, [dues, mxCuotas])

  useEffect(() => {
    // Tasa de usuara
    if (financingRate) {
      const rate = financingRate?.data?.[0]?.porcentaje ?? 0
      form?.setValue('porcFinanciacion', rate)
    }
  }, [financingRate])

  const INPUTS_VEHICULAR = inputsVehicleAgreements({ isNew, today, financingRate, mxCuotas })
  const INPUTS_CANCELLATION = inputsCancellationInformation({ isNew })
  const INPUTS_CALCULATED = inputsInfoAgreementsCalc({ isNew })
  const INPUTS_DUES_INFO = inputsDuesInfo({ isNew })
  const INPUTS_INFO_VEHICULAR = inputsVehicleInfo({
    isNew,
    form,
    setVLProps,
    infoVehicule: currentVehicle,
  })

  const loading =
    loadingAgreement || loadingVehicle || loadingCalcs || loadingFinancingRate || loadingMxCuotas

  return (
    <section>
      <BackdropLoading loading={loading} />
      <form
        className='flex flex-col gap-4 border rounded-[10px]'
        onSubmit={form?.handleSubmit(handleConfirmSave)}
      >
        <div className='w-full'>
          <MasterTitle agreementStatus={agreementStatus} />
          <div className='general_form_container p-3 backgroundwhite1 rounded-b-[15px] border'>
            <GenericForm
              control={form?.control}
              inputs={INPUTS_VEHICULAR}
            />
          </div>
        </div>
        {isVehicularAgreement && (
          <CardAgreementsExtra
            inputs={INPUTS_INFO_VEHICULAR}
            form={form}
            title='Datos del vehículo'
            classNameForm='backgroundwhite1 rounded-b-[10px] border'
          />
        )}
        {isVehicularAgreement && (
          <CardAgreementsExtra
            inputs={INPUTS_DUES_INFO}
            form={form}
            title='Datos de la deuda'
            classNameForm='backgroundwhite1 rounded-b-[10px] border'
          />
        )}
        <div className='w-full flex gap-4 flex-wrap md:flex-nowrap'>
          <CardAgreementsExtra
            inputs={INPUTS_CALCULATED}
            form={form}
            title='Datos de liquidación'
            classNameContainer='md:w-1/2 backgroundwhite1 rounded-[10px] border'
          />

          <CardAgreementsExtra
            inputs={INPUTS_CANCELLATION}
            form={form}
            title='Información anulación'
            classNameContainer='md:w-1/2 backgroundwhite1 rounded-[10px] border'
          />
        </div>
        <div className='flex justify-end items-center px-4 pb-4'>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            startIcon={<Save />}
            // disabled={!isNew}
          >
            Guardar
          </Button>
        </div>
      </form>
    </section>
  )
}

export default MasterSection
