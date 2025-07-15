import { action } from 'easy-peasy'

export const valuesListModel = {
  VLProps: undefined,
  handleClose: action((state) => {
    state.VLProps = undefined
  }),
  setVLProps: action((state, payload) => {
    state.VLProps = payload
  }),
}
