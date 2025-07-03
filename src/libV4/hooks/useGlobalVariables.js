import { useRootStore } from '../store'

const useGlobalVariables = () => {
  const { userData, userParameters, companyData } = useRootStore()

  const nit_compania = userData?.companies?.[0]?.Company?.taxId
  const usuario = userData?.aliases?.SIIFWEB
  const idCompany = companyData?.companyId
  const getGlobalVariables = ({ item } = {}) => {
    const globalVariables = {
      usuario,
      idCompany,
      nit_compania,
      ...userParameters,
    }

    return item ? globalVariables[item] : globalVariables
  }

  return getGlobalVariables
}
export default useGlobalVariables
