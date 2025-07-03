import { action } from 'easy-peasy'

export const confirmAlertModel = {
  confirmAlertProps: {
    open: false,
    icon: null,
    title: null,
    content: null,
  },
  handleClose: action((state) => {
    state.confirmAlertProps = { ...state.confirmAlertProps, open: !state.confirmAlertProps.open }
  }),
  setConfirmAlertProps: action((state, payload) => {
    state.confirmAlertProps = { ...state.confirmAlertProps, ...payload }
  }),
  clearConfirmAlertProps: action((state) => {
    state.confirmAlertProps = {
      open: false,
      icon: null,
      title: null,
      content: null,
    }
  }),
}
