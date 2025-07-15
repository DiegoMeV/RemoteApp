import { action } from 'easy-peasy'

export const sessionAzureModel = {
  sessionAzure: false,
  setSessionAzure: action((state, payload) => {
    state.sessionAzure = payload
  }),
  clearSessionAzure: action((state) => {
    state.sessionAzure = false
  }),
}
