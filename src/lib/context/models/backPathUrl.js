import { action } from 'easy-peasy'

export const backPathUrl = {
  backPathUrl: undefined,
  setBackPathUrl: action((state, payload) => {
    state.backPathUrl = payload
  }),
  clearBackPathUrl: action((state) => {
    state.backPathUrl = undefined
  }),
}
