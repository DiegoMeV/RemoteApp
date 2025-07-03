export const menuApplicationsSelected = (set) => ({
  menuSelected: {
    openKeys: [],
    selected: undefined,
    path: undefined,
  },
  setMenuSelected: (payload) =>
    set((state) => ({
      menuSelected: {
        openKeys: state.menuSelected.openKeys,
        selected: state.menuSelected.selected,
        path: state.menuSelected.path,
        ...payload,
      },
    })),
  clearMenuSelected: () =>
    set({
      menuSelected: {
        openKeys: [],
        selected: undefined,
        path: undefined,
      },
    }),
})
