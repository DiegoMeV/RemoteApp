import { Grid, Skeleton } from '@mui/material'
import {
  ChartContainer,
  ChartDynamic,
  baseUrls,
  optionsDonuts,
  removeUndefinedAndNullValues,
  useGetAnalyticsMutation,
} from '@/lib'
import { FormFilters, TableRequestManagement } from '.'
import { useGetAnalytics } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { inboxQryBuilder } from '@/app/inbox/hooks'

const ViewRequestManagement = () => {
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const qry = inboxQryBuilder(skip, pageSize)
  const [rowsFiltered, setRowsFiltered] = useState(null)
  const [queryParams, setQueryParams] = useState('')
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: filteringData,
    isPending: loadingFilter,
    data: info,
  } = useGetAnalyticsMutation({
    onSuccess: (data) => {
      setRowsFiltered(data?.data ?? [])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al filtrar con esos datos')
    },
  })
  useEffect(() => {
    filteringData({
      type: `processes-info/?wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}${qry}`,
    })
  }, [filteringData, qry])
  const { data: infoDonut, isLoading } = useGetAnalytics({
    type: `cgr/processes-by-status?wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
  })
  const labels = infoDonut?.data?.map((datas) => datas.label) ?? []
  const labelsFiltered = removeUndefinedAndNullValues(labels)

  const optionsDonut = optionsDonuts(dark, labelsFiltered, '')
  const seriesDonut = infoDonut?.data.map(({ count = 0 }) => count)

  return (
    <Grid
      container
      spacing={5}
    >
      <Grid
        item
        xs={12}
        md={5}
      >
        <ChartContainer title='Solicitudes procesadas'>
          {isLoading ? (
            <Skeleton
              variant='rectangular'
              height={450}
            />
          ) : (
            <ChartDynamic
              options={optionsDonut}
              series={seriesDonut}
              type='donut'
              height={450}
              justifyContent='center'
            />
          )}
        </ChartContainer>
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
      >
        <FormFilters
          filteringData={filteringData}
          setQueryParams={setQueryParams}
          qry={qry}
        />
      </Grid>
      <TableRequestManagement
        loading={loadingFilter}
        rowsFiltered={rowsFiltered}
        setSkip={setSkip}
        pageSize={pageSize}
        setPageSize={setPageSize}
        info={info}
      />
    </Grid>
  )
}

export default ViewRequestManagement
