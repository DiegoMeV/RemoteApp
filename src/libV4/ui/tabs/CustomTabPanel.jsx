const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={`p-4 ${other.className ?? ''}`}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

export default CustomTabPanel
