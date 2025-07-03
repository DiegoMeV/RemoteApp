import { FormHelperText, FormLabel } from '@mui/material'
import { forwardRef } from 'react'
import Editor from '@monaco-editor/react'

const GenericCode = forwardRef(function GenericCode(
  { value, defaultValue, onChange, label, language, height, error, helperText, informationLabel },
  ref
) {
  return (
    <div className='flex flex-col'>
      <FormLabel error={error}>{label ?? ''}</FormLabel>
      <FormLabel error={true}>{informationLabel ?? ''}</FormLabel>
      <div className={`py-2 border ${error ? 'border-red-600' : 'border-gray-300'} rounded-md`}>
        <Editor
          ref={ref}
          language={language ?? 'javascript'}
          defaultValue={defaultValue ?? ''}
          value={value ?? ''}
          onChange={(val) => onChange(val)}
          height={height ?? '200px'}
        />
      </div>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </div>
  )
})
GenericCode.displayName = 'GenericCode'

export default GenericCode
