import { useEffect, useState } from 'react'
import { ErrorPage, GenericTextfield, LoadingSkeletonCards, useSearch } from '@/libV4'
import { Clear, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import GroupsList from './GroupsList'

const AplicationsList = ({ dataApplication, isLoading, isError }) => {
  const { value, handleChange } = useSearch()
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    if (dataApplication && value.length > 2) {
      const dataFilterForSearch = dataApplication?.filter?.((application) =>
        application?.name?.toLowerCase().includes(value.toLowerCase())
      )
      setFilterData(dataFilterForSearch)
    } else {
      setFilterData(dataApplication)
    }
  }, [value, dataApplication])

  return (
    <article className='general_page_container backgroundGray1 rounded-bl-lg rounded-br-lg shadow-lg'>
      <GenericTextfield
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <Search
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
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={() => handleChange('')}
            >
              <Clear fontSize='small' />
            </IconButton>
          ),
        }}
      />
      {isLoading ? (
        <aside className='items-center w-full h-[calc(100vh-280px)] overflow-auto px-4 py-2'>
          <LoadingSkeletonCards
            height={'450px'}
            amount={9}
          />
        </aside>
      ) : isError ? (
        <ErrorPage />
      ) : (
        <GroupsList filterData={filterData} />
      )}
    </article>
  )
}

export default AplicationsList
