import { action } from 'easy-peasy'

export const searchTextInboxModel = {
  searchText: '',
  setSearchText: action((state, payload) => {
    state.searchText = payload
  }),
  clearSearchText: action((state) => {
    state.searchText = ''
  }),
  clearSearch: action((state) => {
    state.searchText = ''
  }),
}
