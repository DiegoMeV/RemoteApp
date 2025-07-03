export const menuModel = (set) => ({
  infoMenu: undefined,
  selectedOption: null,
  openApps: [],
  setInfoMenu: (payload) =>
    set({
      infoMenu: payload,
    }),
  clearInfoMenu: () => ({
    infoMenu: undefined,
  }),
  setSelectedOption: (payload) =>
    set({
      selectedOption: payload,
    }),
  clearSelectedOption: () =>
    set({
      selectedOption: null,
    }),
  setOpenApps: (payload) =>
    set({
      openApps: payload,
    }),
  clearOpenApps: () =>
    set({
      openApps: [],
    }),
  clearMenu: () =>
    set({
      infoMenu: undefined,
      selectedOption: null,
      openApps: [],
    }),
})
