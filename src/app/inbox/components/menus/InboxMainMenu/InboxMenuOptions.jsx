import { Divider } from '@mui/material'
import AdvancedSearchButton from '../components/AdvancedSearchButton'
import { PendingActivities, RegistryOptions } from '../components'

const InboxMenuOptions = () => {
  return (
    <aside className='flex flex-col w-[280px] h-full'>
      <div className='px-7 py-2'>
        <RegistryOptions />
      </div>
      <Divider variant='middle' />
      <nav className='flex-grow overflow-auto'>
        <div className='flex justify-start h-[50px] bg-transparent px-4 py-2'>Aplicaciones</div>
        <PendingActivities />
      </nav>
      <Divider variant='middle' />
      <div className='px-7 py-2'>
        <AdvancedSearchButton />
      </div>
    </aside>
  )
}

export default InboxMenuOptions
