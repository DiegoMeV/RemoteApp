import { action } from 'easy-peasy'

export const stateOrientationModel = {
  orientation: 'horizontal',
  setOrientation: action((state) => {
    if (state.orientation === 'vertical') {
      state.orientation = 'horizontal'
    } else {
      state.orientation = 'vertical'
    }
  }),
  clearOrientation: action((state) => {
    state.orientation = 'horizontal'
  }),
}
