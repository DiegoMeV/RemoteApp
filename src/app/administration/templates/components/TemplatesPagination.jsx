import { useState } from 'react'
import { calculatePageRange } from '../funcs'
import { Typography } from '@mui/material'
import { ClassicIconButton } from '@/lib'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

const TemplatesPagination = ({
  templatesInfo,
  isLoading,
  isError,
  totalCount,
  setCursorApi,
  queryClient,
  pageCount,
  setPageCount,
}) => {
  const pageRange = calculatePageRange(pageCount, totalCount)
  const [lastIds, setLastIds] = useState([])

  const nextSearch = () => {
    const actualLastId = templatesInfo?.data[templatesInfo?.data.length - 1]?.id
    setLastIds((prevIds) => [...prevIds, actualLastId])
    setCursorApi(actualLastId)
    setPageCount((prev) => prev + 1)
    queryClient.invalidateQueries([`/plantillas`])
  }

  const backSearch = () => {
    const newLastIds = [...lastIds]
    const previousLastId = newLastIds[newLastIds.length - 2]
    setCursorApi(previousLastId)
    setLastIds(newLastIds.slice(0, -1))
    setPageCount((prev) => prev - 1)
    queryClient.invalidateQueries([`/plantillas`])
  }

  const isDisabled = isLoading || Math.min(pageCount * 20, totalCount) === totalCount

  return (
    <>
      {!isError && (
        <div className='flex w-full justify-end my-4'>
          <ClassicIconButton
            onClick={() => backSearch()}
            title='Atras'
            disabled={isLoading || pageCount === 1}
          >
            <ArrowBackIos />
          </ClassicIconButton>
          <Typography
            variant='body2'
            alignSelf='center'
          >
            {pageRange}
          </Typography>
          <ClassicIconButton
            onClick={() => nextSearch()}
            title='Siguiente'
            disabled={isDisabled}
          >
            <ArrowForwardIos />
          </ClassicIconButton>
        </div>
      )}
    </>
  )
}

export default TemplatesPagination
