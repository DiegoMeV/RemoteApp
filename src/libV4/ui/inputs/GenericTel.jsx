import { MuiTelInput } from 'mui-tel-input'
import { forwardRef } from 'react'

const GenericTel = forwardRef(function GenericTel(props, ref) {
  return (
    <MuiTelInput
      ref={ref}
      defaultCountry='CO'
      size='small'
      fullWidth
      {...props}
      value={props.value ?? ''}
    />
  )
})

GenericTel.displayName = 'GenericTel'

export default GenericTel
