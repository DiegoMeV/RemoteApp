import { action } from 'easy-peasy'

export const stateSideBarAdminModel = {
  selectOption: '',
  setSelectOption: action((state, payload) => {
    state.selectOption = payload
  }),
  clearSelectOption: action((state) => {
    state.selectOption = ''
  }),
}
