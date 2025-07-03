import { useSearchParams } from 'react-router-dom'

export const useGetAllParams = () => {
  const [searchParams] = useSearchParams()

  const paramsObject = {}

  searchParams.forEach((value, key) => {
    if (key === 'edit') {
      return
    }
    paramsObject[key] = value
  })

  return paramsObject
}

export default useGetAllParams
