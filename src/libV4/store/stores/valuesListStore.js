export const valuesListStore = (set) => ({
  VLProps: undefined,
  handleClose: () => set({ VLProps: undefined }),
  setVLProps: (payload) => set({ VLProps: payload }),
})
