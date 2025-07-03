import { Box } from '@mui/material'
import { ClassicIconButton } from '../../buttons'

const MappingOptions = ({ options }) => {
  return (
    <Box>
      {options?.map((option, index) => {
        const conditional = option?.render ?? true
        if (conditional) {
          return (
            <ClassicIconButton
              key={index}
              title={option?.title ?? ''}
              onClick={option?.onClick}
              color='secondary'
            >
              {option?.icon ?? <></>}
            </ClassicIconButton>
          )
        }
      })}
    </Box>
  )
}

export default MappingOptions
