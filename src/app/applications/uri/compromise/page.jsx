import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { compromiseColumns } from './funcs'
import { useNavigate } from 'react-router-dom'
import { ViewTables } from './views'
import useGetCompromise from '@/lib/api/ari/useGetCompromise'
const Engagement = () => {
  const { data: dataCompromises, isLoading, isError } = useGetCompromise()
  const apiRef = useGridApiRef()
  const navigate = useNavigate()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const columns = compromiseColumns(navigate)
  const handleCreate = () => {
    navigate(`/applications/uri/compromise/compromiseUri`)
  }
  const tableProps = {
    dataCompromises,
    columns,
    isLoading,
    isError,
    apiRef,
    dark,
    navigate,
    handleCreate,
  }

  return <ViewTables {...tableProps} />
}

export default Engagement
