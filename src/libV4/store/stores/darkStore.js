export const darkStore = (set) => ({
  dark: false,
  setDark: () =>
    set((state) => ({
      dark: !state.dark,
    })),
})
