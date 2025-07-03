const useRequiredInputs = ({ form }) => {
  const id_registro_ari = form.watch('id_registro_ari') ?? ''
  const medio_reunion = form.watch('medio_reunion') ?? ''
  const tipo_reunion = form.watch('tipo_reunion') ?? ''
  const fecha_reunion = form.watch('fecha_reunion') ?? ''

  const numero_contrato = form.watch('numero_contrato') ?? ''
  const valor_contrato_proyecto = form.watch('valor_contrato_proyecto') ?? ''
  const nombre_proyecto = form.watch('nombre_proyecto') ?? ''
  const objeto_contrato = form.watch('objeto_contrato') ?? ''
  const avance_fisico_programado = form.watch('avance_fisico_programado') ?? ''
  const avance_fisico_actual = form.watch('avance_fisico_actual') ?? ''
  const avance_financiero_actual = form.watch('avance_financiero_actual') ?? ''

  const problematica = form.watch('problematica') ?? ''
  const resultados_e_interveciones = form.watch('resultados_e_interveciones') ?? ''

  const requiredInputsStep0 = {
    id_registro_ari,
    medio_reunion,
    tipo_reunion,
    fecha_reunion,
  }

  const requiredInputsStep1 = {
    numero_contrato,
    valor_contrato_proyecto,
    nombre_proyecto,
    objeto_contrato,
    avance_fisico_programado,
    avance_fisico_actual,
    avance_financiero_actual,
  }

  const requiredInputsStep2 = {
    problematica,
    resultados_e_interveciones,
  }

  return { requiredInputsStep0, requiredInputsStep1, requiredInputsStep2 }
}

export default useRequiredInputs
