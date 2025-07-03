import { ExpandMore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  gridDetailPanelExpandedRowsContentCacheSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium'
import { isValidElement } from 'react'

const CustomExpand = (props) => {
  const { id, value: isExpanded } = props
  const apiRef = useGridApiContext()

  // To avoid calling ´getDetailPanelContent` all the time, the following selector
  // gives an object with the detail panel content for each row id.
  const contentCache = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector)

  // If the value is not a valid React element, it means that the row has no detail panel.
  const hasDetail = isValidElement(contentCache[id])

  return (
    <IconButton
      size='small'
      tabIndex={-1}
      disabled={!hasDetail}
      aria-label={isExpanded ? 'Close' : 'Open'}
    >
      <ExpandMore
        sx={{
          transform: `rotateZ(${isExpanded ? 180 : 0}deg)`,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        }}
        fontSize='inherit'
      />
    </IconButton>
  )
}

export default CustomExpand
