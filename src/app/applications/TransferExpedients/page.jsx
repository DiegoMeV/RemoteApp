import { NoAccessCard } from '@/lib'
import { columnsUsersTransfer } from './funcs'
import { ViewTransferExpedients } from './view'
import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'
import { useApis } from './hooks'
import { AccessControl } from '@/libV4'

const TransferExpedients = () => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [originUser, setOriginUser] = useState(null)
  const [assignedUser, setAssignedUser] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { transferExpedient, isPendingTransfer } = useApis({ setSelectedRowKeys })

  const { columns } = columnsUsersTransfer()
  const buttonProps = {
    label: 'Trasladar',
    disabled: selectedRowKeys?.length === 0 || assignedUser === null,
    onClick: () => {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Traslado de Procesos',
        maxWidth: 'sm',
        content: `¿Está seguro que desea trasladar ${selectedRowKeys?.length} proceso(s) ?`,
        onConfirm: () => {
          const processIds = Object.values(selectedRowKeys).map((item) => item.id)
          transferExpedient({
            body: {
              idUserFrom: originUser?.id,
              idUserTo: assignedUser?.id,
              idActivityArray: processIds,
            },
          })
        },
      })
    },
  }
  const propsUser = {
    originUser,
    setOriginUser,
    assignedUser,
    setAssignedUser,
  }
  return (
    <AccessControl
      privilege={'procesos.herramientas.transferencia_actividades_pendientes'}
      nodeContent={<NoAccessCard />}
    >
      <ViewTransferExpedients
        columns={columns}
        buttonProps={buttonProps}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        isPendingTransfer={isPendingTransfer}
        {...propsUser}
      />
    </AccessControl>
  )
}

export default TransferExpedients
