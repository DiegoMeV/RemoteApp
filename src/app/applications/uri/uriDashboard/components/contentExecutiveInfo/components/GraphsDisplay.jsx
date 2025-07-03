import React, { useEffect } from 'react'
import AccordionDisplay from '../../AccordionDisplay'
import { accordionsGraphs } from '../funcs'
import { ErrorPage, Loading, useMutationDynamicBaseUrl } from '@/lib'

const GraphsDisplay = ({ registryAriSigeDoc }) => {
  const {
    mutateAsync: mutateExecutiveInfo,
    isPending: loadingExecutiveInfo,
    isError: errorExecutiveInfo,
    data: infoExecutiveInfo,
  } = useMutationDynamicBaseUrl({
    url: `analytics/infoEjecutiva`,
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })

  useEffect(() => {
    mutateExecutiveInfo({ qry: `?sigedocInclusion=${registryAriSigeDoc}` })
  }, [mutateExecutiveInfo, registryAriSigeDoc])

  const AccordionsGraph = accordionsGraphs({ infoExecutiveInfo })
  return (
    <>
      {loadingExecutiveInfo ? (
        <Loading />
      ) : errorExecutiveInfo ? (
        <ErrorPage />
      ) : (
        <AccordionDisplay AccordionData={AccordionsGraph} />
      )}
    </>
  )
}

export default GraphsDisplay
