import { memo } from 'react'
import { useStoreState } from 'easy-peasy'
import { WelcomeCard, backgroundInboxWelcomeCard } from '@/lib'
import TableLogic from './TableLogic'
import { InboxMenuOptions, MobileInboxMenuOptions } from '../components'
import { Sidebar } from '@/libV4'

const ViewInbox = () => {
  const selectedOption = useStoreState((state) => state.menu.selectedOption)
  const cardStyles = backgroundInboxWelcomeCard()

  return (
    <div className='xs:block md:flex'>
      {/* Sidebar - Desktop */}
      <Sidebar className='xs:hidden md:block'>
        <InboxMenuOptions />
      </Sidebar>

      {/* Mobile Inbox Menu - Mobile */}
      <div className='xs:pl-5 md:hidden pt-4'>
        <MobileInboxMenuOptions />
      </div>

      {/* Main Content */}
      <section className='w-full h-[calc(100vh-65px)] xs:px-5 md:px-10 xs:py-0 md:py-8'>
        {selectedOption ? (
          <TableLogic />
        ) : (
          <WelcomeCard
            text='Seleccione un grupo de aplicación'
            showTutorialButton={false}
            hasCompanyImg={true}
            propsStyles={cardStyles}
          />
        )}
      </section>
    </div>
  )
}

export default memo(ViewInbox)
