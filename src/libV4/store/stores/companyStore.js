export const companyStore = (set) => ({
  companyData: undefined,
  setCompanyData: (payload) => set({ companyData: payload }),
  updateCompanyData: (payload) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...payload,
      },
    })),
  clearCompanyData: () => set({ userData: undefined }),
})
