import { action } from 'easy-peasy'

export const stateSideBarModel = {
  stateSideBar: true,
  setStateSideBar: action((state) => {
    state.stateSideBar = !state.stateSideBar
  }),
  clearstateSideBar: action((state) => {
    state.stateSideBar = true
  }),
}
