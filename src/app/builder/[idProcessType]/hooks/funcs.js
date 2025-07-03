import { Position } from 'reactflow'
import { stratify, tree } from 'd3-hierarchy'
import {
  AssignmentInd,
  AssignmentOutlined,
  DownloadForOfflineOutlined,
  DriveFileRenameOutline,
  FileUploadOutlined,
  PostAddOutlined,
  RateReviewOutlined,
  ViewTimeline,
  AddAlertOutlined,
  RecentActorsOutlined,
  Email,
  Numbers,
  ApprovalOutlined,
  NotificationAddOutlined,
  EditNotificationsOutlined,
  DvrOutlined,
  ConnectWithoutContactOutlined,
  GradingOutlined,
  LoopOutlined,
  AddLinkOutlined,
  PriceCheckOutlined,
  FindInPageOutlined,
  MoveUp,
  LeakAdd,
  AssignmentReturn,
} from '@mui/icons-material'
import { baseUrls } from '@/lib'
import toast from 'react-hot-toast'

//TODO: Save in a single folder for the Reactflow Layout
export const positionMap = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
}

//TODO: Reactflow Layout
const layoutHorizontal = tree()
  .nodeSize([150, 300])
  .separation(() => 1)
const layoutVertical = tree()
  .nodeSize([200, 150])
  .separation(() => 1)

//TODO: Reactflow Layout
const options = { duration: 300 }

//TODO: Reactflow Layout
export const getLayoutRoot = (orientation, hierarchy, setDirection) => {
  if (orientation === 'horizontal') {
    setDirection('LR')
    const root = layoutHorizontal(hierarchy)
    return root.descendants().map((d) => ({ ...d.data, position: { x: d.y, y: d.x } }))
  } else {
    setDirection('TB')
    const root = layoutVertical(hierarchy)
    return root.descendants().map((d) => ({ ...d.data, position: { x: d.x, y: d.y } }))
  }
}

//TODO: Reactflow Layout
export const layoutNodes = (nodes, edges, orientation, setDirection) => {
  try {
    if (
      !Array.isArray(nodes) ||
      !Array.isArray(edges) ||
      typeof orientation !== 'string' ||
      typeof setDirection !== 'function'
    ) {
      toast.error('Parámetros inválidos.')
      return []
    }

    if (nodes.length === 0 || edges.length === 0) {
      toast.error('No hay nodos o aristas para procesar.')
      return []
    }

    const hierarchy = stratify()
      .id((d) => d.id)
      .parentId((d) => (edges.find((e) => e.target === d.id) || {}).source)(nodes)

    const layoutRoot = getLayoutRoot(orientation, hierarchy, setDirection)

    return layoutRoot
  } catch (error) {
    toast.error('Error inesperado:', error)
    return []
  }
}

//TODO: Reactflow Layout
export const updateNodesIntermediateState = (transitions, elapsed, direction, setNodes) => {
  const s = elapsed / options.duration

  const currNodes = transitions.map(({ node, from, to }) => {
    return {
      id: node.id,
      position: {
        x: from.x + (to.x - from.x) * s,
        y: from.y + (to.y - from.y) * s,
      },
      data: { ...node.data },
      type: node.type,
      sourcePosition: positionMap[direction[1]],
      targetPosition: positionMap[direction[0]],
      node,
    }
  })

  setNodes(currNodes)
}

//TODO: Reactflow Layout
export const updateNodesFinalState = (transitions, edges, direction, setNodes, setStagesNEdges) => {
  const finalNodes = transitions.map(({ node, to }) => {
    return {
      id: node.id,
      position: {
        x: to.x,
        y: to.y,
      },
      data: { ...node.data },
      type: node.type,
      sourcePosition: positionMap[direction[1]],
      targetPosition: positionMap[direction[0]],
    }
  })

  setNodes(finalNodes)

  const stagesInfo = {
    stages: finalNodes,
    connections: edges,
  }
  setStagesNEdges(stagesInfo)
}

