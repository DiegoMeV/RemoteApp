import { action } from 'easy-peasy'

export const userModel = {
  userData: undefined,
  setUserData: action((state, payload) => {
    state.userData = payload
  }),
  updateUserData: action((state, payload) => {
    state.userData = {
      ...state.userData,
      ...payload,
    }
  }),
  clearUserData: action((state) => {
    state.userData = undefined
  }),
}
