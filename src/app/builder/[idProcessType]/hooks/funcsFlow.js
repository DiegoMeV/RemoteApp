import { toArray } from '@/lib'

/**
 * This function can extract the attributes of an array by returning a Set to evaluate
 * @param {*} arrExtract this parameter is for the array to extract the attribute
 * @param {*} prop This parameter is for the attribute to extract.
 * @returns this function returns a Set of attributes
 */
export const extractIds = (arrExtract, prop) => {
  const arr = toArray(arrExtract)
  return new Set(arr?.map((element) => element?.[prop]))
}

/**
 * returns a set of "source" elements from connections attributes and a "target" attribute
 * Get the "source" attribute and "target" attribute from the connections array
 * @param {*} connections a connections array
 * @returns Returns connectionSources, which is a set of id's coming from "source" of each connections element,
 * and connectionTargets, which is a set of id's coming from "target" of each connections element
 */
const setOriginConnections = (connections) => {
  const connectionSources = extractIds(connections, 'source')
  const connectionTargets = extractIds(connections, 'target')

  return [connectionSources, connectionTargets]
}

/**
 * Checks if a new connection needs to be added for the given stage.
 *
 * This function determines whether a new connection should be added based on the provided stage,
 * existing connections, and the last element. It checks if the stage has not been targeted or sourced
 * by any existing connections and, if so, adds a new connection to the specified array.
 *
 * @param {*} stage - The stage for which to check and add a new connection.
 * @param {*} connections - The array of existing connections.
 * @param {*} lastStage - The last stage in the flow.
 * @param {*} firstStage - The first stage in the flow.
 * @param {*} arrToPush - The array to which the new connection should be added.
 * @returns {boolean} Returns true if a new connection is added, otherwise false.
 */
const checkAndAddNewConnection = (stage, connections, lastStage, firstStage, arrToPush) => {
  // Extracts sources and targets from existing connections
  const [connectionSources, connectionTargets] = setOriginConnections(connections)

  // Checks if the stage has not been targeted or sourced by any existing connections
  const isNewConnectionNeeded =
    !connectionTargets.has(stage?.id) && !connectionSources.has(stage?.id)

  if (isNewConnectionNeeded) {
    // Adds a new connection to the array
    const source = lastStage !== stage.id ? lastStage : firstStage
    arrToPush.push({
      source,
      target: stage?.id,
      id: `${source}=>${stage?.id}`,
      type: 'addNewStage',
    })

    return true // Indicates that a new connection has been added
  }

  return false // Indicates that no new connection has been added
}

/**
 * Finds the last element in the filtered stages that is not a source in any existing connection
 * and is a target in at least one existing connection.
 *
 * @param {Array} stages - The array of stages to filter and find the last element from.
 * @param {Array} connections - The array of existing connections.
 * @returns {string|null} The ID of the last element or null if none is found.
 */
const findLastElement = (stages, connections) => {
  // Extracts sources and targets from existing connections
  const [connectionSources, connectionTargets] = setOriginConnections(connections)

  // Finds the last element that is not a source but is a target in at least one existing connection
  return (
    stages?.find((stage) => connectionTargets.has(stage?.id) && !connectionSources.has(stage?.id))
      ?.id || null
  )
}

/**
 * Finds the first element in the filtered stages that is not a target in any existing connection
 * and is a source in at least one existing connection.
 *
 * @param {Array} stages - The array of stages to filter and find the first element from.
 * @param {Array} connections - The array of existing connections.
 * @returns {string|null} The ID of the last element or null if none is found.
 */
const findFirstElement = (stages, connections) => {
  // Extracts sources and targets from existing connections
  const [connectionSources, connectionTargets] = setOriginConnections(connections)

  // Finds the first element that is not a target but is a source in at least one existing connection
  return (
    stages?.find((stage) => !connectionTargets.has(stage?.id) && connectionSources.has(stage?.id))
      ?.id || null
  )
}

/**
 * Filters out connections where target is the same as source.
 * @param {Array} connections - The array of connections to filter.
 * @returns {Array} The filtered array of connections.
 */
const filterValidConnections = (connections) => {
  return connections.filter((connection) => connection.target !== connection.source)
}

/**
 * This function filters all connections and checks if the ids that are in the connections exist.
 * @param {*} stages stages array
 * @param {*} connections connections array
 * @returns the function returns the connections validated with stage
 */
export const validateIdExists = (stages, connections) => {
  const stagesExist = extractIds(stages, 'id')

  return connections.filter((connection) => {
    return stagesExist.has(connection.source) && stagesExist.has(connection.target)
  })
}

/**
 * Creates missing connections by sending a request to the server.
 * @param {Array} stages - The array of stages to evaluate in the connections array.
 * @param {Array} connections - The array of connections to be sent in the request.
 * @param {Function} createConnections - The function to send the request to create connections.
 */
