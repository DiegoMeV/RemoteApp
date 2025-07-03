import {
  arrayToObject,
  BackdropLoading,
  ErrorPage,
  isEmpty,
  Loading,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { WithAuth } from '../middleware'
import { ViewSelectCompany } from './views'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useStoreActions, useStoreState } from 'easy-peasy'

const SelectCompany = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const companyData = useStoreState((state) => state.company.companyData)

  const setCompanyData = useStoreActions((state) => state.company.setCompanyData)
  const setUserData = useStoreActions((state) => state.user.setUserData)
  const updateUserData = useStoreActions((state) => state.user.updateUserData)
  const setUserParameters = useStoreActions((state) => state.userParameter.setUserParameter)
  const setAdditionalUserInfo = useStoreActions(
    (state) => state.additionalUserInfo.setAdditionalUserInfo
  )

  const { mutateAsync: getUserParameters, isPending: isPendingUserParameters } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlApps',
      url: '/parameters',
      isCompanyRequest: true,
      method: 'get',
      onSuccess: (e) => {
        const dataParameters = arrayToObject(e?.data, 'parametro', 'valor', 'snake')
        setUserParameters(dataParameters)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? '')
      },
    })

  const { mutateAsync: getAdditionalUserInfo, isPending: isPendingAdditionalUserInfo } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlUsers',
      url: `/auth/${companyData?.companyId}/oracle-info`,
      method: 'get',
      onSuccess: (e) => {
        const additionalUserInfo = e?.data?.[0]
        setAdditionalUserInfo(additionalUserInfo)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? '')
      },
    })

  const { mutateAsync: getUserInfo, isPending: gettingUserInfo } = useMutationDynamicBaseUrl({
    baseKey: 'urlUsers',
    url: '/auth',
    method: 'GET',
    onSuccess: (response) => {
      updateUserData(response?.data?.[0])

      if (!isEmpty(response?.data?.[0]?.aliases)) {
        getUserParameters()
        getAdditionalUserInfo()
      }

      toast.success('Información de usuario obtenida correctamente')

      if (response?.data?.[0]?.privileges?.includes('procesos.consola.analitica_personal')) {
        navigate('/dashboard')
        return
      }

      navigate('/inbox')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? '')
    },
  })

  const handleSelectCompany = (company) => {
    setCompanyData(company)
    setUserData({ companies: [company] })
    getUserInfo({
      qry: `/${company.companyId}/user`,
    })
  }

  const {
    data: userCompanies,
    isLoading: loadingCompanies,
    isError: errorLoadingCompanies,
  } = useQueryDynamicApi({
    baseKey: 'urlUsers',
    url: '/auth/companies-access',
  })

  useEffect(() => {
    if (userCompanies) {
      if (userCompanies?.data?.length === 1) {
        handleSelectCompany(userCompanies?.data?.[0])
      }
      setLoading(false)
    }
  }, [navigate, userCompanies])

  return (
    <WithAuth skipEmptyCompanyCheck={true}>
      {errorLoadingCompanies ? (
        <ErrorPage />
      ) : loadingCompanies || loading ? (
        <Loading />
      ) : (
        <>
          {userCompanies?.data?.length === 1 ? (
            <Loading />
          ) : (
            <>
              <BackdropLoading
                loading={gettingUserInfo || isPendingUserParameters || isPendingAdditionalUserInfo}
              />
              <ViewSelectCompany
                userCompanies={userCompanies?.data}
                handleSelectCompany={handleSelectCompany}
              />
            </>
          )}
        </>
      )}
    </WithAuth>
  )
}

export default SelectCompany
