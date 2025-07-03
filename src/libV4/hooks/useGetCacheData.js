import { useQueryClient } from '@tanstack/react-query'

const useGetCacheData = ({ query }) => {
  const queryClient = useQueryClient()
  const info = queryClient.getQueryData([query])
  return info
}

export default useGetCacheData
