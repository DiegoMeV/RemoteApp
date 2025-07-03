import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { baseUrls } from '@/lib/constants'

const useSignoutAzure = () => {
  const baseUrl = baseUrls.urlUsers
  return useMutation({
    mutationFn: async (isSignout) => {
      const qry = `/auth/azure/signout`
      try {
        if (isSignout) {
          const response = await axios.get(`${baseUrl}${qry}`)
          return response.data
        }
        return null
      } catch (error) {
        throw error
      }
    },
  })
}

export default useSignoutAzure
