import { IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

const SearchTable = ({
  searchText,
  onChange = () => {},
  clearSearch = () => {},
  handleKeyDown = () => {},
  width,
  label,
  InputLabelProps,
  className = '',
  ...rest
}) => {
  return (
    <TextField
      variant='outlined'
      size='small'
      value={searchText ?? ''}
      fullWidth
      className={className}
      label={label ? label : null}
      onChange={(event) => onChange(event.target.value)}
      placeholder={label ? null : 'Buscar...'}
      autoFocus
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <SearchIcon
            fontSize='small'
            color='secondary'
            sx={{ mr: '10px' }}
          />
        ),
        endAdornment: (
          <IconButton
            title='Clear'
            aria-label='Clear'
            size='small'
            style={{ visibility: searchText ? 'visible' : 'hidden' }}
            onClick={clearSearch}
          >
            <ClearIcon fontSize='small' />
          </IconButton>
        ),
      }}
      InputLabelProps={{ ...InputLabelProps }}
      sx={{ backgroundColor: 'backgroundWhite1', width: width ?? '60%' }}
      {...rest}
    />
  )
}

export default SearchTable
