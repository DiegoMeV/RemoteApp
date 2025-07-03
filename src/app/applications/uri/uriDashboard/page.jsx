import { NoAccessCard } from '@/lib'
import { useState } from 'react'
import { ViewUriDashboard } from './view'
import { AccessControl } from '@/libV4'

const UriDashboard = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <AccessControl
      privilege='cgr.uri.visualizar_dashboard'
      nodeContent={<NoAccessCard />}
    >
      <ViewUriDashboard
        value={value}
        handleChange={handleChange}
      />
    </AccessControl>
  )
}

export default UriDashboard
