import {
  AccountBalanceOutlined,
  InsertEmoticonOutlined,
  RateReviewOutlined,
  LiveHelpOutlined,
  SmsFailedOutlined,
  FileCopyOutlined,
  ChatOutlined,
  SearchOutlined,
} from '@mui/icons-material'
export const typeProcess = [
  {
    icon: (
      <SearchOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Consulta',
    keyName: 'inquiry',
    description: {
      short:
        'Solicitud para aclarar dudas sobre los servicios, trámites, normativas o competencias de la entidad.',
      full: 'Solicitud para aclarar dudas sobre los servicios, trámites, normativas o competencias de la entidad. Se utiliza para obtener información clara sobre procedimientos, requisitos, canales de atención o temas relacionados con las funciones  de la entidad. No implica queja ni inconformidad.',
    },
  },
  {
    icon: (
      <AccountBalanceOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Denuncia',
    keyName: 'report',
    description: {
      short:
        'Informe sobre una conducta irregular o ilegal relacionada con la entidad o sus funcionarios.',
      full: 'Informe sobre una conducta irregular o ilegal relacionada con la entidad o sus funcionarios. Sirve para reportar hechos de corrupción, mal uso de recursos,  conflictos de interés u otras actuaciones que puedan vulnerar el orden  legal o ético. Puede requerir anonimato y seguimiento especial.',
    },
  },
  {
    icon: (
      <InsertEmoticonOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Felicitaciones',
    keyName: 'praise',
    description: {
      short:
        'Reconocimiento por la buena atención, gestión o comportamiento de funcionarios o servicios.',
      full: 'Reconocimiento por la buena atención, gestión o comportamiento de funcionarios o servicios. Permite destacar aspectos positivos del servicio prestado, generar  motivación institucional y fortalecer la cultura de buen servicio en la  entidad.',
    },
  },
  {
    icon: (
      <RateReviewOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Petición de interés general o particular',
    keyName: 'request',
    description: {
      short:
        'Solicitud formal para requerir una actuación de la entidad, ya sea individual o colectiva.',
      full: 'Solicitud formal para requerir una actuación de la entidad, ya sea individual o colectiva. Incluye solicitudes de apoyo, intervenciones, autorizaciones, entre  otros. Se utiliza cuando el ciudadano necesita que la entidad actúe  frente a un asunto específico que no implica inconformidad.',
    },
  },
  {
    icon: (
      <LiveHelpOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Queja',
    keyName: 'complaint',
    description: {
      short:
        'Inconformidad con la conducta de un funcionario o la forma en que se brindó un servicio.',
      full: 'Inconformidad con la conducta de un funcionario o la forma en que se brindó un servicio. Se presenta cuando el ciudadano percibe maltrato, falta de cortesía,  desinterés o incumplimiento en la atención recibida. La entidad debe  investigar y mejorar la situación.',
    },
  },
  {
    icon: (
      <SmsFailedOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Reclamo',
    keyName: 'claim',
    description: {
      short:
        'Manifestación por una falla en el servicio, incumplimiento o respuesta insatisfactoria.',
      full: 'Manifestación por una falla en el servicio, incumplimiento o respuesta insatisfactoria. Aplica cuando hubo una solicitud anterior y la respuesta fue negativa,  demorada o inexistente. El ciudadano busca una corrección,  compensación o solución concreta.',
    },
  },
  {
    icon: (
      <FileCopyOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Solicitud de documentos y/o información',
    keyName: 'documentRequest',
    description: {
      short: 'Petición para acceder a información o copias de documentos en poder de la entidad.',
      full: 'Petición para acceder a información o copias de documentos en poder de la entidad. Amparada por el derecho fundamental de acceso a la información  pública. La respuesta debe cumplir con los plazos y condiciones  establecidos por la ley de transparencia.',
    },
  },
  {
    icon: (
      <ChatOutlined
        color='primary'
        sx={{ fontSize: 60 }}
      />
    ),
    title: 'Sugerencias',
    keyName: 'suggestion',
    description: {
      short: 'Propuesta para mejorar la atención, procesos o servicios ofrecidos por la entidad.',
      full: 'Propuesta para mejorar la atención, los procesos o servicios ofrecidos por la entidad. Aporta ideas que puedan ayudar a optimizar la eficiencia, cobertura o calidad. No requiere respuesta formal, pero se consideran en mejora continua.',
    },
  },
]
