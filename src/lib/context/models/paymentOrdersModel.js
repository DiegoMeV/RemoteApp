import { action } from 'easy-peasy'

export const paymentOrdersModel = {
  paymentOrders: {},
  setPaymentOrders: action((state, payload) => {
    state.paymentOrders = { ...state.paymentOrders, [payload.idGroup]: payload.newSelection }
  }),
  clearPaymentOrders: action((state) => {
    state.paymentOrders = {}
  }),
  paymentOrderSearchText: '',
  handlePaymentOrderSearchText: action((state, payload) => {
    state.paymentOrderSearchText = payload
  }),
  cleaPaymentOrderSearchText: action((state) => {
    state.paymentOrderSearchText = ''
  }),
}