//TODO: Reactflow Layout
export const fitViewSize = (fitView) => {
  setTimeout(() => {
    fitView({ duration: 200, padding: 0.2 })
  }, 0)
}

//TODO: Convert the words 'action' and 'actions' to consts or use a file in the utils folder
//to save the magic words/magic strings.
export const actionCountPerTask = (taskStage, idTask) => {
  const MINIMUN_SIZE_ACTIONS = 1
  const taskToDelete = taskStage.find((task) => task.id === idTask)
  const messageTask =
    taskToDelete?.Actions?.length === MINIMUN_SIZE_ACTIONS
      ? `${taskToDelete?.Actions?.length ?? 0} accion`
      : `${taskToDelete?.Actions?.length ?? 0} acciones`

  return messageTask
}

//TODO: handleClickMenu and handleCloseMenu can be one function with LSP
export const handleClickMenu = (event, typeMenu, setAnchorEl, anchorEl) => {
  event.stopPropagation()
  setAnchorEl({ ...anchorEl, [typeMenu]: event.currentTarget })
}

export const handleCloseMenu = (event, typeMenu, setAnchorEl, anchorEl) => {
  event.stopPropagation()
  setAnchorEl({ ...anchorEl, [typeMenu]: null })
}

// REVIEW_STORED_DATA
const ACTION_TYPES_FISCAL = [
  'SAVE_FORM',
  'UPLOAD_DOCUMENT',
  'GENERATE_DOCUMENT',
  'SIGN_DOCUMENT',
  'SEND_NOTIFICATION',
  'AUTOMATIC_ACTION',
  'CALL_COMPONENT',
  'CALL_API',
  'DOWNLOAD_DOCUMENT',
  'NUMBERING_DOCUMENT',
  'CREATE_NOTIFICATION',
  'REVIEW_STORED_DATA',
  'REVIEW_RAD_DATA',
  'PROCESS_TRANSFER',
]

// Commented actions means that they are not currently in use
const ACTION_TYPES_PROCESS = [
  'PAY_ORDER_APPROVAL',
  'REVIEW_NOTIFICATION',
  'ADD_PROCESS_ACTOR',
  'UPLOAD_DOCUMENT',
  'CALL_ORACLE_FORM',
  'CREATE_NOTIFICATION',
  'CREATE_SIGEDOC',
  'DOWNLOAD_DOCUMENT',
  'AUTOMATIC_ACTION',
  'SEND_NOTIFICATION',
  'SIGN_DOCUMENT',
  'SAVE_FORM',
  'GENERATE_DOCUMENT',
  'NUMBERING_DOCUMENT',
  'ASSIGNMENT_TO_USER',
  'ALERTS_REVIEW',
  'REVIEW_RAD_DATA',
  'REVIEW_DOCUMENT',
  'GENERAL_REVIEW',
  'CALL_API',
  // 'SIIFWEB_BIND_FINANTIAL_DOC',
  'SUBPROCESS',
  'BIND_PROCESSES',
  'BACK_TO_PREV_ACTIVITY',
]

