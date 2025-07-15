import { action } from 'easy-peasy'

export const isDirtyForm = {
  isDirtyForm: false,
  setIsDirtyForm: action((state, payload) => {
    state.isDirtyForm = payload
  }),
}
