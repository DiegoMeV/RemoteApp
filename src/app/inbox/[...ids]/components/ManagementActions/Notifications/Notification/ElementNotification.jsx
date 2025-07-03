import { BackdropLoading, GenericForm, MagicString, useMutationDynamicBaseUrl } from '@/lib'
import { Box, Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useProcessModifyItem } from '../../hooks'
import toast from 'react-hot-toast'
import { FileButtons, FileShowed } from './components'
import { inputsNotifications } from './funcs'
import { useStoreState } from 'easy-peasy'

const ElementNotification = ({
  elementData,
  ids,
  idActivityAction,
  refetchElementActions,
  itemInfo,
  type,
}) => {
  const form = useForm({ defaultValues: itemInfo.messageData })
  const companyData = useStoreState((state) => state.company.companyData)
  const [idProcess, idActivity] = ids || []
  const [arrayOfFiles, setArrayOfFiles] = useState([])

  useEffect(() => {
    if (itemInfo?.messageData?.documents?.length > 0) {
      setArrayOfFiles(itemInfo?.messageData?.documents ?? [])
    }
  }, [form, itemInfo?.messageData, itemInfo?.messageData?.documents])

  // TODO : const updateNewNotification = () => {
  //   setAddNewNotification(false)
  //   refetchManagement()
  // }

  const { mutateAsync: sendEmail, isPending: loadingEmail } = useMutationDynamicBaseUrl({
    baseKey: 'urlComunnications',
    url: '/communications/sendEmail',
    isCompanyRequest: false,
    onSuccess: () => {
      toast.success('Mensaje enviado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const companyImg = import.meta.env.VITE_COMPANY_IMAGE

  const onSuccessModifyItem = (response) => {
    if (type === 'SEND') {
      const messageInfo = response?.data?.messageData
      const filesToFind = response?.data?.messageData?.documents?.map((file) => file.id) || []
      const bodyToSendEmail = {
        idCompany: companyData?.companyId,
        filesToFind,
        to: messageInfo?.to,
        subject: messageInfo?.subject,
        messageBody: messageInfo?.message,
        logoUrl: companyImg,
        from: messageInfo?.defaultEmailSender,
      }
      sendEmail({ body: bodyToSendEmail })
      return
    }
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions,
    onSuccessModifyItem
  )

  const addFile = (newItem) => {
    setArrayOfFiles([...arrayOfFiles, newItem])
  }

  const deleteFile = (id) => {
    const newArray = arrayOfFiles.filter((file) => file.id !== id)
    setArrayOfFiles(newArray)
  }

  const onSubmit = async (data) => {
    const qry = itemInfo?.isNew ? '' : `/${itemInfo?.id}`
    const methodBody = itemInfo?.isNew ? 'post' : 'put'

    const body = {
      idTaskActionItem: elementData?.[0]?.id,
      messageData: {
        channel: data?.channel,
        to: data?.to,
        subject: data?.subject,
        message: data?.message,
        documents: arrayOfFiles,
        defaultEmailSender:
          itemInfo?.messageData?.defaultEmailSender &&
          itemInfo?.messageData?.defaultEmailSender?.trim() !== ''
            ? itemInfo?.messageData?.defaultEmailSender
            : null,
      },
    }
    modifyItemInformation({ qry, methodBody, body })
  }

  const inputs = inputsNotifications(form.watch)
  const labelButton = type === 'SEND' ? 'Enviar notificación' : 'Guardar notificación'

  return (
    <Box
      width='100%'
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={loadingItemCreation || loadingEmail} />
      <Grid
        container
        spacing={2}
        p={2}
      >
        <GenericForm
          inputs={inputs}
          control={form.control}
        />
        <FileButtons
          addFile={addFile}
          idActivity={idActivity}
          idProcess={idProcess}
          arrayOfFiles={arrayOfFiles}
        />
      </Grid>
      <Grid
        container
        spacing={2}
        p={2}
      >
        {arrayOfFiles.map((file, index) => (
          <FileShowed
            key={index}
            info={file}
            deleteFile={deleteFile}
          />
        ))}
        {/* {arrayOfFiles && <FileShowed info={arrayOfFiles} />} */}
        <Grid
          item
          xs={12}
        >
          <Button
            variant='contained'
            type='submit'
          >
            {labelButton}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ElementNotification
