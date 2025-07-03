import dayjs from 'dayjs'
import { MagicString, useOracleExecutes } from '@/libV4'

const useValidateBudgetMovement = ({ row, nit_compania }) => {
  const { getProcedureResult, isPendingProcedure } = useOracleExecutes()

  const handleValidateValue = async () => {
    const params = {
      UnaCompania: { type: 'IN', value: nit_compania },
      UnNroRelacionado: { type: 'IN', value: row?.nro_relacionado ?? null },
      UnTipoRelacionado: { type: 'IN', value: row?.tipo_relacionado ?? null },
      UnaFechaCompptal: {
        type: 'IN',
        value: row?.fecha ? dayjs(row.fecha).format(MagicString.DATE_FORMAT.ORACLE_FORMAT) : null,
      },
      UnNroComprobantepptal: { type: 'IN', value: row?.nro_comprobantepptal ?? null },
      UnTipoCompptal: { type: 'IN', value: row?.tipo_compptal ?? null },
      UnTipoPpto: { type: 'IN', value: row?.tipo_ppto ?? null },
      UnRubroId: { type: 'IN', value: row?.rubro_id ?? null },
      UnRecurso: { type: 'IN', value: row?.recurso ?? null },
      UnIdCentrocosto: { type: 'IN', value: row?.id_centrocosto ?? null },
      UnProyecto: { type: 'IN', value: row?.proyecto ?? null },
      UnaFuenteId: { type: 'IN', value: row?.fuente_id ?? null },
      UnCpc: { type: 'IN', value: row?.cpc ?? null },
      UnCpi: { type: 'IN', value: row?.cpc ?? null },
      UnNromovpptal: { type: 'IN', value: row?.nromovpptal ?? null },
      UnNromovpptalRel: { type: 'IN', value: row?.nromovpptal_rel ?? null },
      UnaVigFutura: { type: 'IN', value: row?.VigFutura ?? null },
      UnaSoliComp: { type: 'IN', value: row?.soli_comp ?? null },
      UnNumeroRubro: { type: 'IN', value: row?.numero_rubro ?? null },
      UnTerceroBd: { type: 'IN', value: row?.tercero_bd ?? null },
      UnTerceroTypeBd: { type: 'IN', value: row?.tercero_type_bd ?? null },
      UnRelacionado: { type: 'IN', value: row?.nrodoc_rel ?? null },
      UnaAdicion: { type: 'IN', value: row?.adicion ?? null },
      UnaConfPac: { type: 'IN', value: row?.conf_pac ?? null },
      UnMovPresupuestalValor: { type: 'INOUT', value: row?.valor ?? null },
      OutAfectado: { type: 'OUT' },
      OutSaldorubro: { type: 'OUT' },
      OutStatus: { type: 'OUT' },
      OutMessage: { type: 'OUT' },
    }

    const response = await getProcedureResult({
      statement: `BEGIN siif.pkgweb_comprobantepptalw.movpptal_valor_when_validate(
        :UnaCompania, :UnNroRelacionado, :UnTipoRelacionado, :UnaFechaCompptal,
        :UnNroComprobantepptal, :UnTipoCompptal, :UnTipoPpto, :UnRubroId,
        :UnRecurso, :UnIdCentrocosto, :UnProyecto, :UnaFuenteId,
        :UnCpc, :UnCpi, :UnNromovpptal, :UnNromovpptalRel,
        :UnaVigFutura, :UnaSoliComp, :UnNumeroRubro, :UnTerceroBd,
        :UnTerceroTypeBd, :UnRelacionado, :UnaAdicion, :UnaConfPac,
        :UnMovPresupuestalValor, :OutAfectado, :OutSaldorubro,
        :OutStatus, :OutMessage); END;`,
      params,
    })

    return response?.data?.outBinds
  }

  return { handleValidateValue, isPendingProcedure }
}

export default useValidateBudgetMovement
