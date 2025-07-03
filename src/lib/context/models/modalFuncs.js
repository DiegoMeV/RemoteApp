import { action } from 'easy-peasy'

export const modalFuncs = {
  modalShow: false,
  setModalShow: action((state) => {
    state.modalShow = !state.modalShow
  }),
  clearBackPathUrl: action((state) => {
    state.modalShow = undefined
  }),
}
