import { action } from "easy-peasy";

export const companyModel = {
  companyData: undefined,
  setCompanyData: action((state, payload) => {
    state.companyData = payload;
  }),
  updateCompanyData: action((state, payload) => {
    state.companyData = { ...state.companyData, ...payload };
  }),
  clearCompanyData: action((state) => {
    state.companyData = undefined;
  }),
};
