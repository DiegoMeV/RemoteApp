import { Divider, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import GenericMoney from '@/libV4/ui/inputs/GenericMoney'

const PacTable = ({ pacs, onValueChange, onMesChange, onRemove }) => {
  const duplicados = pacs.reduce((acc, pac) => {
    if (!pac.mes) return acc
    acc[pac.mes] = acc[pac.mes] || []
    acc[pac.mes].push(pac.id)
    return acc
  }, {})

  return (
    <main className='flex flex-col rounded-lg shadow bg-white overflow-hidden'>
      <div className='grid grid-cols-12 items-center px-4 py-3 bg-gray-50 border-b font-semibold text-gray-700'>
        <span className='col-span-4'>Mes</span>
        <span className='col-span-8'>Valor</span>
      </div>

      {pacs.length === 0 ? (
        <div className='text-center py-8 text-gray-400'>No hay Pacs agregados.</div>
      ) : (
        <div className='h-[calc(30vh-100px)] overflow-auto'>
          {pacs.map((pac) => {
            const mes = pac.mes
            const showMesInvalido =
              mes !== undefined && mes !== null && mes !== '' && (mes < 1 || mes > 12)

            const idsConMismoMes = duplicados[mes] || []
            const esDuplicado =
              idsConMismoMes.length > 1 && idsConMismoMes[idsConMismoMes.length - 1] === pac.id

            return (
              <div key={pac.id}>
                <div className='grid grid-cols-12 items-center px-4 py-2 hover:bg-gray-50 transition'>
                  <span className='col-span-4'>
                    <TextField
                      size='small'
                      label='Mes'
                      type='number'
                      value={mes || ''}
                      error={showMesInvalido || esDuplicado}
                      helperText={
                        showMesInvalido
                          ? 'Debe estar entre 1 y 12'
                          : esDuplicado
                          ? 'Mes ya ingresado'
                          : ''
                      }
                      onChange={(e) => onMesChange(pac.id, Number(e.target.value))}
                    />
                  </span>
                  <div className='col-span-8 flex items-center justify-end gap-2'>
                    <GenericMoney
                      label='Valor'
                      disabled={!pac.isNew}
                      value={pac.valor || 0}
                      onChange={(e) => onValueChange(pac.id, e.target.value)}
                    />
                    <IconButton
                      aria-label='Eliminar'
                      onClick={() => onRemove(pac)}
                      size='small'
                      color='error'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default PacTable
