import { Typography } from '@mui/material'
import { DocumentContainer } from '..'
import ElementAssignment from './ElementAssignment'
import { useEffect, useState, useMemo } from 'react'

const DocumentAssignment = ({
  elementData,
  ids,
  idActivityAction,
  refetchManagement,
  refetchElementActions,
  activityInfo,
}) => {
  const [maxDate, setMaxDate] = useState()

  const datesRegistry = elementData.map((element) => {
    return element?.activityActionItemData?.estimatedCompletion
  })
  const validDates = datesRegistry.filter((date) => date !== undefined)
  const highestDate = useMemo(() => {
    if (validDates.length === 0) return
    const maxTimestamp = Math.max(...validDates.map((date) => new Date(date).getTime()))
    return new Date(maxTimestamp)
  }, [validDates])
  useEffect(() => {
    if (highestDate) {
      setMaxDate(highestDate)
      return
    }
    setMaxDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementData])

  return (
    <DocumentContainer>
      {elementData?.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <ElementAssignment
              key={index}
              elementAction={elementAction}
              idTaskAction={elementAction?.idTaskAction}
              ids={ids}
              idActivityAction={idActivityAction}
              refetchManagement={refetchManagement}
              refetchElementActions={refetchElementActions}
              setMaxDate={setMaxDate}
              maxDate={maxDate}
              activityInfo={activityInfo}
            />
          )
        })
      ) : (
        <Typography variant='body1'>
          Revisar parametrización, esta acción no contiene elementos.
        </Typography>
      )}
    </DocumentContainer>
  )
}

export default DocumentAssignment
