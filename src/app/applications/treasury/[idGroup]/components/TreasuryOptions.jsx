import { ClassicIconButton } from '@/lib'
import { Box } from '@mui/material'
import { TreasuryOptionMenu } from '.'
import { PictureAsPdf, Undo } from '@mui/icons-material'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const TreasuryOptions = ({ setIdProcess, setInfoOrder, openModals, item }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const menuItems = [
    {
      onClick: () => {
        setIdProcess(item?.idProcess)
        openModals?.handleShowBasicData?.()
      },
      text: 'Datos del proceso',
    },
    {
      onClick: () => {
        setIdProcess(item?.idProcess)
        openModals?.handleShowHistorical?.()
      },
      text: 'Histórico',
    },
    {
      onClick: () => {
        setIdProcess(item?.idProcess)
        openModals?.handleCurrentDocsStates?.()
      },
      text: 'Documentos vigentes',
    },
  ]
  const handlePreview = () => {
    item?.idDocument
      ? setPreviewer({
          open: true,
          idDocument: item?.idDocument,
          idProcess: item?.idProcess,
          loadingPreviewer: true,
        })
      : toast.error('La orden de pago no tiene id de documento')
  }

  const onClickRejectPaymentOrder = () => {
    setIdProcess(item?.idProcess)
    setInfoOrder(item)
    openModals?.handleShowPaymentOrder?.()
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <Box>
        <ClassicIconButton
          onClick={handlePreview}
          title='Visualizar'
        >
          <PictureAsPdf />
        </ClassicIconButton>
        <ClassicIconButton
          onClick={onClickRejectPaymentOrder}
          title='Devolución'
        >
          <Undo />
        </ClassicIconButton>
      </Box>
      <TreasuryOptionMenu treasuryOptions={menuItems} />
    </Box>
  )
}

export default TreasuryOptions
