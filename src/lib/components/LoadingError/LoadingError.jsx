import { ErrorPage } from '../ErrorPage'
import { Loading } from '../LoadingLogo'

const LoadingError = ({ loading, error, children }) => {
  return <>{loading ? <Loading /> : error ? <ErrorPage /> : <>{children}</>}</>
}

export default LoadingError
