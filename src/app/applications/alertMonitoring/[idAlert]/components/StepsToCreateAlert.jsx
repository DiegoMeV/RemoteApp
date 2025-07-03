import { useForm } from 'react-hook-form'
import ViewStepsUpdateAlert from './ViewStepsUpdateAlert'

const StepsToCreateAlert = ({ infoAlert, idAlert }) => {
  const { control } = useForm({
    defaultValues: {
      identificador: infoAlert?.identificador ?? '',
      modelo: infoAlert?.modeloInfo?.nombre ?? '',
      criterio: infoAlert?.criterioInfo?.nombre ?? '',
      categoria: infoAlert?.categoriaInfo?.nombre ?? '',
      fecha: new Date().toISOString().slice(0, 10) ?? '',
      descripcion: infoAlert?.descripcion ?? '',
    },
  })

  return (
    <ViewStepsUpdateAlert
      control={control}
      idAlert={idAlert}
    />
  )
}

export default StepsToCreateAlert
