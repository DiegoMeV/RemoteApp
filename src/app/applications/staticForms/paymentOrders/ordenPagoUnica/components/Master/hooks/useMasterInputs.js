import { Article } from '@mui/icons-material'
import {
  clasePagoOptions,
  estadoOptions,
  firstValidationTipo,
  tipoCuentaOptions,
  tipoOptions,
} from '../constants'
import {
  centroCostoQuery,
  idBancoQuery,
  nroDocContratoQuery,
  onChangeNroDocContrato,
  onChangeTipo,
  onClickRegenerarValor,
  terceroEmbargoQuery,
  tipoContratoQuery,
  unidadNegocioQuery,
  validateNroDocContrato,
} from '../funcs'
import dayjs from 'dayjs'

const validationCompany = [890102006, 8901020061, 8901020062, 890480059, 891780009, 901128252]

const useMasterInputs = ({
  nit_compania,
  queryParams,
  queryParamsPks,
  getFormValue,
  setFormValue,
  globalVariables,
  dataBaseData,
  getProcedureResult,
  onSubmit,
  getQueryResult,
  handleChangeTab,
  getFechaBLQ,
}) => {
  const tipo = getFormValue('orden_pagou.tipo')

  const tipoIsAnticipo = tipo === 'ANTICIPO'

  const validationTipo = firstValidationTipo.includes(tipo)
  // const validationTipoTwo = secondValidationTipo.includes(tipo)

  const miparametroIsNot = globalVariables?.miparametro === 'NO'

  const validationMiParametro = miparametroIsNot && validationCompany.includes(nit_compania)

  const defaultInputs = [
    {
      name: 'orden_pagou.tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      onChange: async (e) => onChangeTipo({ e, setFormValue, handleChangeTab }),
      options: tipoOptions,
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pagou.nrodoc',
      label: 'Número de orden',
      type: 'number',
      disabled: nit_compania === 891900624 ? false : true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.prefijo',
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
      name: 'orden_pagou.orden',
      label: 'Número interno de orden',
      type: 'number',
      required: true,
      primaryKey: true,
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    // TODO : Validaciones de privilegios para reemplazar SSY
    {
      name: 'orden_pagou.estado',
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
      className: 'general_form_item md:col-span-15',
    },
    // TODO : Validaciones con función de forma
    {
      name: 'orden_pagou.fecha',
      label: 'Fecha',
      type: 'date',
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
      name: 'orden_pagou.division',
      label: 'División',
      type: 'number',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.clase_pago',
      label: 'Clase de pago',
      type: 'select',
      disabled: true,
      options: clasePagoOptions,
      className: 'general_form_item md:col-span-7',
    },
    // Post change función de forma comentada ??
    {
      name: 'orden_pagou.tipo_contrato',
      label: 'Orden de gasto',
      type: 'textfieldQuery',
      required: true,
      lovTitle: 'Tipo de contrato',
      validate: (value) => {
        if (tipo === 'AVANCES' && value !== 'RESOLUCIONES AVANCES') {
          return 'Para Avances debe utilizar tipo de gasto RESOLUCIÓN AVANCES'
        }
        return true
      },
      onChange: (_, value) => {
        setFormValue('orden_pagou.tipo_contrato', value?.tipo_contrato)
      },
      queryProps: {
        lovQuery: tipoContratoQuery({ nit_compania, queryParams }),
      },
      tableProps: {
        columns: [
          {
            field: 'tipo_contrato',
            headerName: 'Tipo Contrato',
          },
          {
            field: 'descripcion',
            headerName: 'Descripción',
          },
        ],
      },
      className: 'general_form_item md:col-span-22',
    },
    {
      name: 'orden_pagou.nrodoc_contrato',
      label: 'Número de contrato',
      type: 'textfieldQuery',
      lovTitle: 'Número de contrato',
      required: true,
      validate: async () => {
        await validateNroDocContrato({
          getQueryResult,
          getFormValue,
          nit_compania,
          setFormValue,
        })
      },
      onChange: async (_, value) => {
        await onChangeNroDocContrato({
          nit_compania,
          getFormValue,
          globalVariables,
          value,
          setFormValue,
          getQueryResult,
        })
      },
      queryProps: {
        lovQuery: nroDocContratoQuery({
          nit_compania,
          getFormValue,
          globalVariables,
          queryParams,
        }),
      },
      tableProps: {
        columns: [
          {
            field: 'nro_contrato',
            headerName: 'Número de contrato',
          },
          {
            field: 'descripcion',
            headerName: 'Descripción',
          },
        ],
      },
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.nro_contrato',
      label: 'Número interno de contrato',
      disabled: true,
      type: 'number',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.id_centrocosto',
      label: 'Id de centro de costos',
      type: 'textfieldQuery',
      lovTitle: 'Centro de costos',
      onChange: (_, value) => {
        setFormValue('orden_pagou.id_centrocosto', value?.id_centrocosto)
        setFormValue('orden_pagou.nombre_centro', value?.nombre)
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
      name: 'orden_pagou.nombre_centro',
      label: 'Nombre centro de costo',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pagou.desc_contrato',
      label: 'Descripción del contrato',
      type: 'text',
      multiline: true,
      minRows: 3,
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-36',
    },
    {
      name: 'orden_pagou.tercero',
      label: 'Proveedor',
      type: 'number',
      disabled: true,
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pagou.nombre_tercero',
      label: 'Nombre del proveedor',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pagou.tercero_type',
      label: 'Tipo de persona',
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.unidad_negocio',
      label: 'Código unidad de negocio',
      type: 'textfieldQuery',
      lovTitle: 'Unidad de negocio',
      onChange: (_, value) => {
        setFormValue('orden_pagou.unidad_negocio', value?.unidad_negocio)
        setFormValue('orden_pagou.nombre_uni_neg', value?.nombre)
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
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pagou.nombre_uni_neg',
      label: 'Nombre unidad de negocio',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-21',
    },
    {
      name: 'orden_pagou.id_banco',
      label: 'Banco de pago',
      type: 'textfieldQuery',
      lovTitle: 'Banco de pago',
      onChange: (_, value) => {
        setFormValue('orden_pagou.id_banco', value?.id_banco)
        setFormValue('orden_pagou.nro_cuenta', value?.nro_cuenta)
        setFormValue('orden_pagou.tipo_cuenta', value?.tipo_cuenta)
        setFormValue('orden_pagou.nro_cuenta_fidu', value?.nro_cuenta_fidu)
        setFormValue('orden_pagou.nombre_banco', value?.nombre_cuenta)
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
      name: 'orden_pagou.nombre_banco',
      label: 'Nombre del banco',
      InputProps: {
        readOnly: true,
      },
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-10',
    },
    {
      name: 'orden_pagou.nro_cuenta',
      label: 'Cuenta',
      type: 'number',
      disabled: true,
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.tipo_cuenta',
      label: 'Tipo',
      type: 'select',
      options: tipoCuentaOptions,
      className: validationMiParametro ? 'hidden' : 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.anticipo',
      label: 'Amortización de anticipo',
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.concepto',
      label: 'Concepto de pago',
      type: 'text',
      required: true,
      multiline: true,
      minRows: 3,
      className: 'col-span-36',
    },
    {
      name: 'orden_pagou.tercero_embargo',
      label: 'Identificación tercer embargo',
      type: 'textfieldQuery',
      lovTitle: 'Tercer embargo',
      disabled: true,
      onChange: (_, value) => {
        setFormValue('orden_pagou.tercero_embargo', value?.tercero)
        setFormValue('orden_pagou.tercero_type_emb', value?.tercero_type)
        setFormValue('orden_pagou.nombre_tercero_emb', value?.nombre)
      },
      queryProps: {
        lovQuery: terceroEmbargoQuery({ nit_compania }),
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
      name: 'orden_pagou.nombre_tercero_emb',
      label: 'Nombre tercer embargo',
      InputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-14',
    },
    {
      name: 'orden_pagou.valor_embargo',
      label: 'Valor embargo',
      type: 'money',
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.valor',
      label: 'Valor de la orden',
      type: 'money',
      disabled: !tipoIsAnticipo,
      onChange: (e) => {
        setFormValue('orden_pagou.valor', e.target.value)

        const tipo = getFormValue('orden_pagou.tipo')

        if (tipo === 'ANTICIPO') {
          setFormValue('orden_pagou.total_orden', e.target.value)
        }
      },
      className: 'general_form_item md:col-span-15',
    },
    {
      name: 'orden_pagou.iva',
      label: 'Iva de la orden',
      type: 'money',
      disabled: !tipoIsAnticipo,
      className: `${validationTipo ? 'hidden' : 'general_form_item md:col-span-14'}`,
    },
    {
      name: 'orden_pagou.total_orden',
      label: 'Total de la orden',
      type: 'money',
      disabled: true,
      className: 'general_form_item md:col-span-7',
    },
    {
      name: 'orden_pagou.recalcular_impuesto',
      label: 'Recalcular impuestos',
      defaultValue: true,
      type: 'switch',
      className: 'general_form_item md:col-span-36',
    },
    {
      name: 'orden_pagou.ter_anticipada',
      label: 'Terminación anticipada',
      type: 'switch',
      className: 'general_form_item md:col-span-15',
    },
    {
      id: 'orden_pagou.regenerar_valor',
      children: 'Regenerar Valor',
      type: 'button',
      onClick: async () => {
        await onClickRegenerarValor({
          getFormValue,
          nit_compania,
          queryParamsPks,
          getProcedureResult,
          setFormValue,
          onSubmit,
        })
      },
      className: `${validationTipo ? 'hidden' : 'general_form_item md:col-span-7'}`,
    },
    {
      id: 'orden_pagou.imprimir',
      children: 'Imprimir',
      type: 'button',
      className: 'general_form_item md:col-span-7',
      endIcon: <Article />,
    },
  ]

  return { masterInputs: defaultInputs }
}

export default useMasterInputs
