import {
  BasicTable,
  BasicTitle,
  ErrorPage,
  GenericTextfield,
  useQueryDynamicApi,
  useSearch,
} from '@/libV4'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { typeProcessColumns } from '../funcs'

const ViewPTByGroup = ({ idGroup }) => {
  const navigate = useNavigate()

  const columns = typeProcessColumns(navigate)

  const search = useSearch()

  const {
    data: processTypes,
    isLoading: loadingProcessTypes,
    isError: errorLoadingProcessTypes,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/process-types?idGroup=${idGroup}&all=true`,
  })

  const newData = processTypes?.data?.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })

  return errorLoadingProcessTypes ? (
    <ErrorPage />
  ) : (
    <div className='grid grid-cols-12 p-4'>
      <BasicTitle
        title='Tipos de proceso'
        backpath='/administration/groupProcess'
        className='col-span-12 justify-between'
      >
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => navigate(`/administration/editTypeProcess/${idGroup}/new`)}
        >
          Agregar
        </Button>
      </BasicTitle>
      <div className='col-span-12 flex flex-col backgroundGray1 p-4 gap-2'>
        <GenericTextfield
          label='Buscar'
          value={search.value}
          onChange={(e) => {
            search.handleChange(e.target.value)
          }}
        />
        <BasicTable
          rows={newData}
          columns={columns}
          isLoading={loadingProcessTypes}
          containerProps={{
            className: 'col-span-12 h-[calc(100vh-350px)]',
          }}
        />
        {/* <GenericTableADCursor
          requestProps={{
            baseKey: 'urlProcess',
            url: `/process-types?idGroup=${idGroup}&all=true`,
            isPaginated: false,
          }}
          tableProps={{
            divClassName: 'col-span-12 h-[calc(100vh-200px)]',
            columns: columns,
            scroll: {
              y: 'calc(100vh - 300px)',
            },
          }}
          toolbarProps={{
            searchProps: {},
          }}
        /> */}
      </div>
    </div>
  )
}

export default ViewPTByGroup
