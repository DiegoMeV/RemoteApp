import { convertToNumber, useMutationDynamicBaseUrl } from '@/libV4'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const useCalcValues = ({ form, module, infoVehicle, isNew }) => {
  const userData = useStoreState((state) => state.user.userData)

  const initialPeriod = form?.watch('periodoIni')
  const finalPeriod = form?.watch('periodoFin')
  const perFinancing = form?.watch('porcFinanciacion')
  const mode = form?.watch('modalidad')
  const dues = form?.watch('cuotas')

  const { mutateAsync: calcFinan, isPending: loadingCalcFinan } = useMutationDynamicBaseUrl({
    baseKey: 'urlRentasApi',
    url: '/convenios/calcular-financiacion',
    isCompanyRequest: true,
    onSuccess: (response) => {
      const responseCalc = response?.data?.[0] ?? {}
      const message = responseCalc?.pMensaje ?? 'Proceso de Financiacion calculado exitosamente'

      const totalDebt = form?.watch('totalDebt') ?? '0'

      form?.setValue('financiacionConvenio', responseCalc?.pVlrFinanciacion ?? '0')

      const newTotalDebt =
        convertToNumber(responseCalc?.pVlrFinanciacion) + convertToNumber(totalDebt)

      form?.setValue('totalDeuda', newTotalDebt)

      toast.success(message)
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message ?? 'Error al calcular la financiacion'),
  })

  const { mutateAsync: calcDownPay, isPending: loadingCalcDownPay } = useMutationDynamicBaseUrl({
    baseKey: 'urlRentasApi',
    url: '/convenios/cuota-inicial',
    isCompanyRequest: true,
    onSuccess: (response) => {
      const responseCalc = response?.data?.[0] ?? {}
      const message = responseCalc?.pMensaje ?? 'Proceso cuota inicial calculado exitosamente'

      form?.setValue('cuotaInicial', responseCalc?.pVlrCuotaInicial ?? '0')
      form?.setValue('porcInicial', responseCalc?.pPorcCuotaInicial ?? '0')

      const { deuda, interesMora, financiacionDeuda, sanciones, modalidad, cuotas } =
        form?.getValues() ?? {}

      toast.success(message)

      calcFinan({
        body: {
          deuda,
          cuotas,
          modalidad,
          modulo: module,
          financiacionDeuda,
          sancion: sanciones,
          interes: interesMora,
          tasaUsuraEA: perFinancing,
          cuotaInicial: convertToNumber(responseCalc?.pVlrCuotaInicial),
        },
      })
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message ?? 'Error al calcular la cuota inicial'),
  })

  const { mutateAsync: calcDebt, isPending: loadingCalcDebt } = useMutationDynamicBaseUrl({
    baseKey: 'urlRentasApi',
    url: '/convenios/calcular-deuda',
    isCompanyRequest: true,
    onSuccess: (response) => {
      const responseCalc = response?.data?.[0] ?? {}
      const message = responseCalc?.pMensaje ?? 'Proceso de deuda calculada exitosamente'

      form?.setValue('deuda', responseCalc?.pVlrDeuda ?? '0')
      form?.setValue('interesMora', responseCalc?.pVlrInteresMora ?? '0')
      form?.setValue('financiacionDeuda', responseCalc?.pVlrFinanciacionDeuda ?? '0')
      form?.setValue('sanciones', responseCalc?.pVlrSanciones ?? '0')

      const totalDebt =
        convertToNumber(responseCalc?.pVlrDeuda) +
        convertToNumber(responseCalc?.pVlrInteresMora) +
        convertToNumber(responseCalc?.pVlrSanciones)

      form?.setValue('totalDeuda', totalDebt)

      toast.success(message)

      calcDownPay({
        body: {
          usuario: userData && userData.aliases ? userData.aliases.SIIFWEB : 'SYNCHROX',
          totalDeuda: totalDebt ?? 0,
          valorFinanciacion: responseCalc?.pVlrFinanciacionDeuda ?? 0,
        },
      })
    },
    onError: (error) => toast.error(error?.response?.data?.message ?? 'Error al calcular la deuda'),
  })

  useEffect(() => {
    // perFinancing puede llegar a ser 0
    if (!!initialPeriod && !!finalPeriod && !!(infoVehicle?.idCodigo || infoVehicle)) {
      const body = {
        idCodigo: infoVehicle?.idCodigo || infoVehicle,
        modulo: module,
        periodoIni: initialPeriod,
        subPeriodoIni: '1',
        codSubPeriodoIni: '1',
        periodoFin: finalPeriod,
        subPeriodoFin: '1',
        codSubPeriodoFin: '1',
        tasaUsuraEA: perFinancing,
      }

      calcDebt({ body })
    }
  }, [infoVehicle, initialPeriod, finalPeriod, perFinancing, module, calcDebt])

  useEffect(() => {
    if (!isNew && !!module && !!perFinancing && !!mode && !!dues) {
      const { cuotaInicial, deuda, interesMora, financiacionDeuda, sanciones } =
        form?.getValues() ?? {}

      calcFinan({
        body: {
          deuda,
          cuotas: dues,
          cuotaInicial,
          modulo: module,
          modalidad: mode,
          financiacionDeuda,
          sancion: sanciones,
          interes: interesMora,
          tasaUsuraEA: perFinancing,
        },
      })
    }
  }, [isNew, module, perFinancing, mode, dues, calcFinan, form])

  return {
    loadingCalcs: loadingCalcDebt || loadingCalcFinan || loadingCalcDownPay,
    calcDebt,
  }
}

export default useCalcValues
