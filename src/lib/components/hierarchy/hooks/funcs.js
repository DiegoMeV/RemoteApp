export const createConnections = (dependency) => {
  return {
    id: `${dependency.parentId}=>${dependency.id}`,
    source: dependency.parentId,
    target: dependency.id,
    type: 'smoothstep',
    style: {
      stroke: '#42A5F5',
    },
  }
}

/**
 * This function allows to extract the parentId of each dependency from the dependency array
 * @param {*} dependencies is an array of dependencies
 * @returns a set containing only parentIds
 */
export const extractParentId = (dependencies) =>
  new Set(
    dependencies
      ?.filter((dependency) => dependency?.parentId)
      ?.map((dependency) => dependency?.parentId)
  )

export const structureNodeDependency = (dependency, parentNode, parentIdArr) => {
  return {
    id: dependency.id,
    position: {
      x: parentNode ? parentNode.position.x + 300 : 0,
      y: parentNode ? parentNode.position.y : 0,
    },
    data: {
      id: dependency?.id,
      parentId: dependency?.parentId,
      isActive: dependency?.isActive,
      identification: dependency?.identification,
      TRDcode: dependency?.TRDcode,
      label: dependency?.name,
      setIsActive: parentIdArr instanceof Set && parentIdArr.has(dependency?.id),
    },
    type: 'stageHierarchy',
  }
}

export const configConnections = (connections, node) => {
  if (node.parentId) {
    connections.push(createConnections(node))
  }
}

export const changeOrientation = (orientation, setOrientation) => {
  if (orientation === 'horizontal') {
    setOrientation()
  }
}

export const updatedDependencies = (infoFlow, dependency) => {
  //TODO: Hacer que en lugar de modificar todos con el map usar el split o splice
  const nodesUpd = infoFlow.stages.map((node) => {
    if (node.id !== dependency.id) {
      return node
    }
    return {
      ...node,
      data: {
        ...node.data,
        parentId: dependency?.parentId,
        isActive: dependency?.isActive,
        label: dependency?.name,
        identification: dependency?.identification,
        TRDcode: dependency?.TRDcode,
      },
    }
  })
  return nodesUpd
}

export const updatedConnections = (infoFlow, dependency) => {
  const connectionsUpd = infoFlow.connections.map((connection) => {
    if (connection.target !== dependency.id) {
      return connection
    }
    return {
      ...connection,
      source: dependency.parentId,
    }
  })

  return connectionsUpd
}

export const updateDependencyInput = (allDependencies, dependency, setDependencyInput) => {
  const currentDependency = findCurrentDependency(allDependencies, dependency)
  setDependencyInput(currentDependency?.data?.label ?? null)
}

export const findCurrentDependency = (allDependencies, dependency) => {
  return allDependencies?.find((dep) => dependency?.parentId === dep.id)
}

export const updateOptions = (required, allDependencies, dependency, setOptions) => {
  let filterCurrentDependency

  if (!required) {
    filterCurrentDependency = allDependencies
      ?.filter((dep) => dependency.id !== dep.id)
      ?.map((dep) => dep.data.label)
  } else {
    filterCurrentDependency = allDependencies?.map((dep) => dep.data.label)
  }

  setOptions(filterCurrentDependency)
}

export const updateParentIdValue = (setValue, dependencyInput) => {
  const dependencySelected = findDependencyByLabel(dependencyInput)
  setValue('parentId', dependencySelected?.id || '')
}

export const findDependencyByLabel = (label, allDependencies) => {
  return allDependencies?.find((dep) => dep.data.label === label)
}

export const handleInputChange = (event, newInputValue, setDependencyInput) => {
  setDependencyInput(newInputValue)
}

export const handleChange = (event, newValue, setValue) => {
  const dependencySelected = findDependencyByLabel(newValue)
  setValue('parentId', dependencySelected?.id ?? null)
}

export const createBtnDependencyNode = (setStagesNEdges) => {
  const nodeCreator = {
    id: 'creator-99bb187a-038e-4dae-bd85-f1e61057f544',
    type: 'nodeCreator',
    position: { x: 0, y: 0 },
  }
  const arrCreateStages = [nodeCreator]
  setStagesNEdges({
    stages: arrCreateStages,
    connections: [],
  })
}
