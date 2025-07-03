import { useState } from 'react'

const useEnableAutocompleteRequest = () => {
  const [enabledRequest, setEnabledRequest] = useState(false)
  const enabledRequestFunction = () => {
    if (!enabledRequest) {
      setEnabledRequest(true)
    }
  }
  return { enabledRequest, enabledRequestFunction }
}

export default useEnableAutocompleteRequest
