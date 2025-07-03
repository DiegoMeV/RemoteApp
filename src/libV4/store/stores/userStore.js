export const userStore = (set) => ({
  userData: undefined,
  setUserData: (payload) => set({ userData: payload }),
  updateUserData: (payload) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...payload,
      },
    })),
  clearUserData: () => set({ userData: undefined }),
})
