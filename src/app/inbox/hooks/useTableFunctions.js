import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const useTableFunctions = () => {
  const setSearchText = useStoreActions((actions) => actions.searchText.setSearchText)

  const navigate = useNavigate()

  const handleDoubleClick = (rowdata) => {
    navigate(`/inbox/${rowdata?.idProcess}/${rowdata?.id}`)
  }

  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
  }

  return {
    handleDoubleClick,
    requestSearch,
  }
}
export default useTableFunctions
