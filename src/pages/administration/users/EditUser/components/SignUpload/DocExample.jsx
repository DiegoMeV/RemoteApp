import { useImage } from '@/lib'
import { isEmpty } from '@/libV4'
import { LinearProgress, Typography } from '@mui/material'

const DocExample = ({ name, signImg }) => {
  const { data: dataImage, isFetching: isLoadingImg } = useImage(signImg, {
    enabled: !isEmpty(signImg),
  })
  return (
    <div className='document-preview p-6 border border-gray-300 rounded shadow-md max-w-[500px] min-h-[500px] backgroundwhite1'>
      <h2 className='text-xl font-bold mb-2'>Título del Documento</h2>
      <br />
      <h3 className='text-lg font-semibold mb-2'>Asunto del Documento</h3>
      <br />

      <div className='body mb-4'>
        <p>
          A través del presente documento, se detallan los aspectos fundamentales relacionados con
          el tema en cuestión. Se expone la información relevante de manera clara y concisa,
          garantizando que todos los puntos sean abordados de forma estructurada y comprensible.
        </p>
        <br />
        <p>
          En primer lugar, se presenta un análisis detallado de la situación actual, seguido de una
          evaluación de los posibles escenarios y soluciones. La información aquí contenida ha sido
          revisada y estructurada para garantizar su precisión y relevancia.
        </p>
        <br />
        <p>
          Finalmente, se establecen las conclusiones y recomendaciones basadas en el análisis
          presentado. Se invita a los destinatarios a revisar detenidamente el contenido del
          documento y, en caso de ser necesario, proporcionar comentarios o sugerencias adicionales.
        </p>
      </div>
      <br />
      <br />
      <br />

      <div className='signature mt-4'>
        {isEmpty(signImg) ? (
          <Typography
            color='primary'
            fontWeight='bold'
          >
            El usuario no tiene una firma que mostrar
          </Typography>
        ) : isLoadingImg ? (
          <LinearProgress />
        ) : (
          <img
            alt='Imagen de firma'
            src={dataImage?.url ?? null}
            width='200px'
            height='auto'
          />
        )}
        <div className='signature-placeholder h-16 border-t border-gray-400 mt-2'>{name}</div>
      </div>
    </div>
  )
}

export default DocExample
