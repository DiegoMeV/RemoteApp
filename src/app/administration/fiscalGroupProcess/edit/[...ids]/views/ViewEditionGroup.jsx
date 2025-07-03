import { Box } from '@mui/material'
import { BackdropLoading, baseUrls, ErrorPage, useProcessTypeByGroup } from '@/lib'
import { GeneralInfo } from '../components'

const ViewEditionGroup = ({ idGroup }) => {
  const {
    data: dataGroup,
    isLoading: isLoadingGroup,
    isError: isErrorGroup,
    refetch,
  } = useProcessTypeByGroup({
    qry: `${idGroup}`,
    enabled: idGroup !== 'new',
    baseUrl: baseUrls.urlFiscalizacion,
  })
  return (
    <>
      {isLoadingGroup ? (
        <BackdropLoading loading={isLoadingGroup} />
      ) : isErrorGroup ? (
        <ErrorPage />
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          rowGap={5}
          paddingTop={2}
        >
          <GeneralInfo
            idGroup={idGroup}
            dataGroup={dataGroup?.data?.[0]}
            refetch={refetch}
          />
        </Box>
      )}
    </>
  )
}

export default ViewEditionGroup