const arrActionTypes = [
  {
    label: 'Aprobación financiera',
    name: 'Aprobación financiera',
    icon: <PriceCheckOutlined />,
    actionType: 'PAY_ORDER_APPROVAL',
  },
  {
    label: 'Ajuste de Notificación',
    name: 'Ajuste de Notificación',
    icon: <EditNotificationsOutlined />,
    actionType: 'REVIEW_NOTIFICATION',
  },
  {
    label: 'Asignación de actores',
    name: 'Asignación de actores',
    icon: <RecentActorsOutlined />,
    actionType: 'ADD_PROCESS_ACTOR',
  },
  {
    label: 'Cargue de documentos',
    name: 'Cargue de documentos',
    icon: <FileUploadOutlined />,
    actionType: 'UPLOAD_DOCUMENT',
  },
  {
    label: 'Consultas a Oracle',
    name: 'Consultas a Oracle',
    icon: <AddLinkOutlined />,
    actionType: 'CALL_ORACLE_FORM',
  },
  {
    label: 'Creación de Notificación',
    name: 'Creación de Notificación',
    icon: <NotificationAddOutlined />,
    actionType: 'CREATE_NOTIFICATION',
  },
  {
    label: 'Creación de SIGEDOC',
    name: 'Creación de SIGEDOC',
    icon: <ConnectWithoutContactOutlined />,
    actionType: 'CREATE_SIGEDOC',
  },
  {
    label: 'Descarga de documentos',
    name: 'Descarga de documentos',
    icon: <DownloadForOfflineOutlined />,
    actionType: 'DOWNLOAD_DOCUMENT',
  },
  {
    label: 'Ejecución automática',
    name: 'Ejecución automática',
    icon: <LoopOutlined />,
    actionType: 'AUTOMATIC_ACTION',
  },
  {
    label: 'Enviar notificación',
    name: 'Enviar notificación',
    icon: <Email />,
    actionType: 'SEND_NOTIFICATION',
  },
  {
    label: 'Firma de documentos',
    name: 'Firma de documentos',
    icon: <DriveFileRenameOutline />,
    actionType: 'SIGN_DOCUMENT',
  },
  {
    label: 'Formulario',
    name: 'Formulario',
    icon: <AssignmentOutlined />,
    actionType: 'SAVE_FORM',
  },
  {
    label: 'Generación de documentos',
    name: 'Generación de documentos',
    icon: <PostAddOutlined />,
    actionType: 'GENERATE_DOCUMENT',
  },
  {
    label: 'Numeración de documento',
    name: 'Numeración de documento',
    icon: <Numbers />,
    actionType: 'NUMBERING_DOCUMENT',
  },
  {
    label: 'Reparto',
    name: 'Reparto',
    icon: <AssignmentInd />,
    actionType: 'ASSIGNMENT_TO_USER',
  },
  {
    label: 'Revisión de alertas',
    name: 'Revisión de alertas',
    icon: <AddAlertOutlined />,
    actionType: 'ALERTS_REVIEW',
  },
  {
    label: 'Revisión de datos de radicacion',
    name: 'Revisión de datos de radicacion',
    icon: <GradingOutlined />,
    actionType: 'REVIEW_RAD_DATA',
  },
  {
    label: 'Revisión de documentos',
    name: 'Revisión de documentos',
    icon: <RateReviewOutlined />,
    actionType: 'REVIEW_DOCUMENT',
  },
  {
    label: 'Revisión General',
    name: 'Revisión General',
    icon: <ApprovalOutlined />,
    actionType: 'GENERAL_REVIEW',
  },
  {
    label: 'Solicitud API',
    name: 'Solicitud API',
    icon: <DvrOutlined />,
    actionType: 'CALL_API',
  },
  {
    label: 'SIIF vincular documentos presupuestales',
    name: 'SIIF vincular documentos presupuestales',
    icon: <FindInPageOutlined />,
    actionType: 'SIIFWEB_BIND_FINANTIAL_DOC',
  },
  {
    label: 'Sub proceso',
    name: 'Sub proceso',
    icon: <ViewTimeline />,
    actionType: 'SUBPROCESS',
  },
  {
    label: 'Transferencia de procesos',
    name: 'Transferencia de procesos',
    icon: <MoveUp />,
    actionType: 'PROCESS_TRANSFER',
  },
  {
    label: 'Vinculacion de procesos',
    name: 'Vinculacion de procesos',
    icon: <LeakAdd />,
    actionType: 'BIND_PROCESSES',
  },
  {
    label: 'Volver a tarea anterior',
    name: 'Volver a tarea anterior',
    icon: <AssignmentReturn />,
    actionType: 'BACK_TO_PREV_ACTIVITY',
  },
]

//TODO: Var for constants folder
export const totalActionTypes = {
  process: [
    ...(arrActionTypes ?? []).filter((item) => ACTION_TYPES_PROCESS.includes(item?.actionType)),
  ],
  fiscal: [
    ...(arrActionTypes ?? []).filter((item) => ACTION_TYPES_FISCAL.includes(item?.actionType)),
  ],
}