const createMissingConnection = (stages, connections, createConnections) => {
  // Restructure connections
  const reformerCurrentConnections = connections.map(({ source, target }) => ({ source, target }))

  // Array of validated connections
  const newConnections = validateIdExists(
    stages,
    filterValidConnections(reformerCurrentConnections)
  )

  // Creates a request body with the newConnections or an empty array if newConnections are falsy
  const body = { typeSpecs: { diagramConnections: newConnections ?? [] } }

  // Sends a request to create missing connections
  createConnections(body)
}

/**
 * Validates connections for a set of stages, adds missing connections, and updates the connections array.
 *
 * @param {Array} stages - The array of stages to validate connections for.
 * @param {Array} connections - The array of existing connections.
 * @param {Function} createConnections - The function to create missing connections.
 * @returns {Array} The updated array of connections.
 */
export const validateIsConnection = (stages, connections, createConnections) => {
  // Finds the last element that is not a source but is a target in at least one existing connection
  const firstStage = findFirstElement(stages, connections)
  const lastStage = findLastElement(stages, connections)

  // Create a copy of the connections array, verifying that the connection exists and that the connections are not the same
  const connectionEvaluated = validateIdExists(stages, filterValidConnections(connections)) ?? []

  // Checks if any new connections need to be added and updates the connectionFix array
  if (lastStage === null) return connectionEvaluated

  const isRequest = stages?.some((stage) => {
    return checkAndAddNewConnection(
      stage,
      connectionEvaluated,
      lastStage,
      firstStage,
      connectionEvaluated
    )
  })

  // If new connections are needed, creates missing connections
  if (isRequest) createMissingConnection(stages, connectionEvaluated, createConnections)

  // Returns the updated connections array
  return connectionEvaluated
}

/**
 * Converts a stage into an object representing each stage in the stages array.
 * @param {object} stage - Stage from the request used in useStagesInfo.
 * @param {boolean} isFiscalBuilder - Flag to determine if it's in FiscalBuilder view.
 * @returns {object} Object representing a stage in the ReactFlow - Constructor view.
 */
export const structureStageNode = ({ stage, isFiscalBuilder }) => ({
  id: stage?.id ?? '',
  position: { x: 0, y: 0 },
  type: 'stageNode',
  data: {
    label: stage?.name ?? '',
    id: stage?.id ?? '',
    description: stage?.description || '',
    position: stage?.position ?? 0,
    isEnabled: stage?.isEnabled ?? true,
    ...(isFiscalBuilder && { idOfficeExec: stage?.idOfficeExec ?? null }),
  },
})

/**
 * Converts connection in a object that represents each connection from the connections array
 * @param {*} connection is each connection coming from the request that is stored in infoTypeProcess
 * @returns {object}  Returns an object which represents each connection from the Reactflow - Constructor view
 */
export const structureConnection = (connection) => ({
  ...connection,
  id: `${connection?.source}=>${connection?.target}`,
  type: 'addNewStage',
})

/**
 * Performs the first stage in a process of a type that has no stage.
 * @param {*} setStagesNEdges is a function that does the first stage with nodeCreator structure.
 */
export const createBtnStageNode = (setStagesNEdges) => {
  // TO-DO: CHECK THIS OBJECT TO CREATE THE FIRST STAGE
  const nodeCreator = {
    id: 'creator-ee23cd50-038e-4dae-bd85-f1e61057f544',
    type: 'nodeCreator',
    position: { x: 0, y: 0 },
  }
  const arrCreateStages = [nodeCreator]
  setStagesNEdges({
    stages: arrCreateStages,
    connections: [],
  })
}

/**
 * This function filters the stage to update with the values of the form
 * @param {*} stage is the current stage to update
 * @param {*} getValues is a function that gets the values of the form of the stage recently created or updated
 * @param {*} isFiscalBuilder is a Flag that represents if the stage is in the FiscalBuilder view
 * @returns this function returns an element with the updated values to be sent to the easy-peasy store
 */
export const stageToUpdated = ({ stage, getValues, isFiscalBuilder = false }) => {
  const currentValues = getValues()
  if (stage?.id === currentValues?.id) {
    return {
      ...stage,
      data: {
        ...stage.data,
        label: currentValues?.data?.label ?? '',
        description: currentValues?.data?.description ?? '',
        isEnabled: currentValues?.data?.isEnabled ?? true,
        ...(isFiscalBuilder && {
          idOfficeExec:
            currentValues?.data?.idOfficeExec?.id ?? currentValues?.data?.idOfficeExec ?? null,
        }),
      },
    }
  }
  return { ...stage }
}
