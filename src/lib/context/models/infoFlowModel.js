import { action } from 'easy-peasy'

export const infoFlowModel = {
  /**
   * Representa todas las etapas, tareas y conexiones que tiene un tipo de proceso
   */
  infoFlow: {
    stages: [],
    tasks: [],
    connections: [],
  },
  setStagesNEdges: action((state, payload) => {
    state.infoFlow = {
      ...state.infoFlow,
      stages: payload.stages,
      connections: payload.connections,
    }
  }),
  setStages: action((state, payload) => {
    state.infoFlow = {
      ...state.infoFlow,
      stages: payload.stages,
    }
  }),
  setTasksNActions: action((state, payload) => {
    state.infoFlow = {
      ...state.infoFlow,
      tasks: payload.tasks,
    }
  }),
  clearInfoFlowState: action((state) => {
    state.infoFlow = {
      ...state.infoFlow,
      stages: [],
      tasks: [],
      connections: [],
    }
  }),
}
