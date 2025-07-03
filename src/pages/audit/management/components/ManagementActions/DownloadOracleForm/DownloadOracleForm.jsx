import { Box, Grid } from '@mui/material'
import {
  BackdropLoading,
  buildQueryWithPagination,
  downloadFile,
  useBoolean,
  useGetDocument,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomOption, HeaderOptions } from '../DocumentGeneration/Inputs'
import { columnsLovSigners, signersDataOracle } from './funcs'
import { CardsForms, ModalSigners } from './components'
import { useStoreActions } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'

const DownloadOracleForm = (props) => {
  const queryClient = useQueryClient()
  const { elementData, ids, action } = props
  const [idProcess, idActivity] = ids
  const idDocument = elementData?.[0]?.activityActionItemData?.documentData?.id
  const [itemLabel, setItemLabel] = useState()
  const modalSigner = useBoolean()
  const form = useForm({ defaultValues: { signers: [] } })
  const valueListModal = useBoolean()
  const [pageSize, setPageSize] = useState(100)
  const [cursor, setCursor] = useState()
  const [urlOracleForm, setUrlOracleForm] = useState()
  const searchUser = useSearch()
  const qry = buildQueryWithPagination(pageSize, cursor, searchUser?.searchText)
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const onChangeOptions = (_, newValue) => {
    form.setValue('signers', newValue)
  }

  const { data: documentInfo, isLoading: documentLoading } = useGetDocument({
    qry: `/${elementData?.[0]?.activityActionItemData?.documentData?.id}?procesarFirmante=true&traducirInfoUser=true&aumentarInfo=true`,
  })
  const { mutateAsync: downloadOracleForm, isPending: isPendingOracleForm } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      onSuccess: (e) => {
        queryClient.invalidateQueries([
          `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${action?.id}`,
        ])
        const fileName = `${itemLabel}.jnlp`
        downloadFile(e, fileName, 'application/x-java-jnlp-file')
        toast.success('Formulario descargado correctamente')
        toast.success(
          'Recuerde realizar el proceso completo en la forma para poder visualizar el documento'
        )
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al descargar el formulario')
      },
    })
  const { data: users, isFetching } = useQueryDynamicApi({
    url: `/users${qry}&isActive=true`,
    baseKey: 'urlUsers',
    isCompanyRequest: true,
  })
  useEffect(() => {
    if (documentInfo?.data?.[0]?.especificaciones?.data?.firmantes) {
      const defaultSigners = documentInfo.data[0].especificaciones.data.firmantes.map((signer) => {
        return {
          id: signer.idJoin,
          jobTitles: signer.jobTitles?.[0] ?? {},
          idUser: signer.idUser ?? '',
          email: signer.email ?? '',
          firstName: signer.firstName ?? '',
          lastName: signer.lastName ?? '',
          aliases: signer.aliases ?? '',
        }
      })
      form.setValue('signers', defaultSigners)
    }
  }, [form, documentInfo])
  const onSubmit = (data) => {
    if (data?.signers) {
      const adaptData = data.signers.map((signer) => {
        return {
          idUser: signer.idUser,
          email: signer.email,
          aliases: signer.aliases,
          idJoin: signer.id,
          dependencyId: signer.jobTitles.dependencyId,
        }
      })
      downloadOracleForm({ qry: urlOracleForm, body: { signers: adaptData } })
      return
    }
    downloadOracleForm({ qry: urlOracleForm })
  }

  const userSigners = signersDataOracle(users)
  const columnsLov = columnsLovSigners()

  const signersProps = {
    name: 'signers',
    options: userSigners,
    loading: isFetching,
    setPageSize,
    setCursor,
    search: searchUser,
    onChangeOptions,
    valueListModal,
    form,
    columnsLov,
    textFieldProps: {
      label: 'Firmantes',
    },
    autocompleteProps: {
      groupBy: () => 'All Options',
      renderGroup: (params) => (
        <Box key='header-options'>
          <HeaderOptions params={params} />
        </Box>
      ),
      renderOption: (props, option) => {
        const { key, ...rest } = props
        return (
          <Box
            key={`${option.id}${option?.jobTitle?.id}`}
            {...rest}
          >
            <CustomOption
              key={key}
              option={option}
            />
          </Box>
        )
      },
      getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
      isOptionEqualToValue: (option, value) =>
        `${option?.id}${option?.jobTitle?.id}` === `${value?.id}${value?.jobTitle?.id}`,
    },
  }
  const cardsProps = {
    setItemLabel,
    setUrlOracleForm,
    modalSigner,
    idDocument,
    downloadOracleForm,
    setPreviewer,
  }

  return (
    <Box
      p={2}
      bgcolor={'backgroundWhite1'}
      borderRadius={3}
    >
      <BackdropLoading loading={isPendingOracleForm || documentLoading} />
      <ModalSigners
        onSubmit={onSubmit}
        form={form}
        signersProps={signersProps}
        modalSigner={modalSigner}
      />
      <Grid
        container
        spacing={2}
      >
        {elementData.map((element, index) => (
          <CardsForms
            element={element}
            key={index}
            {...cardsProps}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default DownloadOracleForm
