export const confirmAlertStore = (set) => ({
  confirmAlertProps: {
    open: false,
    icon: null,
    title: null,
    content: null,
  },
  handleClose: () =>
    set((state) => ({
      confirmAlertProps: {
        ...state.confirmAlertProps,
        open: !state.confirmAlertProps.open,
      },
    })),
  setConfirmAlertProps: (payload) =>
    set((state) => ({
      confirmAlertProps: {
        ...state.confirmAlertProps,
        ...payload,
      },
    })),
  clearConfirmAlertProps: () =>
    set({
      confirmAlertProps: {
        open: false,
        icon: null,
        title: null,
        content: null,
      },
    }),
})
