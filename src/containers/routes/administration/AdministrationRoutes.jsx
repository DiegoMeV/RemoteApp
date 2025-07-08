import AdminLayout from '@/app/administration/AdminLayout'
import Retenciones from '@/app/administration/documentRetencionTable/page'
import Administration from '@/app/administration/page'
import Templates from '@/app/administration/templates/Templates'
import Users from '@/app/administration/users/page'
import { ViewHierarchy } from '@/lib'
import {
  AssignRolToJobtitle,
  AssingPrivilegesToRole,
  EditProcessTypeGroups,
  EditTypeProcess,
  EditUser,
  GroupProcess,
  Jobtitles,
  ProcessApplications,
  ProcessTypeByGroup,
  Roles,
} from '@/pages'
import { Route, Routes } from 'react-router-dom'

const AdministrationRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={<AdminLayout />}
      >
        <Route
          path='/'
          element={<Administration />}
        />
        <Route
          path='hierarchy'
          element={<ViewHierarchy />}
        />
        <Route
          path='users'
          element={<Users />}
        />
        <Route
          path='users/:idUser'
          element={<EditUser />}
        />
        <Route
          path='jobtitles'
          element={<Jobtitles />}
        />
        <Route
          path='jobtitles/:idJobtitle'
          element={<AssignRolToJobtitle />}
        />
        <Route
          path='roles'
          element={<Roles />}
        />
        <Route
          path='roles/:idRole'
          element={<AssingPrivilegesToRole />}
        />
        <Route
          path='groupProcess'
          element={<GroupProcess />}
        />
        <Route
          path='groupProcess/:idGroup'
          element={<ProcessTypeByGroup />}
        />
        <Route
          path='groupProcess/applications'
          element={<ProcessApplications />}
        />
        <Route
          path='editProcessTypeGroups/:idApplication/:idGroup'
          element={<EditProcessTypeGroups />}
        />
        <Route
          path='editTypeProcess/:idGroup/:idProcessType'
          element={<EditTypeProcess />}
        />
        <Route
          path='templates'
          element={<Templates />}
        />
        <Route
          path='documentRetencionTable'
          element={<Retenciones />}
        />
      </Route>
    </Routes>
  )
}

export default AdministrationRoutes
