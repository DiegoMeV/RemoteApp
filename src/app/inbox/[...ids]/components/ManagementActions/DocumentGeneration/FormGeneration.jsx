import {
  ErrorPage,
  Loading,
  buildQueryWithPagination,
  useBoolean,
  useEnableAutocompleteRequest,
  useGetDocument,
  useGetSubseriesTRD,
  useGetTemplate,
  usePaginationModelParams,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Box } from '@mui/material'
import {
  fixedFiledToGenerationDocument,
  selectModalAdditionalInputs,
  setInitialVariableValues,
  valueListModalsToGenerationDocument,
} from './funcs'
import { useEffect, useState } from 'react'
import { FixedInputs, InputsSelector } from './components'
import { useStoreState } from 'easy-peasy'

const FormGeneration = ({ elementAction, ids, generationForm, dataManagement }) => {
  const { control, setValue } = generationForm

  const idProcess = ids?.[0] || []
  const userData = useStoreState((state) => state.user.userData)
  const idParentProcess = dataManagement?.processInfo?.[0]?.idParentProcess

  let qryTemplateInfo = `/${elementAction?.templateData?.id}?includeFirmantesDefecto=true&idProceso=${idProcess}&idVersion=${elementAction?.templateData?.idVersion}`

  if (idParentProcess) {
    qryTemplateInfo += `&idParentProcess=${idParentProcess}`
  }

  const {
    data: templateInfo,
    isLoading,
    isError,
  } = useGetTemplate({
    qry: qryTemplateInfo,
  })

  const idDocument = elementAction?.activityActionItemData?.documentData?.id

  const {
    data: initialVariables,
    isFetching: loadingInitialVariables,
    isSuccess: successInitialVar,
  } = useGetDocument({
    qry: `/${idDocument}?procesarFirmante=true&traducirInfoUser=true&aumentarInfo=true`,
    enabled: !!idDocument,
  })

  useEffect(() => {
    if (successInitialVar || templateInfo) {
      setInitialVariableValues(initialVariables, setValue, templateInfo, userData)
    }
  }, [templateInfo, initialVariables, setValue, successInitialVar, userData])

  const generationInputs = templateInfo?.data?.[0]?.infoVersion?.especificaciones?.variables || []
  const trdModal = useBoolean()
  const userModal = useBoolean()

  const searchTrd = useSearch()
  const searchUser = useSearch()

  const [paginationModelTRD, setPaginationModelTRD] = useState({
    page: 0,
    pageSize: 10,
  })
  const enableTRDRequest = useEnableAutocompleteRequest()

  const [cursor, setCursor] = useState()

  const [paginationModelUser, setPaginationModelUser] = useState({
    page: 0,
    pageSize: 10,
  })
  const enableUserRequest = useEnableAutocompleteRequest()
  const [cursorUser, setCursorUser] = useState()

  const qryUsers = buildQueryWithPagination(
    paginationModelUser?.pageSize,
    cursorUser,
    searchUser.searchText
  )

  const handleOpenUserVL = () => {
    userModal.handleShow()
    setPaginationModelUser({ page: 0, pageSize: 50 })
  }

  const handleOpenTRDLV = () => {
    trdModal.handleShow()
    setPaginationModelTRD({ page: 0, pageSize: 50 })
  }

  const {
    data: users,
    isLoading: loadingUsers,
    isFetching: refetchingUsers,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `users/${qryUsers}`,
    enabled: enableUserRequest?.enabledRequest || userModal.show,
  })

  const paginationUsers = usePaginationModelParams(
    users,
    loadingUsers,
    setCursorUser,
    paginationModelUser,
    setPaginationModelUser
  )

  const { data: subSeries, isLoading: loadingSubseries } = useGetSubseriesTRD({
    pageSize: paginationModelTRD.pageSize,
    cursor,
    searchText: searchTrd.searchText,
  })

  const paginationSubseries = usePaginationModelParams(
    subSeries,
    loadingSubseries,
    setCursor,
    paginationModelTRD,
    setPaginationModelTRD,
    'cantidad'
  )

  const additionalInputs = fixedFiledToGenerationDocument({
    handleOpenTRDLV,
    subSeries,
    loadingSubseries,
    handleOpenUserVL,
    users,
    loadingUsers,
    initialVariables: initialVariables?.data?.[0],
    userData,
    searchUser,
    searchTrd,
    enableUserRequestFunction: enableUserRequest?.enabledRequestFunction,
    enableTRDRequestFun: enableTRDRequest?.enabledRequestFunction,
  })

  const modals = valueListModalsToGenerationDocument({
    trdModal,
    searchTrd,
    subSeries,
    loadingSubseries,
    userModal,
    users,
    searchUser,
    loadingUsers,
    refetchingUsers,
    paginationSubseries,
    paginationUsers,
  })

  const modalOptions = selectModalAdditionalInputs(modals)

  return (
    <>
      {isLoading || loadingInitialVariables ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          rowGap={2}
        >
          <InputsSelector
            inputs={generationInputs}
            control={control}
          />
          <FixedInputs
            inputs={additionalInputs}
            control={control}
            setValue={setValue}
            initialVariables={initialVariables}
            modalOptions={modalOptions}
            defaultSigners={
              templateInfo?.data?.[0]?.infoVersion?.especificaciones?.firmantesPorDefecto ?? []
            }
          />
        </Box>
      )}
    </>
  )
}

export default FormGeneration