//TODO: Var for constants folder
// DEPRECATED
export const inputTypeSaveForm = [
  {
    value: 'shortText',
    label: 'Texto Corto',
  },
  {
    value: 'longText',
    label: 'Texto Largo',
  },
  {
    value: 'number',
    label: 'Numero',
  },
  {
    value: 'date',
    label: 'Fecha',
  },
  {
    value: 'lov',
    label: 'Listado de opciones',
  },
]

export const capitalizeFirstLetter = (string) => {
  //TODO: This function must be in the utils folder
  return string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase()
}

const addElementToAskfor = (action, newElements) => {
  //TODO: Comprobar que esto funcione, podria haber un fallo
  // it should be like this: ActionItems: [...action.ActionItems ?? [], ...newElements ?? []],
  return {
    ...action,
    ActionItems: [...(action.ActionItems ?? []), ...(newElements ?? [])],
  }
}

//TODO: Use split and slice
export const deleteTask = (task, currentAction, newElements) => {
  return {
    ...task,
    Actions: task?.Actions?.map((action) => {
      if (action.id === currentAction.id) {
        return addElementToAskfor(currentAction, newElements)
      } else {
        return { ...action }
      }
    }),
  }
}

// Función para actualizar propiedades adicionales basadas en condiciones
// TO-DO: FUNCION POR BORRAR
// DEBE MEJORAR ESTA FUNCION, solo con updatedElement = {...value} deberia ser suficiente
const updateBasedOnCondition = (updatedElement, value) => {
  updatedElement = {
    ...updatedElement,
    ...value,
  }

  if (value.type) {
    // TODO: CADA STATE VALUE DE CADA ACTIONITEM DEBO CREARLO DE LA SIGUIENTE MANERA:
    // (Obviamente dependiendo del Action del ActionItem)
    updatedElement.type = value.type === 'longText' ? 'textarea' : value.type
    updatedElement.actionItemSpecs = {
      ...updatedElement.actionItemSpecs,
      options: value.options ?? [],
    }
    updatedElement.variableName = value.variableName ?? ''
  } else if (value.template) {
    // TODO: ASI NO DEBERIA ESTAR, DEBERIA SER SOLO {...value} y YA, no deberia existir este condicional
    updatedElement = {
      ...updatedElement,
      ...value,
      templateData: {
        id: value.templateData.id,
        nombre: value.templateData.nombre,
      },
      documentRatentionTableData: {
        name: value?.documentRatentionTableData?.name ?? '',
      },
      idDocumentRetentionTable: value?.idDocumentRetentionTable ?? null,
    }
  } else if (value.idActionItemRel && value.idTaskActionRel) {
    updatedElement = {
      ...updatedElement,
      ...value,
      ActionItemRel: {
        name: value.name ?? '',
      },
    }
  } else if (value.idTaskRel || value.idActorType) {
    updatedElement = {
      ...updatedElement,
      ...value,
      TaskRel: {
        name: value.name ?? null,
      },
      ActorType: {
        id: value.idActorType ?? null,
        name: value.nameActorType ?? null,
      },
    }
  } else if (value.idProcessTypeRel && value.processTypeRel) {
    updatedElement = {
      ...updatedElement,
      ...value,
      ProcessTypeRel: {
        id: value.processTypeRel.id ?? null,
        name: value.processTypeRel.name ?? null,
      },
    }
  } else if (value.idTaskOnApproved || value.idTaskOnRejected) {
    updatedElement = {
      ...updatedElement,
      ...value,
      TaskOnApproved: {
        name: value.nameTaskOnApproved ?? '',
      },
      TaskOnRejected: {
        name: value.nameTaskOnRejected ?? '',
      },
    }
  } else if (value.channel || value.defaultTo || value.subject) {
    updatedElement = {
      ...updatedElement,
      ...value,
      actionItemSpecs: {
        channel: value.channel ?? '',
        defaultTo: value.defaultTo ?? '',
        subject: value.subject ?? '',
        defaultEmailSender: value.defaultEmailSender ?? '',
      },
    }
  }

  return updatedElement
}

