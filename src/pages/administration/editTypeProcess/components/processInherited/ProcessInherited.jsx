import TransferActors from './TransferActors'
import TransferProcessData from './TransferProcessData'

const ProcessInherited = ({ control }) => {
  return (
    <div className='flex flex-col gap-4'>
      <TransferProcessData control={control} />
      <TransferActors control={control} />
    </div>
  )
}

export default ProcessInherited
