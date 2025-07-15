import { action } from 'easy-peasy'

export const previewerModel = {
  previewer: {
    open: false,
    idDocument: null,
    idVersion: null,
    idProcess: null,
    companyId: null,
    nameFile: null,
    url: null,
    loadingPreviewer: false,
    advice: null,
  },
  handleClose: action((state) => {
    state.previewer = { ...state.previewer, open: !state.previewer.open }
  }),
  setPreviewer: action((state, payload) => {
    state.previewer = { ...state.previewer, ...payload }
  }),
  clearPreviewer: action((state) => {
    state.previewer = {
      open: false,
      idDocument: null,
      idVersion: null,
      idProcess: null,
      companyId: null,
      nameFile: null,
      url: null,
      loadingPreviewer: false,
      advice: null,
    }
  }),
}
