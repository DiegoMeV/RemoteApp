import { CheckBox, CheckBoxOutlineBlank, FilterAlt } from '@mui/icons-material'
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Popover,
  TableCell,
  TableSortLabel,
} from '@mui/material'
import { useState } from 'react'
import { cellSyles } from '../../funcs'

const CellHeader = ({ column, rowSize, orderBy, order, filters, handleFilter, handleSort }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <TableCell
      key={column.field}
      align={column.align}
      size={rowSize}
      sx={{ ...cellSyles(column), height: 52, backgroundColor: 'backgroundWhite1' }}
    >
      <div className='flex items-center justify-between'>
        {column?.renderHeader ? (
          column.renderHeader(column)
        ) : (
          <TableSortLabel
            active={orderBy === column.field}
            direction={orderBy === column.field ? order : 'asc'}
            onClick={() => handleSort(column.field)}
            className='font-bold'
          >
            {column.headerName}
          </TableSortLabel>
        )}
        {column?.filters && (
          <>
            <IconButton onClick={handleClick}>
              <FilterAlt />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List>
                {column.filters.map((filter, index) => {
                  return (
                    <ListItemButton
                      key={index}
                      onClick={() => handleFilter(column.field, filter.value)}
                    >
                      <ListItemIcon>
                        {filters?.[column.field]?.includes(filter.value) ? (
                          <CheckBox />
                        ) : (
                          <CheckBoxOutlineBlank />
                        )}
                      </ListItemIcon>
                      {filter?.label ?? ''}
                    </ListItemButton>
                  )
                })}
              </List>
            </Popover>
          </>
        )}
      </div>
    </TableCell>
  )
}

export default CellHeader
