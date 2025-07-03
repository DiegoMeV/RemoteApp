import { useEffect, useState } from 'react'
import { ErrorPage, GenericTable, Loading, useQueryDynamicApi } from '@/lib'
import { Box } from '@mui/material'
import FormComponent from './FormComponent'

const TableViewDocument = ({ form }) => {
  const data = form.getValues()
  const [columnsFile, setColumnsFile] = useState([])
  const [rowsFile, setRowsFile] = useState([])
  const {
    data: subjectInspectionPlan,
    isFetching: loadingsubjectInspectionPlan,
    isError: errorSubjectInspectionPlan,
  } = useQueryDynamicApi({
    url: `/inspectionPlan/${data.id}/subject`,
    baseKey: 'urlFiscalizacion',
    isCompanyRequest: true,
  })
  const generateColumns = (fileColsSpecs) => {
    return fileColsSpecs?.map((colSpec) => ({
      field: colSpec.keyName,
      headerName: colSpec.label,
      width: 150,
      valueGetter: (params) => {
        return params.row.data[colSpec.keyName]
      },
    }))
  }
  useEffect(() => {
    const generatedColumns = generateColumns(data.FileColsSpecs)
    setColumnsFile(generatedColumns)
  }, [data.FileColsSpecs])
  useEffect(() => {
    if (subjectInspectionPlan) {
      if (form.getValues('rowsCount') === 0 && subjectInspectionPlan.data.length > 0) {
        form.setValue('rowsCount', subjectInspectionPlan.data.length)
      }
      setRowsFile(subjectInspectionPlan.data)
    }
  }, [subjectInspectionPlan])

  return (
    <>
      {loadingsubjectInspectionPlan ? (
        <Loading />
      ) : errorSubjectInspectionPlan ? (
        <ErrorPage />
      ) : (
        <Box
          display={'flex'}
          flexDirection={'column'}
          className='overflow-auto'
          py={2}
          gap={3}
        >
          <FormComponent control={form.control} />
          <Box
            width='100%'
            maxHeight={'calc(100vh - 620px)'}
            mb={2}
          >
            <GenericTable
              rows={rowsFile ?? []}
              columns={columnsFile ?? []}
              pagination
              pageSizeOptions={[25, 50, 100]}
              initialState={{
                pagination: { paginationModel: { pageSize: 50 } },
                pinnedColumns: {
                  right: ['options'],
                },
              }}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default TableViewDocument
