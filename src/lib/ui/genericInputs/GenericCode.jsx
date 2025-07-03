import { Box, FormHelperText, FormLabel } from '@mui/material'
import { forwardRef } from 'react'
import Editor from '@monaco-editor/react'

const GenericCode = forwardRef(function GenericCode(
  { value, defaultValue, onChange, label, language, height, error, helperText, informationLabel },
  ref
) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormLabel error={error}>{label ?? ''}</FormLabel>
      <FormLabel error={true}>{informationLabel ?? ''}</FormLabel>
      <Box
        sx={{
          width: '100%',
          py: 2,
          border: 1,
          borderColor: error ? 'red.600' : 'grey.300',
          borderRadius: '6px',
        }}
      >
        <Editor
          ref={ref}
          language={language ?? 'javascript'}
          defaultValue={defaultValue ?? ''}
          value={value ?? ''}
          onChange={(val) => onChange(val)}
          height={height ?? '200px'}
        />
      </Box>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Box>
  )
})
GenericCode.displayName = 'GenericCode'

export default GenericCode
