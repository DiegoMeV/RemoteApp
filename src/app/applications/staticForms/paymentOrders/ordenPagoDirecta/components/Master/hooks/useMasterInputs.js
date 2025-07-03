import { Article } from '@mui/icons-material'
import { clasePagoOptions, estadoOptions, tipoCuentaOptions } from '../constants'
import {
  centroCostoQuery,
  cptoAnticiposQuery,
  cptoCausacionQuery,
  idBancoQuery,
  idTipoRetQuery,
  nroDocRelQuery,
  recursoQuery,
  terceroEmbargoQuery,
  terceroQuery,
  unidadNegocioQuery,
} from '../funcs'
import dayjs from 'dayjs'

const validationCompany = [890102006, 8901020061, 8901020062, 890480059, 891780009]
const validationCompanyThree = [890102006, 8901020061, 8901020062]
const validationCompanyForConpEXO = [890102006, 8901020061, 8901020062]
const validationCompanyForNroDoc = [890480059, 891900624]

const validationCompanyForSinSituacion = [890102006, 8901020061, 8901020062, 892280021]

const useMasterInputs = ({
  nit_compania,
  queryParams,
  getFormValue,
  setFormValue,
  globalVariables,
  dataBaseData,
  getQueryResult,
  getFechaBLQ,
}) => {
  const validationUnTipoOrden = queryParams?.untipoorden === 'CESANTIAS'

  const aplica_resolucion = getFormValue('orden_pago.aplica_resolucion')

  const miparametroIsNot = globalVariables?.miparametro === 'NO'

  const validationMiParametro = miparametroIsNot && validationCompany.includes(nit_compania)

  const validationMiParametroThree =
    globalVariables?.miparametro3 === 'NO' || validationCompanyThree.includes(nit_compania)

  const validationMiParametroFour = globalVariables?.miparametro4 === 'NO'

  const validationMiParametroFive = globalVariables?.miparametro5 === 'NO'

  const dosQuebradasNit = 800099310

  const reqUnidadNegocio = globalVariables?.req_unidad_negocio === 'S'

  const defaultInputs = [
    {
      name: 'orden_pago.nrodoc',
      label: 'Número de orden',
      type: 'number',
      disabled: !validationCompanyForNroDoc?.includes(nit_compania),
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.prefijo',
      label: 'Prefijo',
      type: 'number',
      required: true,
      validate: (value) => {
        if (value >= 2010 && value <= new Date().getFullYear()) {
          return true
        }
        return 'El prefijo debe ser mayor a 2010 y menor o igual al año actual'
      },
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.orden',
      label: 'Número interno de orden',
      type: 'number',
      required: true,
      primaryKey: true,
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.fecha',
      label: 'Fecha',
      type: 'date',
      disabled: nit_compania === 891480085,
      defaultValue: dayjs(new Date()),
      required: true,
      validate: async (value) => {
        const fechaBLQ = await getFechaBLQ()
        if (
          globalVariables?.valida_fecha === 'S' &&
          nit_compania !== 891480085 &&
          new Date(value) < new Date(fechaBLQ)
        ) {
          return `La ordenes de pago están bloqueadas a ${dayjs(fechaBLQ).format('DD/MM/YYYY')}`
        }
        if (nit_compania === 891480085 && fechaBLQ) {
          if (new Date(value) > new Date(fechaBLQ)) {
            return `La ordenes de pago están bloqueadas a ${dayjs(fechaBLQ).format('DD/MM/YYYY')}`
          }
        }
        return true
      },
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.division',
      label: 'División',
      type: 'number',
      className: 'general_form_item md:col-span-8',
    },
    {
      name: 'orden_pago.estado',
      label: 'Estado',
      type: 'select',
      required: true,
      defaultValue: 'V',
      disabled: dataBaseData?.estado === 'A',
      validate: (value) => {
        if (dataBaseData?.estado === 'V' && value === 'A') {
          return true
        }
        if (!dataBaseData?.estado) {
          return true
        }
        if (dataBaseData?.estado === value) {
          return true
        }
        return 'No se puede cambiar el estado'
      },
      options: estadoOptions,
      className: 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pago.doc_ddas',
      label: 'Doc. DDAS',
      required: dosQuebradasNit,
      type: 'textfieldQuery',
      lovTitle: 'Doc. DDAS',
      onChange: (_, value) => {
        setFormValue('orden_pago.doc_ddas', value?.tipo_doc)
      },
      queryProps: {
        lovQuery: `SELECT
                        tipo_doc,
                        nombre_doc
                    FROM
                        tipos_doc_ddas
                    WHERE
                            nit_compania = ${nit_compania}
                        AND doc_siif = 'ORDEN_PAGO'`,
      },
      tableProps: {
        columns: [
          {
            field: 'tipo_doc',
            headerName: 'Tipo de documento',
          },
          {
            field: 'nombre_doc',
            headerName: 'Nombre del documento',
          },
        ],
      },
      className: dosQuebradasNit ? 'general_form_item md:col-span-7' : ' hidden',
    },
    {
      name: 'orden_pago.nro_ddas',
      label: 'Número DDAS',
      type: 'number',
      required: true,
      className: dosQuebradasNit ? 'general_form_item md:col-span-7' : 'hidden',
    },
    {
      name: 'orden_pago.recurso',
      label: 'Recurso',
      type: 'textfieldQuery',
      lovTitle: 'Recurso',
      onChange: (_, value) => {
        setFormValue('orden_pago.recurso', value?.recurso)
      },
      queryProps: {
        lovQuery: recursoQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'recurso',
            headerName: 'Recurso',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: validationUnTipoOrden ? 'general_form_item md:col-span-8' : 'hidden',
    },
    {
      name: 'orden_pago.clase_pago',
      label: 'Clase de pago',
      type: 'select',
      options: clasePagoOptions,
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.vigencia',
      label: 'Vigencia',
      type: 'select',
      defaultValue: 'VIGENCIA',
      options: [
        {
          value: 'VIGENCIA',
          label: 'Actual',
        },
        {
          value: 'RESERVA',
          label: 'Reserva',
        },
      ],
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.tipo_cpto',
      label: 'Tipo Con.',
      type: 'select',
      defaultValue: 'GASTO',
      options: [
        {
          value: 'GASTO',
          label: 'Gasto',
        },
        {
          value: 'INGRESO',
          label: 'Ingreso',
        },
      ],
      required: true,
      className: 'general_form_item md:col-span-18',
    },
    {
      name: 'orden_pago.id_centrocosto',
      label: 'Id de centro de costos',
      type: 'textfieldQuery',
      required: true,
      // TODO :required: nit_compania === 891480085,
      lovTitle: 'Centro de costos',
      onChange: (_, value) => {
        setFormValue('orden_pago.id_centrocosto', value?.id_centrocosto)
        setFormValue('orden_pago.nombre_centro', value?.nombre)
      },
      queryProps: {
        lovQuery: centroCostoQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'id_centrocosto',
            headerName: 'Id de centro de costos',
          },
          {
            field: 'nombre',
            headerName: 'Nombre centro de costos',
          },
        ],
      },
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pago.nombre_centro',
      label: 'Nombre centro de costo',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pago.tercero',
      label: 'Tercero',
      type: 'textfieldQuery',
      lovTitle: 'Tercero',
      onChange: (_, value) => {
        setFormValue('orden_pago.tercero', value?.tercero)
        setFormValue('orden_pago.tercero_type', value?.tipo)
        setFormValue('orden_pago.nombre_tercero', value?.nombre)
      },
      queryProps: {
        lovQuery: terceroQuery({ nit_compania, queryParams }),
      },
      tableProps: {
        columns: [
          {
            field: 'tercero',
            headerName: 'Tercero',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pago.nombre_tercero',
      label: 'Nombre del tercero',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pago.tercero_type',
      label: 'Tipo de persona',
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.id_girar_a',
      label: 'Identificación girar a',
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pago.girar_a',
      label: 'Girar a',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.facturas',
      label: 'Facturas',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.fecha_apli_devret',
      label: 'Fecha aplicación devolución retenciones',
      type: 'date',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.unidad_negocio',
      label: 'Código unidad de negocio',
      type: 'textfieldQuery',
      lovTitle: 'Unidad de negocio',
      required: reqUnidadNegocio,
      onChange: (_, value) => {
        setFormValue('orden_pago.unidad_negocio', value?.codigo)
        setFormValue('orden_pago.nombre_uni_neg', value?.nombre)
      },
      queryProps: {
        lovQuery: unidadNegocioQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'codigo',
            headerName: 'Código unidad de negocio',
          },
          {
            field: 'nombre',
            headerName: 'Nombre unidad de negocio',
          },
        ],
      },
      className: !reqUnidadNegocio
        ? 'hidden'
        : validationUnTipoOrden
        ? 'general_form_item md:col-span-15'
        : 'hidden',
    },
    {
      name: 'orden_pago.nombre_uni_neg',
      label: 'Nombre unidad de negocio',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pago.id_banco',
      label: 'Banco de pago',
      type: 'textfieldQuery',
      lovTitle: 'Banco de pago',
      onChange: (_, value) => {
        setFormValue('orden_pago.id_banco', value?.id_banco)
        setFormValue('orden_pago.nro_cuenta', value?.nro_cuenta)
        setFormValue('orden_pago.tipo_cuenta', value?.tipo_cuenta)
        setFormValue('orden_pago.nro_cuenta_fidu', value?.nro_cuenta_fidu)
        setFormValue('orden_pago.nombre_cuenta', value?.nombre_cuenta)
      },
      queryProps: {
        lovQuery: idBancoQuery({ nit_compania, getFormValue }),
      },
      tableProps: {
        columns: [
          {
            field: 'id_banco',
            headerName: 'Banco',
          },
          {
            field: 'nombre_cuenta',
            headerName: 'Nombre cuenta',
          },
        ],
      },
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-5',
    },
    {
      name: 'orden_pago.nombre_cuenta',
      label: 'Nombre de la cuenta',
      InputProps: {
        readOnly: true,
      },
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-10',
    },
    {
      name: 'orden_pago.nro_cuenta',
      label: 'Cuenta',
      type: 'number',
      disabled: true,
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.tipo_cuenta',
      label: 'Tipo cuenta',
      type: 'select',
      defaultValue: 'C',
      options: tipoCuentaOptions,
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pago.nro_cuenta_fidu',
      label: 'Número de cuenta fiduciaria',
      type: 'textfieldQuery',
      lovTitle: 'Número de cuenta fiduciaria',
      onChange: (_, value) => {
        setFormValue('orden_pago.id_banco', value?.id_banco)
        setFormValue('orden_pago.nro_cuenta', value?.nro_cuenta)
        setFormValue('orden_pago.tipo_cuenta', value?.tipo_cuenta)
        setFormValue('orden_pago.nro_cuenta_fidu', value?.nro_cuenta_fidu)
        setFormValue('orden_pago.nombre_cuenta', value?.nombre_cuenta)
      },
      queryProps: {
        lovQuery: idBancoQuery({ nit_compania, getFormValue }),
      },
      tableProps: {
        columns: [
          {
            field: 'nro_cuenta_fidu',
            headerName: 'Número de cuenta fiduciaria',
          },
          {
            field: 'nombre_cuenta',
            headerName: 'Nombre cuenta fiduciaria',
          },
          {
            field: 'id_banco',
            headerName: 'Banco',
          },
          {
            field: 'nro_cuenta',
            headerName: 'Número de cuenta',
          },
          {
            field: 'tipo_cuenta',
            headerName: 'Tipo de cuenta',
          },
        ],
      },
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pago.nombre_cuenta_fidu',
      label: 'Nombre cuenta fiduciaria',
      InputProps: {
        readOnly: true,
      },
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pago.concepto',
      label: 'Concepto de pago',
      type: 'text',
      required: true,
      multiline: true,
      minRows: 3,
      className: 'col-span-36',
    },
    {
      name: 'orden_pago.id_tipo_ret',
      label: 'Tipo de retención',
      type: 'textfieldQuery',
      lovTitle: 'Tipo de retención',
      onChange: (_, value) => {
        setFormValue('orden_pago.id_tipo_ret', value?.id_tipo_ret)
      },
      queryProps: {
        lovQuery: idTipoRetQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'id_tipo_ret',
            headerName: 'Tipo de retención',
          },
          {
            field: 'descripcion',
            headerName: 'Descripción',
          },
        ],
      },
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.cpto_causacion',
      label: 'Cpto. Causación',
      type: 'textfieldQuery',
      lovTitle: 'Cpto. Causación',
      onChange: (_, value) => {
        setFormValue('orden_pago.cpto_causacion', value?.cpto_causacion)
        setFormValue('orden_pago.nombre_cpto_causacion', value?.nombre)
      },
      queryProps: {
        lovQuery: cptoCausacionQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'cpto_causacion',
            headerName: 'Cpto. Causación',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.nombre_cpto_causacion',
      label: 'Nombre Cpto. Causación',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-18',
    },
    {
      name: 'orden_pago.tercero_embargo',
      label: 'Identificación tercer embargo',
      type: 'textfieldQuery',
      lovTitle: 'Tercer embargo',
      disabled: true,
      onChange: (_, value) => {
        setFormValue('orden_pago.tercero_embargo', value?.tercero)
        setFormValue('orden_pago.tercero_type_emb', value?.tercero_type)
        setFormValue('orden_pago.nombre_tercero_emb', value?.nombre)
      },
      queryProps: {
        lovQuery: terceroEmbargoQuery({ nit_compania, queryParams }),
      },
      tableProps: {
        columns: [
          {
            field: 'tercero',
            headerName: 'Identificación',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pago.nombre_tercero_emb',
      label: 'Nombre tercer embargo',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pago.valor_embargo',
      label: 'Valor embargo',
      type: 'money',
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.cpto_anticipo',
      label: 'Cpto. Anticipo',
      type: 'textfieldQuery',
      lovTitle: 'Cpto. Anticipo',
      onChange: (_, value) => {
        setFormValue('orden_pago.cpto_anticipo', value?.cpto_anticipo)
        setFormValue('orden_pago.nombre_cpto_anticipo', value?.nombre)
      },
      queryProps: {
        lovQuery: cptoAnticiposQuery({ nit_compania }),
      },
      tableProps: {
        columns: [
          {
            field: 'cpto_anticipo',
            headerName: 'Cpto. Anticipo',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.nombre_cpto_anticipo',
      label: 'Nombre Cpto. Anticipo',
      className: 'general_form_item md:col-span-20',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'orden_pago.anticipo',
      label: 'Anticipo',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pago.concepto_exo',
      label: 'Concepto exento',
      type: 'select',
      options: [
        {
          value: 'COMP',
          label: 'Compras',
        },
        {
          value: 'SERV',
          label: 'Servicios',
        },
        {
          value: 'TARJ',
          label: 'Ventas con tarjeta',
        },
        {
          value: 'PERS_NATU',
          label: 'Honorarios persona natural',
        },
      ],
      className: validationCompanyForConpEXO?.includes(nit_compania)
        ? 'hidden'
        : 'xs:col-span-36 lg:col-span-36',
    },
    {
      name: 'orden_pago.nrodoc_rel',
      label: 'Número documento relacionado',
      type: 'textfieldQuery',
      lovTitle: 'Número documento relacionado',
      onChange: (_, value) => {
        setFormValue('orden_pago.nrodoc_rel', value?.nrodoc)
        setFormValue('orden_pago.concepto_relacionado', value?.concepto)
        setFormValue('orden_pago.tipo_relacionado', value?.tipo_compptal)
        setFormValue('orden_pago.nro_relacionado', value?.nro_comprobantepptal)
      },
      queryProps: {
        lovQuery: nroDocRelQuery({ nit_compania, getFormValue }),
      },
      tableProps: {
        columns: [
          {
            field: 'nrodoc',
            headerName: 'Número documento',
          },
          {
            field: 'concepto',
            headerName: 'Concepto',
          },
          {
            field: 'tipo_compptal',
            headerName: 'Tipo de comprobante',
          },
          {
            field: 'nro_comprobantepptal',
            headerName: 'Número de comprobante',
          },
        ],
      },
      className: validationMiParametroFive ? 'hidden' : 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pago.nro_resolucion',
      label: 'Número de resolución',
      validate: (value) => {
        if (!aplica_resolucion) return true
        const responseValidate = getQueryResult(`SELECT
                                                      count(*) count
                                                  FROM
                                                      orden_pago
                                                  WHERE
                                                          nit_compania = ${nit_compania}
                                                      AND tipo = 'CESANTIAS'
                                                      AND nro_resolucion = ${value}`)
        const count = responseValidate?.data?.[0]?.count ?? 0
        if (count > 0) {
          return 'Ya existe una resolución con este número'
        }

        return true
      },
      className: `${aplica_resolucion ? 'general_form_item md:col-span-15' : 'hidden'}`,
    },
    {
      name: 'orden_pago.concepto_relacionado',
      label: 'Concepto relacionado',
      multiline: true,
      minRows: 3,
      InputProps: {
        readOnly: true,
      },
      className: validationMiParametroFive ? 'hidden' : 'col-span-36',
    },

    {
      name: 'orden_pago.cxp_marca',
      label: 'CXP Marca',
      type: 'switch',
      className: validationMiParametroFour ? 'hidden' : 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.intereses_cec',
      label: 'Intereses CEC',
      type: 'switch',
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.devolucion_retenciones',
      label: 'Devolución retenciones',
      type: 'switch',
      className:
        !validationUnTipoOrden && nit_compania !== 891900272
          ? 'hidden'
          : 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.recalcular_impuesto',
      label: 'Recalcular impuestos',
      defaultValue: true,
      type: 'switch',
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.sin_situacion',
      label: 'Sin situación de fondos',
      type: 'switch',
      className: validationCompanyForSinSituacion?.includes(nit_compania)
        ? 'general_form_item md:col-span-9'
        : 'hidden',
    },
    {
      name: 'orden_pago.viaticos',
      label: 'Viáticos',
      type: 'switch',
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.covid_cgn',
      label: 'COVID CGN',
      type: 'switch',
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.planilla_aportes',
      label: 'Planilla aportes',
      type: 'switch',
      className: 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.aplica_resolucion',
      label: 'Aplica resolución',
      type: 'switch',
      className: validationMiParametroThree ? 'hidden' : 'general_form_item md:col-span-9',
    },
    {
      name: 'orden_pago.ter_anticipada',
      label: 'Terminación anticipada',
      type: 'switch',
      className: 'general_form_item md:col-span-21',
    },
    {
      id: 'orden_pago.imprimir',
      children: 'Imprimir',
      type: 'button',
      className: 'general_form_item md:col-span-7',
      endIcon: <Article />,
    },
  ]

  return { masterInputs: defaultInputs }
}

export default useMasterInputs
