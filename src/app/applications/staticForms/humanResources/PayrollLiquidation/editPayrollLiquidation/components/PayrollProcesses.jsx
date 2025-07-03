import {
  BackdropLoading,
  BasicTable,
  BasicTitle,
  ClassicIconButton,
  encodeKeys,
  encodeString,
  iterationNumber,
} from '@/libV4'
import { useEffect, useState } from 'react'
import { infoProcesses } from '../constants'
import { HeaderTable } from '../../../components'
import { Delete } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useExecuteAction } from '@/app/applications/hooks/useExecuteAction'

const PayrollProcesses = ({
  nit_compania,
  periodo,
  nomina,
  getQueryResult,
  isPendingQuery,
  setVLProps,
  dataPayrollProcesses,
  handleGetPayrollProcesses,
  searchPayrollProcesses,
}) => {
  const [dataProcesses, setDataProcesses] = useState([])
  const numIterations = iterationNumber()

  const toggleDisabled = (_, params) => {
    const isMatch = dataPayrollProcesses?.data?.some((process) => {
      return process?.liquidacion === params?.row?.liquidacion
    })
    return isMatch ? true : false
  }

  const handleGetProcesses = async () => {
    try {
      const queryProcesses = infoProcesses({ nit_compania })
      const response = await getQueryResult(queryProcesses)
      setDataProcesses(response ?? [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const { executeAction, isPendingExecute } = useExecuteAction({
    shema: 'siif',
    tableName: 'procesos_incluidos',
    numIterations,
    onSuccessFunc: () => {
      handleGetProcesses()
      handleGetPayrollProcesses(searchPayrollProcesses?.searchText)
      toast.success('Acción ejecutada correctamente')
    },
  })

  const handleSelect = async (params) => {
    await executeAction({
      body: {
        action: encodeString(numIterations, 'insert'),
        data: encodeKeys({ nomina, periodo, liquidacion: params?.row?.liquidacion }, numIterations),
      },
    })
  }

  const handleDelete = async (params) => {
    await executeAction({
      body: {
        action: encodeString(numIterations, 'delete'),
        where: encodeKeys({ liquidacion: params?.liquidacion }, numIterations),
      },
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleGetProcesses()
        handleGetPayrollProcesses(searchPayrollProcesses?.searchText)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BackdropLoading loading={isPendingExecute} />
      <BasicTitle title='Liquidación nómina' />
      <section className='grid grid-cols-12 gap-4 p-4 backgroundGray1'>
        <HeaderTable
          searchOptions={searchPayrollProcesses}
          handleAdd={() => {
            setVLProps({
              open: true,
              rows: dataProcesses,
              title: 'Procesos',
              toggleDisabled: toggleDisabled,
              selectedOption: (params) => {
                handleSelect(params)
              },
              dgProps: {
                getRowId: (row) => row?.liquidacion,
              },
              columns: [
                {
                  field: 'liquidacion',
                  headerName: 'Liquidación',
                  width: 100,
                },
                {
                  field: 'descripcion',
                  headerName: 'Descripcion',
                  width: 300,
                },
              ],
            })
          }}
          handleSearch={handleGetPayrollProcesses}
        />
        <BasicTable
          containerProps={{
            className: 'h-[calc(100vh-320px)]',
          }}
          columns={[
            {
              field: 'liquidacion',
              headerName: 'Liquidación',
              width: 100,
            },
            {
              field: 'descripcion',
              headerName: 'Descripcion',
              width: 300,
            },
            {
              field: 'options',
              headerName: '',
              sortable: false,
              disableColumnMenu: true,
              width: 100,
              renderCell: (params) => {
                return (
                  <ClassicIconButton
                    title='Eliminar'
                    onClick={() => handleDelete?.(params)}
                  >
                    <Delete />
                  </ClassicIconButton>
                )
              },
              resizable: false,
            },
          ]}
          rows={dataPayrollProcesses?.data ?? []}
          loading={isPendingQuery}
          paginationLocal={{
            rowsPerPageOptions: { label: '100', value: 100 },
            defaultModel: {
              page: 0,
              pageSize: 100,
            },
          }}
        />
      </section>
    </>
  )
}

export default PayrollProcesses
