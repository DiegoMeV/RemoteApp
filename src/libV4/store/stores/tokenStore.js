export const tokenStore = (set) => ({
  tokenData: undefined,
  setTokenData: (payload) => set({ tokenData: payload }),
  clearTokenData: () => set({ tokenData: undefined }),
})
