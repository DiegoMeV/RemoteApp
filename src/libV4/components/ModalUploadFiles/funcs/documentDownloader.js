import { removeUndefinedAndNullValues } from '@/lib/funcs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Excel from 'exceljs'
import toast from 'react-hot-toast'

dayjs.extend(utc)
dayjs.extend(timezone)

const xlsxToJson = async (
  file,
  setColumnsFile,
  setRowsFile,
  setActiveStep,
  activeStep,
  setLoading
) => {
  const workbook = new Excel.Workbook()
  const getFile = await workbook.xlsx.load(file)
  const worksheet = getFile.getWorksheet(1)
  const columns = worksheet.getRow(1).values
  const columnsFilter = removeUndefinedAndNullValues(columns)
  const formatDate = (date) => {
    const dateFF = date.toISOString()
    const fechaUTC = dayjs.utc(dateFF)
    const formattedDate = fechaUTC.format('YYYY-MM-DD')
    return dayjs(formattedDate)
  }
  setColumnsFile(columnsFilter)
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
          if (rowData[index] instanceof Date) {
            rowObj[column] = formatDate(rowData[index])
            return
          }
          rowObj[column] = rowData[index]
        })
        setRowsFile((prev) => [...prev, rowObj])
      }
    })
    setActiveStep(activeStep + 1)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    toast.error(error)
  }
}

export const blobToFileBuffer = (
  blob,
  setColumnsFile,
  setRowsFile,
  setActiveStep,
  activeStep,
  setLoading
) => {
  const reader = new FileReader()
  reader.onload = function (event) {
    const arrayBuffer = event.target.result
    xlsxToJson(arrayBuffer, setColumnsFile, setRowsFile, setActiveStep, activeStep, setLoading)
  }
  reader.readAsArrayBuffer(blob)
}
