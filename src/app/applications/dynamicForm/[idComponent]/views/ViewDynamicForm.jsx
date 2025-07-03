import { BasicTitle, ErrorPage } from '@/libV4'
import TableListForm from '../components/TableListForm/TableListForm'

const ViewDynamicForm = (props) => {
  const { newTitle, isError } = props
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <BasicTitle title={newTitle} />
          <TableListForm {...props} />
        </>
      )}
    </>
  )
}

export default ViewDynamicForm
