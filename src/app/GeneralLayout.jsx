import { ConfirmModal, ModalViewerDocsGlobal, ValueListRequest } from '@/lib'
import { Navbar, ValueList } from '@/libV4'
import { Outlet } from 'react-router-dom'

const GeneralLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ConfirmModal />
      <ValueListRequest />
      <ValueList />
      <ModalViewerDocsGlobal />
    </>
  )
}

export default GeneralLayout
