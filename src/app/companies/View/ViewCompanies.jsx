import { CardCompaniesOptions } from '../components'
import { LoadingError } from '@/libV4'

const ViewCompanies = ({ companies, loadingCompanies, errorCompanies }) => {
  return (
    <div className='general_page_container'>
      <LoadingError
        loading={loadingCompanies}
        error={errorCompanies}
      >
        <CardCompaniesOptions companies={companies} />
      </LoadingError>
    </div>
  )
}

export default ViewCompanies
