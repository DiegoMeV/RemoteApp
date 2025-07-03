export const sessionAzureStore = (set) => ({
  sessionAzure: false,
  setSessionAzure: (payload) => set({ sessionAzure: payload }),
  clearSessionAzure: () => set({ sessionAzure: false }),
})
