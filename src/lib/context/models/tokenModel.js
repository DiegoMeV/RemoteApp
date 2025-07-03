import { action } from 'easy-peasy'

export const tokenModel = {
  tokenData: undefined,
  setTokenData: action((state, payload) => {
    state.tokenData = payload
  }),
  clearTokenData: action((state) => {
    state.tokenData = undefined
  }),
}
