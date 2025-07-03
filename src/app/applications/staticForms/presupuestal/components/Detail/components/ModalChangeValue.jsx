import { BackdropLoading, CustomModal } from '@/libV4'
import GenericMoney from '@/libV4/ui/inputs/GenericMoney'
import { useState } from 'react'
import { useValidateBudgetMovement } from './hooks'

const ModalChangeValue = ({ editModal, row, setSelectedRubro, nit_compania }) => {
  const [value, setValue] = useState(row?.valor || 0)
  const [error, setError] = useState('')

  const { handleValidateValue, isPendingProcedure } = useValidateBudgetMovement({
    row,
    nit_compania,
  })

  const handleEditValue = async () => {
    try {
      const { UnMovPresupuestalValor } = await handleValidateValue()

      if (value < 0) {
        setError('El valor ingresado no puede ser negativo')
        setValue(row?.valor)
        return
      }

      if (value > UnMovPresupuestalValor) {
        setError('El valor ingresado no puede ser mayor al valor del rubro')
        setValue(row?.valor)
        return
      }

      setSelectedRubro((prev) =>
        prev.map((item) =>
          item.rubro_id === row.rubro_id ? { ...item, valor: value, isNew: true } : item
        )
      )

      editModal?.handleShow()
    } catch (err) {
      console.error('Error al validar el valor presupuestal', err)
      setError('Error al validar el valor presupuestal')
    }
  }

  return (
    <>
      <BackdropLoading
        loading={isPendingProcedure}
        sizeLoading={50}
      />
      <CustomModal
        title='Editar detalles del comporobante'
        open={editModal?.show}
        handleClose={editModal?.handleShow}
        actions={[
          {
            label: 'Guardar',
            onClick: handleEditValue,
          },
        ]}
      >
        <GenericMoney
          label='Valor'
          onChange={(e) => setValue(e.target.value)}
          error={error}
          helperText={error}
          value={value}
        />
      </CustomModal>
    </>
  )
}

export default ModalChangeValue
