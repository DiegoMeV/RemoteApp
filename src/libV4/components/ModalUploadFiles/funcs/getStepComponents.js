import { ColumnMatching, PushDataSection, UploadFile, ViewExcelData } from '../components'
import { ValidateInfo } from '../components/ValidateInfo'

export const getStepComponents = ({
  form,
  rowsFile,
  columnsFile,
  infoTypeDoc,
  errors,
  setErrors,
}) => ({
  0: <UploadFile form={form} />,
  1: (
    <ViewExcelData
      form={form}
      rowsFile={rowsFile}
      columnsFile={columnsFile}
    />
  ),
  2: (
    <ColumnMatching
      infoTypeDoc={infoTypeDoc}
      columnsFile={columnsFile}
      form={form}
    />
  ),
  3: (
    <ValidateInfo
      rowsFile={rowsFile}
      form={form}
      errors={errors}
      setErrors={setErrors}
    />
  ),
  4: <PushDataSection errors={errors} />,
})
