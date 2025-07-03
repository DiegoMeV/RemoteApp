import { Typography } from '@mui/material'

const TitleSection = () => {
  return (
    <div className='flex flex-col text-center mb-8'>
      <Typography
        variant='customTitle'
        fontSize={'44px'}
      >
        Centro de Atención al ciudadano
      </Typography>
      <Typography variant='customSubtitle'>
        Radique, consulte su Petición, Queja, Reclamo, Sugerencia, Denuncia o felicitaciones.
      </Typography>
    </div>
  )
}

export default TitleSection
