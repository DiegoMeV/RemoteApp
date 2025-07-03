import { Box, Tab, Tabs } from '@mui/material'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CustomTabHeaders = ({ value, handleChange, options, ...rest }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        {...rest}
      >
        {options?.map((option, index) => {
          return (
            <Tab
              key={index}
              label={option.label}
              {...a11yProps(index)}
              {...option?.props}
              sx={{
                fontWeight: value === index ? 'bold' : 'normal',
                ...option?.props?.sx,
                ...option?.tabProps,
              }}
            />
          )
        })}
      </Tabs>
    </Box>
  )
}

export default CustomTabHeaders
