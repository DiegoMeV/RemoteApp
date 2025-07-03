import { FormControl, FormHelperText, FormLabel } from '@mui/material'
import { useMemo, useState } from 'react'
import { elementsToReplace, HtmlConfig } from './constants'
import { replaceAllOnStrings } from '@/lib/funcs'
import JoditEditor from 'jodit-react'
// import sanitize from 'sanitize-html'

// Carga dinámica del componente JoditEditor solo en el cliente

const GenericHtmlEditor = ({ error, label, value, onChange, buttons }) => {
  const [isOnPaste, setIsOnPaste] = useState(false)

  const config = useMemo(() => {
    return {
      ...HtmlConfig,
      buttons: buttons ?? HtmlConfig.buttons,
      events: {
        paste: async (e) => {
          await setIsOnPaste(true)
          const data = e?.clipboardData?.getData?.('text/html')
          if (data) {
            const newData = await replaceAllOnStrings(data, elementsToReplace)

            await onChange(newData)
          }
          await setIsOnPaste(false)
        },
      },
    }
  }, [buttons, onChange])

  return (
    <FormControl
      error={error}
      component='fieldset'
      fullWidth
      variant='standard'
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <JoditEditor
        config={config}
        tabIndex={1}
        value={value ?? null}
        onBlur={(content) => {
          if (!isOnPaste) {
            onChange(content)
          }
        }}
      />
      {error && <FormHelperText>Este campo es requerido.</FormHelperText>}
    </FormControl>
  )
}

export default GenericHtmlEditor
