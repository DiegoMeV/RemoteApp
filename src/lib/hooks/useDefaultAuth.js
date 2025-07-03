import { useSearchParams } from 'react-router-dom'

const useDefaultAuth = () => {
  const [searchParams] = useSearchParams()
  const devMode = searchParams.get('devMode')
  return devMode
}

export default useDefaultAuth
