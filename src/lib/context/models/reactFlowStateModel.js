import { action } from 'easy-peasy'

export const reactFlowStateModel = {
  stageSelected: {
    id: '',
  },
  variationParams: {
    builderService: '',
    byActionTypes: '',
  },
  idProcessType: '',
  openSidebar: false,
  idCurrentEdgeConnection: '',
  edgeMenuActions: null,
  setVariationParams: action((state, payload) => {
    state.variationParams = payload
  }),
  setOpenSidebar: action((state, payload) => {
    state.openSidebar = payload
  }),
  setStageSelected: action((state, payload) => {
    state.stageSelected = {
      id: payload.id,
    }
  }),
  setTypeProcessSelected: action((state, payload) => {
    state.idProcessType = payload.id
  }),
  clearReactFlowState: action((state) => {
    ;(state.stageSelected = {
      id: '',
    }),
      (state.idProcessType = ''),
      (state.openSidebar = false),
      (state.idCurrentEdgeConnection = ''),
      (state.edgeMenuActions = null)
  }),
  setIdCurrentEdgeConnection: action((state, payload) => {
    state.idCurrentEdgeConnection = payload
  }),
  setEgdeMenuOpen: action((state, payload) => {
    state.edgeMenuActions = payload
  }),
  setEgdeMenuClose: action((state) => {
    state.edgeMenuActions = null
  }),
}
