import { action } from 'easy-peasy'

export const moduleTypeSelected = {
  moduleType: '',
  setTypeModule: action((state, payload) => {
    state.moduleType = payload
  }),
  clearTypeModule: action((state) => {
    state.moduleType = ''
  }),
}
