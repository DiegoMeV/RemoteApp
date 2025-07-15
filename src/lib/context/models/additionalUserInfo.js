import { action } from 'easy-peasy'

export const additionalUserInfoModel = {
  additionalUserInfo: {},
  setAdditionalUserInfo: action((state, payload) => {
    state.additionalUserInfo = payload
  }),
  clearAdditionalUserInfo: action((state) => {
    state.additionalUserInfo = {}
  }),
}
