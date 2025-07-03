import { action } from 'easy-peasy'

export const nameRolOrChargeModel = {
  name: '',
  setRolOrChargeName: action((state, payload) => {
    state.name = payload
  }),
  clearRolOrChargeName: action((state) => {
    state.name = ''
  }),
}
