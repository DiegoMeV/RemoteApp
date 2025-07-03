import { BasicTable } from '@/libV4'
import { filesColumns } from '../../../constants'

const Files = () => {
  const columns = filesColumns({})

  const rows = []
  return (
    <div className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        rows={rows}
        columns={columns}
        // loading={deletingRecord || loadingDOrdenData}
      />
    </div>
  )
}

export default Files
