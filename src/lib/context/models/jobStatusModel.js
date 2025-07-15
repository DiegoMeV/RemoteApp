import { action } from 'easy-peasy'

export const jobStatusModel = {
  jobStatusData: undefined,
  setJobStatusData: action((state, payload) => {
    state.jobStatusData = payload
  }),
  updatejobStatusData: action((state, payload) => {
    state.jobStatusData = {
      ...state.jobStatusData,
      ...payload,
    }
  }),
  clearUserData: action((state) => {
    state.jobStatusData = undefined
  }),
}
