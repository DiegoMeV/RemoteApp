import ErrorComponent from './ErrorComponent'

const ErrorPage = () => {
  return (
    <div
      className='flex justify-center'
      style={{
        height: 'calc(100vh - 200px)',
      }}
    >
      <ErrorComponent />
    </div>
  )
}

export default ErrorPage
