import { Divider, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import GenericMoney from '@/libV4/ui/inputs/GenericMoney'

const CpiTable = ({ cpis, onValueChange, onRemove }) => (
  <main className='flex flex-col rounded-lg shadow bg-white overflow-hidden'>
    <div className='grid grid-cols-12 items-center gap-4 px-4 py-3 bg-gray-50 border-b font-semibold text-gray-700'>
      <span className='col-span-1'>Código</span>
      <span className='col-span-3'>Nombre actividad</span>
      <span className='col-span-2'>Código insumo</span>
      <span className='col-span-3'>Nombre insumo</span>
      <span className='col-span-1'>Id subp.</span>
      <span className='col-span-2 text-right'>Valor</span>
    </div>

    {cpis.length === 0 ? (
      <div className='text-center py-8 text-gray-400'>No hay CPIs agregados.</div>
    ) : (
      <div className='h-[calc(30vh-100px)] overflow-auto'>
        {cpis.map((cpi) => (
          <div key={cpi.id}>
            <div className='grid grid-cols-12 items-center gap-4 px-4 py-2 hover:bg-gray-50 transition'>
              <span className='col-span-1 truncate'>{cpi.codigo_act}</span>
              <span className='col-span-3 truncate'>{cpi.nombre_actividad}</span>
              <span className='col-span-2 truncate text-right'>{cpi.codigo_ins}</span>
              <span className='col-span-3 truncate'>{cpi.nombre_insumo}</span>
              <span className='col-span-1 truncate'>{cpi.id_subprograma}</span>
              <div className='col-span-2 flex items-center justify-end gap-2'>
                <GenericMoney
                  label='Valor'
                  disabled={!cpi.isNew}
                  value={cpi.valor || 0}
                  onChange={(e) => onValueChange(cpi.codigo_act, cpi.codigo_ins, e.target.value)}
                />
                <IconButton
                  aria-label='Eliminar'
                  onClick={() => onRemove(cpi)}
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

export default CpiTable
