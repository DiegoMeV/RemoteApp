import { action } from 'easy-peasy'

export const menuModulesModel = {
  openedOptions: [],
  setOpenedOptions: action((state, payload) => {
    state.openedOptions = payload
  }),
}
