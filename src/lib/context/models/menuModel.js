import { action } from 'easy-peasy'

export const menuModel = {
  infoMenu: undefined,
  selectedOption: null,
  openApps: {},
  setInfoMenu: action((state, payload) => {
    state.infoMenu = payload
  }),
  clearInfoMenu: action((state) => {
    state.infoMenu = undefined
  }),
  setSelectedOption: action((state, payload) => {
    state.selectedOption = payload
  }),
  clearSelectedOption: action((state) => {
    state.selectedOption = null
  }),
  setOpenApps: action((state, payload) => {
    state.openApps = payload
  }),
  clearOpenApps: action((state) => {
    state.openApps = false
  }),
  clearMenu: action((state) => {
    state.infoMenu = undefined
    state.selectedOption = null
    state.openApps = false
  }),
}
