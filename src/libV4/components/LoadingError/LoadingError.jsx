import { ErrorPage } from '../Error'
import { LoadingPage } from '../Loading'

const LoadingError = ({ loading, error, children }) => {
  return <>{loading ? <LoadingPage /> : error ? <ErrorPage /> : <>{children}</>}</>
}

export default LoadingError
