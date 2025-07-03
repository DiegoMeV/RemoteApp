import { useRootStore } from '../../store'
import { useQueryDynamicApi } from '../useDynamicApi'

const useGetUserWithImage = ({ qry, ...props }) => {
  const { companyData, tokenData } = useRootStore()
  const { data, ...rest } = useQueryDynamicApi({
    baseKey: 'urlUsers',
    url: `/users${qry ?? ''}`,
    ...props,
  })

  const users = data?.data?.map(async (user) => {
    if (!user.preferences?.avatar) return { ...user }

    const image = await fetch(
      `${import.meta.env.VITE_API_DOCUMENTS}/${companyData?.companyId}/archivos/${
        user.preferences?.avatar
      }`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      }
    )

    const imageObject = await image.json()

    return { ...user, avatarImage: imageObject }
  }, [])

  const newData = {
    data: {
      ...data,
      data: users,
    },
    ...rest,
  }

  return newData
}

export default useGetUserWithImage
