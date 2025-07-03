import { Print, Receipt, Replay } from '@mui/icons-material'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'

const ButtonsGenerateReceipts = ({
  isProcessed,
  setSelectedRows,
  handleGenerateInvoice,
  handleShowInvoice,
  refetch,
  apiRef,
}) => {
  const handleProcess = () => {
    if (apiRef.current) {
      const selectedRowsArray = Array.from(apiRef.current.getSelectedRows().values())
      const sortedRows = selectedRowsArray?.sort((a, b) => {
        const dateA = new Date(a?.fechaLimite)
        const dateB = new Date(b?.fechaLimite)
        return dateA - dateB
      })
      if (sortedRows?.length <= 0) {
        toast.error('Debe seleccionar al menos un elemento')
        return
      }
      setSelectedRows(sortedRows)
      handleGenerateInvoice(sortedRows)
    }
  }

  const handleRegenerate = () => {
    refetch()
    setSelectedRows([])
    toast.success('Regenerando...')
  }

  return (
    <aside className='w-full flex gap-4 justify-end items-end'>
      <Button
        variant='contained'
        color='primary'
        endIcon={<Replay />}
        disabled={!isProcessed}
        onClick={handleRegenerate}
      >
        Regenerar
      </Button>

      <Button
        variant='contained'
        color='primary'
        endIcon={<Receipt />}
        disabled={isProcessed}
        onClick={handleProcess}
      >
        Procesar
      </Button>
      <Button
        variant='contained'
        color='primary'
        endIcon={<Print />}
        disabled={!isProcessed}
        onClick={handleShowInvoice}
      >
        Imprimir
      </Button>
    </aside>
  )
}

export default ButtonsGenerateReceipts
