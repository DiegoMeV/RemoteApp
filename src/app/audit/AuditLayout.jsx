import { NoAccessCard } from '@/lib'
import { Box } from '@mui/material'
import { AuditMenuOptions, MobileAuditMenuOptions } from './components'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { AccessControl, Sidebar } from '@/libV4'

const AuditLayout = () => {
  return (
    <AccessControl
      privilege='fiscaliza.modulo.visualizar'
      nodeContent={<NoAccessCard />}
    >
      <div className='xs:block md:flex'>
        {/* Sidebar - Desktop */}
        <Sidebar className='xs:hidden md:block'>
          <AuditMenuOptions />
        </Sidebar>
        {/* Mobile Inbox Menu - Mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileAuditMenuOptions />
        </Box>
        {/* Main Content */}
        <section className='w-full h-full xs:px-5 md:px-10 xs:py-0 md:py-8'>
          <Outlet />
        </section>
      </div>
    </AccessControl>
  )
}

export default memo(AuditLayout)
