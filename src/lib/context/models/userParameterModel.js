import { action } from 'easy-peasy'

export const userParameterModel = {
  userParameter: undefined,
  setUserParameter: action((state, payload) => {
    state.userParameter = payload
  }),
  updateUserParameter: action((state, payload) => {
    state.userParameter = {
      ...state.userParameter,
      ...payload,
    }
  }),
  clearUserParameter: action((state) => {
    state.userParameter = undefined
  }),
}
