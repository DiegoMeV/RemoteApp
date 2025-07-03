import { Divider, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import GenericMoney from '@/libV4/ui/inputs/GenericMoney'

const CpcTable = ({ cpcs, onValueChange, onRemove }) => (
  <main className='flex flex-col rounded-lg shadow bg-white overflow-hidden'>
    <div className='grid grid-cols-12 items-center px-4 py-3 bg-gray-50 border-b font-semibold text-gray-700'>
      <span className='col-span-2'>Cpc</span>
      <span className='col-span-2'>Código</span>
      <span className='col-span-5'>Nombre</span>
      <span className='col-span-3 text-right'>Valor</span>
    </div>

    {cpcs.length === 0 ? (
      <div className='text-center py-8 text-gray-400'>No hay CPCs agregados.</div>
    ) : (
      <div className='h-[calc(30vh-100px)] overflow-auto'>
        {cpcs.map((cpc) => (
          <div key={cpc.id}>
            <div className='grid grid-cols-12 items-center px-4 py-2 hover:bg-gray-50 transition'>
              <span className='col-span-2 truncate'>{cpc.id}</span>
              <span className='col-span-2 truncate'>{cpc.codigo}</span>
              <span className='col-span-5 truncate'>{cpc.nombre}</span>
              <div className='col-span-3 flex items-center justify-end gap-2'>
                <GenericMoney
                  label='Valor'
                  disabled={!cpc.isNew}
                  value={cpc.valor || 0}
                  onChange={(e) => onValueChange(cpc.id, e.target.value)}
                />
                <IconButton
                  aria-label='Eliminar'
                  onClick={() => onRemove(cpc)}
                  size='small'
                  color='error'
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    )}
  </main>
)

export default CpcTable
