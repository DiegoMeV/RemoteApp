import { useState } from 'react'
import { TabHeader } from '../components'
import { AccessControl, BasicTitle, CustomTabPanel, LoadingError, useGetUser } from '@/libV4'
import { tabs } from '../../funcs'

const ViewEditUser = ({ idUser, isNew }) => {
  const {
    data: userInfo,
    isLoading: loadingUserInfo,
    isError: errorLoadingUserInfo,
  } = useGetUser({ qry: `/${idUser}`, enabled: idUser && idUser !== 'new' })

  const name = `${userInfo?.data?.firstName ?? ''} ${userInfo?.data?.lastName ?? ''}`

  const [valueTab, setValueTab] = useState(0)
  const handleChange = (_, newValue) => {
    setValueTab(newValue)
  }

  return (
    <LoadingError
      loading={loadingUserInfo}
      error={errorLoadingUserInfo}
    >
      <div className='flex flex-col gap-4'>
        <BasicTitle
          title={isNew ? 'Creación de usuario' : `Edición de usuario ${name ? `- ${name}` : ''}`}
          backpath='/administration/users'
        />
        <div className='w-full'>
          <div className='border-b border-gray-300'>
            <TabHeader
              valueTab={valueTab}
              handleChange={handleChange}
              isNew={isNew}
            />
          </div>
          {tabs?.map((tab, index) => {
            const Component = tab?.component
            return (
              <AccessControl
                key={index}
                privilege={tab?.privilege}
              >
                <CustomTabPanel
                  className='backgroundGray1'
                  value={valueTab}
                  index={index}
                >
                  <Component
                    userInfo={userInfo?.data}
                    isNew={isNew}
                    idUser={idUser}
                  />
                </CustomTabPanel>
              </AccessControl>
            )
          })}
        </div>
      </div>
    </LoadingError>
  )
}

export default ViewEditUser
