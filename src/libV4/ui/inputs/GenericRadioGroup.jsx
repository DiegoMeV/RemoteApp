import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { forwardRef } from 'react'

const GenericRadioGroup = forwardRef((props, ref) => {
  const theme = useTheme()
  return (
    <>
      {props.description && <div className='mt-1 col-span-full'>{props.description}</div>}
      <label className={props?.classNameLabel ?? 'col-span-full'}> {props?.label} </label>
      <RadioGroup
        name={props?.name ?? 'genericTypeSelector'}
        value={props?.value ?? ''}
        onChange={props?.onChange}
        className={props?.className}
        ref={ref}
      >
        {props?.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
            sx={{
              bgcolor: props?.value === option.value ? alpha(theme.palette.primary.main, 0.12) : '',
              borderRadius: 1,
              borderWidth: 1,
              borderColor: props?.error
                ? 'error.main'
                : props?.value === option.value
                ? 'primary.main'
                : '',
              color: props?.value === option.value ? 'primary.main' : '',
              m: 0,
              ...props?.FormControlLabelProps?.sx,
            }}
            className={option.className ?? ''}
          />
        ))}
      </RadioGroup>
    </>
  )
})
GenericRadioGroup.displayName = 'GenericRadioGroup'
export default GenericRadioGroup
