import { useRootStore } from '@/libV4'
import { useEffect } from 'react'

const useClearSessionAzure = () => {
  const { clearSessionAzure } = useRootStore()
  useEffect(() => {
    clearSessionAzure()
  }, [clearSessionAzure])
}
export default useClearSessionAzure