export const updateElement = (element, currentElement, value) => {
  // Clonar el elemento actual para no modificar el original
  let updatedElement = { ...currentElement }

  // Actualizar las propiedades comunes
  const commonProps = ['name', 'description', 'isRequired', 'isEnabled']
  commonProps.forEach((prop) => {
    if (value[prop] !== undefined) {
      updatedElement[prop] = value[prop]
    }
  })

  // Actualizar propiedades adicionales basadas en condiciones
  updatedElement = updateBasedOnCondition(updatedElement, value)

  // Eliminar la bandera isNew si el elemento es el mismo que el elemento actual
  if (element.id === currentElement.id) {
    delete updatedElement.isNew
  }

  // Devolver el elemento actualizado
  return updatedElement
}

const updateAskFor = (askForElement, currentElement, value) => {
  if (askForElement.id === currentElement.id) {
    return updateElement(askForElement, currentElement, value)
  } else {
    return { ...askForElement }
  }
}

//TODO: Use split and slice
const updateAction = (action, currentAction, currentElement, value) => {
  if (action.id === currentAction.id) {
    return {
      ...action,
      ActionItems: [
        ...action.ActionItems.map((askForElement) =>
          updateAskFor(askForElement, currentElement, value)
        ),
      ],
    }
  } else {
    return { ...action }
  }
}

//TODO: Use split and slice
export const updateTask = (task, currentAction, currentElement, value) => {
  //THIS FUNCTION IS DEPRECATED
  if (task.id === currentAction.idTask) {
    return {
      ...task,
      Actions: task?.Actions?.map((action) =>
        updateAction(action, currentAction, currentElement, value)
      ),
    }
  } else {
    return { ...task }
  }
}

export const childNode = (parentNode, newNode, isFiscalBuilder) => {
  return {
    id: newNode.id,
    type: 'stageNode',
    position: {
      x: parentNode ? parentNode.position.x + 300 : 0,
      y: parentNode ? parentNode.position.y : 0,
    },
    data: {
      label: newNode.name,
      description: newNode.description ?? '',
      isEnabled: newNode.isEnabled,
      ...(isFiscalBuilder && { idOfficeExec: newNode?.idOfficeExec ?? null }),
    },
  }
}

export const childEdge = (parentNode, newNode) => {
  return {
    id: `${parentNode.id}=>${newNode.id}`,
    source: parentNode.id,
    target: newNode.id,
    type: 'addNewStage',
  }
}

// DELETE IN NEXT PR
export const chooseUrlModal = ({ url, idCompany, idProcessType, qryParams, variationParams }) => {
  let base
  let qry

  //TODO: Implement LSP for better readability, functions do not need to be modified
  if (url === 'GENERATE') {
    base = baseUrls.urlDocuments
    qry = `/${idCompany}/plantillas${qryParams}`
  } else if (url === 'ROLE') {
    base = baseUrls.urlUsers
    qry = `/${idCompany}/roles?rowsPerPage=100`
  } else if (url === 'ASSIGNMENT') {
    base = baseUrls[variationParams?.builderService] ?? 'urlProcess'
    qry = `/${idCompany}/process-types/${idProcessType}/util/all-activities`
  } else if (url === 'ASSIGNMENT_ACTORTYPE') {
    base = baseUrls[variationParams?.builderService] ?? 'urlProcess'
    qry = `/actor-types`
  } else if (url === 'REVIEW_NOTIFICATION') {
    base = baseUrls[variationParams?.builderService] ?? 'urlProcess'
    qry = `/${idCompany}/process-types/${idProcessType}/util/resources/notifications`
  } else {
    base = baseUrls[variationParams?.builderService] ?? 'urlProcess'
    qry = `/${idCompany}/process-types/${idProcessType}/util/resources`
  }

  return { base, qry }
}

