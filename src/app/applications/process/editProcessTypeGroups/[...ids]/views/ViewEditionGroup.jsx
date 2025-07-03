import { Box } from '@mui/material'
import { BackdropLoading, ErrorPage, useProcessTypeByGroup } from '@/lib'
import { GeneralInfo } from '../components'

const ViewEditionGroup = ({ idApplication, idGroup }) => {
  const {
    data: dataGroup,
    isLoading: isLoadingGroup,
    isError: isErrorGroup,
  } = useProcessTypeByGroup({ qry: `/${idGroup}`, enabled: idGroup !== 'new' })

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
            idApplication={idApplication}
            idGroup={idGroup}
            dataGroup={dataGroup?.data?.[0]}
          />
        </Box>
      )}
    </>
  )
}

export default ViewEditionGroup
