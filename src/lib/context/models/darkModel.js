import { action } from 'easy-peasy'

export const darkModel = {
  dark: 'light',
  setDark: action((state) => {
    state.dark = state.dark === 'light' ? 'dark' : 'light'
  }),
}