//TODO: Save in a single folder for the ACTION validations
export const conditionStateTask = (taskSave, stateDataTask) => {
  return (
    taskSave.name !== stateDataTask?.name ||
    taskSave.description !== stateDataTask?.description ||
    taskSave.isEnabled !== stateDataTask?.isEnabled ||
    taskSave.idRole !== stateDataTask?.idRole ||
    taskSave.position !== stateDataTask?.position
  )
}

//TODO: ACTION validations
export const conditionStateSpecs = (taskSave, stateDataTask) => {
  const isCriticalAlertDifferent = taskSave?.alerts?.critical !== stateDataTask?.alerts?.critical
  const isWarningAlertDifferent = taskSave?.alerts?.warning !== stateDataTask?.alerts?.warning
  const isDurationTypeDifferent = taskSave?.duration?.type !== stateDataTask?.duration?.type
  const isDurationValueDifferent = taskSave?.duration?.value !== stateDataTask?.duration?.value
  const isNextTaskDifferent = taskSave?.idNextTask !== stateDataTask?.idNextTask
  const isSetProcessStatusDifferent = taskSave?.setProcessStatus !== stateDataTask?.setProcessStatus
  const isShowSuggestedDifferent = taskSave?.showSuggested !== stateDataTask?.showSuggested
  const isAllowParallel = taskSave?.allowParallel !== stateDataTask?.allowParallel
  const isStopNoti = taskSave?.stopNotification !== stateDataTask?.stopNotification
  const isNotificateOnReject = taskSave?.notificateOnReject !== stateDataTask?.notificateOnReject
  const isIdActorTypeToNotify = taskSave?.idActorTypeToNotify !== stateDataTask?.idActorTypeToNotify
  const isNotificateOnNewTask = taskSave?.notificateOnNewTask !== stateDataTask?.notificateOnNewTask

  return (
    isCriticalAlertDifferent ||
    isWarningAlertDifferent ||
    isDurationTypeDifferent ||
    isDurationValueDifferent ||
    isNextTaskDifferent ||
    isSetProcessStatusDifferent ||
    isShowSuggestedDifferent ||
    isAllowParallel ||
    isStopNoti ||
    isNotificateOnReject ||
    isIdActorTypeToNotify ||
    isNotificateOnNewTask
  )
}

//TODO: Var for constants folder
export const optionTypes = [
  { label: 'Horas', value: 'HOURS' },
  { label: 'Días', value: 'DAYS' },
  { label: 'Días laborales', value: 'LABOR_DAYS' },
  { label: 'Meses', value: 'MONTHS' },
  { label: 'Años', value: 'YEARS' },
]

//TODO: Var for constants folder
const statusProcessGeneral = [
  { label: 'En progreso', value: 'PROGRESS' },
  { label: 'Completado', value: 'COMPLETED' },
  { label: 'Suspendido', value: 'SUSPENDED' },
  { label: 'En revisión', value: 'INREVIEW' },
  { label: 'Revisado', value: 'REVIEWED' },
  { label: 'Completado parcialmente', value: 'PARTIALCOMPLETED' },
]

const statusProcessGeneralFiscal = []

const statusProcessGeneralProcess = [{ label: 'Anulado', value: 'CANCELLED' }]

export const statusProcessServices = {
  fiscal: [...statusProcessGeneral, ...statusProcessGeneralFiscal],
  process: [...statusProcessGeneral, ...statusProcessGeneralProcess],
}

export const notificationChannelTypes = [
  { label: 'Email', value: 'EMAIL' },
  { label: 'Sms', value: 'SMS' },
  { label: 'Push', value: 'PUSH' },
  { label: 'Web', value: 'WEB' },
]

export const onErrorManagedMessage = ({ err, message }) => {
  if (err?.response?.data?.error) {
    toast.error(err?.response?.data?.error ?? '')
    return
  }
  toast.error(message)
}

//TODO: Separar este archivo funcs en mas funcs
export const defaultColumns = [
  {
    field: 'stage',
    headerName: 'Etapa',
    width: 250,
  },
  {
    field: 'activity',
    headerName: 'Actividad',
    width: 250,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    width: 250,
  },
]

export const methodCallApi = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
]

