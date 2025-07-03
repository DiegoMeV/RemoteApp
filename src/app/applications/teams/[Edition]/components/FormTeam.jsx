import { GenericAlertForm } from '@/app/applications/components'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { editFunc } from '../funcs'
import { useNavigate } from 'react-router-dom'
import { inputsTeams } from '../constants'
import { useRequestTeam } from '../hooks'

const FormTeam = ({ teamInfo, idEdition }) => {
  const navigate = useNavigate()
  const teamValues = teamInfo?.data?.[0] || {}
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: teamValues?.nombre,
      activo: teamValues?.activo === 'S' ? true : false,
    },
  })

  const { createTeam, editTeam, loadingUpdate } = useRequestTeam(idEdition)

  const onSubmit = async (data) => {
    data.activo = data.activo === true ? 'S' : 'N'
    await editFunc(data, createTeam, editTeam, idEdition)
  }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={inputsTeams}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/teams`)}
      />
    </>
  )
}

export default FormTeam
