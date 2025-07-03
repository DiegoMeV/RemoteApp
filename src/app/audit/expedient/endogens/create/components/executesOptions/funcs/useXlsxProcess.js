import { useEffect, useState } from 'react'
import { removeUndefinedAndNullValues } from '@/lib/funcs'
import Excel from 'exceljs'
import toast from 'react-hot-toast'
import { MagicString, useMutationDynamicBaseUrl } from '@/lib'

export const useXlsxProcess = ({ idInspectionPlan }) => {
  const { mutateAsync: markSubjects, isPending: isLoadingMarkSubjects } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlFiscalizacion',
      url: `/inspectionPlan/${idInspectionPlan}/subject/mark-subjects`,
      isCompanyRequest: true,
      method: 'PATCH',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al marcar contribuyentes')
      },
    }
  )

  const [rowsFile, setRowsFile] = useState()

  useEffect(() => {
    if (rowsFile) {
      const transformedRowsFile = rowsFile?.map((row) =>
        Object.keys(row).reduce((acc, key) => {
          const newKey =
            key.toLowerCase() === 'sujeto_fiscaliza' ? 'sujetosFiscaliza' : key.toLowerCase()
          acc[newKey] = row[key]
          return acc
        }, {})
      )
      const bodyToSent = { taxPayers: transformedRowsFile }
      markSubjects({ body: bodyToSent })
    }
  }, [markSubjects, rowsFile])

  const xlsxToJson = async (file, setRowsFile) => {
    const workbook = new Excel.Workbook()
    const getFile = await workbook.xlsx.load(file)
    const worksheet = getFile.getWorksheet(1)
    const columns = worksheet.getRow(1).values
    const columnsFilter = removeUndefinedAndNullValues(columns).map((col) => col.toLowerCase())
    if (
      columnsFilter.length === 2 &&
      columnsFilter.includes('sujeto_fiscaliza') &&
      columnsFilter.includes('estado')
    ) {
      try {
        setRowsFile([])
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            const rowData = row.values
            const rowObj = {}
            columns.forEach((column, index) => {
              if (typeof rowData[index] === 'object' && !!rowData[index].text) {
                rowObj[column] = rowData[index].text
                return
              }
              rowObj[column] = rowData[index]
            })
            setRowsFile((prev) => [...prev, rowObj])
          }
        })
      } catch (error) {
        toast.error(error)
      }
    } else {
      toast.error('El archivo debe contener solo las columnas SUJETO_FISCALIZA y ESTADO')
    }
  }

  const blobToFileBuffer = (blob, setRowsFile, setActiveStep, activeStep, setLoading) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const arrayBuffer = event.target.result
      xlsxToJson(arrayBuffer, setRowsFile, setActiveStep, activeStep, setLoading)
    }
    reader.readAsArrayBuffer(blob)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      event.target.value = null
    } else if (file) {
      blobToFileBuffer(file, setRowsFile)
    }
  }
  return { handleFileChange, isLoadingMarkSubjects }
}
