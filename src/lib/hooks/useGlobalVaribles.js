import { useStoreState } from 'easy-peasy'

const useGlobalVaribles = () => {
  const userData = useStoreState((state) => state.user.userData)
  const userParameters = useStoreState((state) => state.userParameter.userParameter)
  const companyData = useStoreState((state) => state.company.companyData)
  const additionalUserInfo = useStoreState((state) => state.additionalUserInfo.additionalUserInfo)

  const nit_compania = userData?.companies?.[0]?.Company?.taxId
  const usuario = userData?.aliases?.SIIFWEB
  const idCompany = companyData?.companyId
  const taxt_id = companyData?.Company?.taxId
  const division = additionalUserInfo?.division

  const getGlobalVariables = ({ item } = {}) => {
    const globalVariables = {
      usuario,
      idCompany,
      nit_compania,
      taxt_id,
      division,
      additionalUserInfo,
      ...userParameters,
    }

    return item ? globalVariables[item] : globalVariables
  }

  return getGlobalVariables
}
export default useGlobalVaribles