export const sigedocCommunicationOptions = [
  { label: 'Comunicación Externa Recibida', value: 'ER' },
  { label: ' Comunicación Interna Enviada', value: 'IE' },
  { label: 'Comunicación Externa Enviada', value: 'EE' },
]

// IT SHOULD BE IN A CONSTANST FILE
export const siifwebTypeVoucher = [
  {
    id: 87,
    value: 87,
    tipoCompptal: 'ADICION',
    label: 'Adicion',
  },
  {
    id: 303,
    value: 303,
    tipoCompptal: 'ADICION',
    label: 'REGALIAS Adicion',
  },
  {
    id: 103,
    value: 103,
    tipoCompptal: 'ADI_PAC',
    label: 'Adicion de Pac',
  },
  {
    id: 122,
    value: 122,
    tipoCompptal: 'ADI_PAC_ING',
    label: 'Adicion Pac Ingresos',
  },
  {
    id: 89,
    value: 89,
    tipoCompptal: 'CONGELADO',
    label: 'Aplazamiento',
  },
  {
    id: 96,
    value: 96,
    tipoCompptal: 'APROPIADO',
    label: 'Apropiado',
  },
  {
    id: 305,
    value: 305,
    tipoCompptal: 'APROPIADO',
    label: 'REGALIAS Apropiado',
  },
  {
    id: 71,
    value: 71,
    tipoCompptal: 'AJUSTE_SOLI',
    label: 'Ajuste Solicitud de Disponibilidad',
  },
  {
    id: 308,
    value: 308,
    tipoCompptal: 'AJUSTE_SOLI',
    label: 'REGALIAS Ajuste Solicitud de Disponibilidad',
  },
  {
    id: 72,
    value: 72,
    tipoCompptal: 'AJUSTE_SOLI_COMP',
    label: 'Ajuste Solicitud de Compromiso',
  },
  {
    id: 309,
    value: 309,
    tipoCompptal: 'AJUSTE_SOLI_COMP',
    label: 'REGALIAS Ajuste Solicitud de Compromiso',
  },
  {
    id: 310,
    value: 310,
    tipoCompptal: 'AJUSTE_DISP',
    label: 'REGALIAS Ajuste Disponibilidad',
  },
  {
    id: 73,
    value: 73,
    tipoCompptal: 'AJUSTE_DISP',
    label: 'Ajuste Disponibilidad',
  },
  {
    id: 74,
    value: 74,
    tipoCompptal: 'AJUSTE_COMP',
    label: 'Ajuste Compromiso',
  },
  {
    id: 311,
    value: 311,
    tipoCompptal: 'AJUSTE_COMP',
    label: 'REGALIAS Ajuste Compromiso',
  },
  {
    id: 105,
    value: 105,
    tipoCompptal: 'AJUSTE_PAC_COMP',
    label: 'Ajuste Pac Compromiso',
  },
  {
    id: 106,
    value: 106,
    tipoCompptal: 'AJUSTE_PAC_SOLI',
    label: 'Ajuste Pac Solicitud',
  },
  {
    id: 76,
    value: 76,
    tipoCompptal: 'AJUSTE_PAGO',
    label: 'Ajuste Pago',
  },
  {
    id: 317,
    value: 317,
    tipoCompptal: 'AJUSTE_PAGO',
    label: 'REGALIAS Ajuste Pago',
  },
  {
    id: 79,
    value: 79,
    tipoCompptal: 'AJUSTE_PAGO_CXP',
    label: 'Ajuste Pago Cuenta Por Pagar',
  },
  {
    id: 78,
    value: 78,
    tipoCompptal: 'AJUSTE_PAGO_RESERVA',
    label: 'Ajuste Pago de Reserva',
  },
  {
    id: 80,
    value: 80,
    tipoCompptal: 'AJUSTE_RESERVA',
    label: 'Ajuste Reserva',
  },
  {
    id: 81,
    value: 81,
    tipoCompptal: 'AJUSTE_CXP',
    label: 'Ajuste Cuenta Por Pagar',
  },
  {
    id: 75,
    value: 75,
    tipoCompptal: 'AJUSTE_OBLI',
    label: 'Ajuste Obligacion',
  },
  {
    id: 315,
    value: 315,
    tipoCompptal: 'AJUSTE_OBLI',
    label: 'REGALIAS Ajuste Obligacion',
  },
  {
    id: 77,
    value: 77,
    tipoCompptal: 'AJUSTE_OBLI_RESERVA',
    label: 'Ajuste Obligacion de Reserva',
  },
  {
    id: 90,
    value: 90,
    tipoCompptal: 'DESCONGELADO',
    label: 'Desaplazamiento',
  },
  {
    id: 109,
    value: 109,
    tipoCompptal: 'DEVOLUCIONES',
    label: 'Devoluciones',
  },
  {
    id: 110,
    value: 110,
    tipoCompptal: 'DEVOLUCIONES_PAPEL',
    label: 'Devoluciones En Papel',
  },
  {
    id: 88,
    value: 88,
    tipoCompptal: 'DISMINUCION',
    label: 'Disminucion',
  },
  {
    id: 304,
    value: 304,
    tipoCompptal: 'DISMINUCION',
    label: 'REGALIAS Disminucion',
  },
  {
    id: 65,
    value: 65,
    tipoCompptal: 'COMPROMISO',
    label: 'Compromiso',
  },
  {
    id: 307,
    value: 307,
    tipoCompptal: 'COMPROMISO',
    label: 'REGALIAS Compromiso',
  },
  {
    id: 83,
    value: 83,
    tipoCompptal: 'CREDITO',
    label: 'Credito Gastos',
  },
  {
    id: 286,
    value: 286,
    tipoCompptal: 'CREDITO',
    label: 'REGALIAS Credito Gastos',
  },
  {
    id: 329,
    value: 329,
    tipoCompptal: 'CREDITO',
    label: 'Credito Gastos Insumos',
  },
  {
    id: 125,
    value: 125,
    tipoCompptal: 'CREDITO_ING',
    label: 'Credito Ingresos',
  },
  {
    id: 302,
    value: 302,
    tipoCompptal: 'CONTRACREDITO',
    label: 'REGALIAS Contracredito Gastos',
  },
  {
    id: 84,
    value: 84,
    tipoCompptal: 'CONTRACREDITO',
    label: 'Contracredito Gastos',
  },
  {
    id: 328,
    value: 328,
    tipoCompptal: 'CONTRACREDITO',
    label: 'Contracredito Gastos Insumos',
  },
  {
    id: 126,
    value: 126,
    tipoCompptal: 'CONTRACREDITO_ING',
    label: 'Contracredito Ingresos',
  },
  {
    id: 86,
    value: 86,
    tipoCompptal: 'CANCELACION_CXP',
    label: 'Cancelacion Cuenta Por Pagar',
  },
  {
    id: 85,
    value: 85,
    tipoCompptal: 'CANCELACION_RESERVA',
    label: 'Cancelacion Reserva',
  },
  {
    id: 100,
    value: 100,
    tipoCompptal: 'DEFINICION_EGR',
    label: 'Definicion Egresos',
  },
  {
    id: 119,
    value: 119,
    tipoCompptal: 'DEFINICION_ING',
    label: 'Definicion Ingresos',
  },
  {
    id: 115,
    value: 115,
    tipoCompptal: 'DERECHOS_APROBADOS',
    label: 'Derechos Aprobados',
  },
  {
    id: 116,
    value: 116,
    tipoCompptal: 'DERECHOS_ADICIONADOS',
    label: 'Derechos Adicionados',
  },
  {
    id: 117,
    value: 117,
    tipoCompptal: 'DERECHOS_ANULADOS',
    label: 'Derechos Anulados',
  },
  {
    id: 124,
    value: 124,
    tipoCompptal: 'DERECHOS_POR_COBRAR',
    label: 'Derechos Por Cobrar',
  },
  {
    id: 98,
    value: 98,
    tipoCompptal: 'CXP',
    label: 'Cuenta Por Pagar',
  },
]
