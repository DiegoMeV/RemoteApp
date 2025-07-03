import { Divider, MenuList, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { MenuItemUserMenu } from '.'

const InfoMenuUser = ({ userData, menuItems }) => {
  const companyData = useStoreState((state) => state.company.companyData)

  return (
    <>
      {(companyData?.Company.urlIcon || companyData?.Company.urlLogo) && (
        <div className='flex items-center flex-col m-4'>
          <img
            src={companyData?.Company.urlIcon || companyData?.Company.urlLogo}
            alt='company logo'
            width={60}
          />
        </div>
      )}

      <Typography
        title='Datos del usuario'
        width='100%'
        p={2}
      >
        {companyData?.Company?.companyName ?? ''}
        <br />
        {(userData?.firstName ?? '') + ' ' + (userData?.lastName ?? '')}
        <br />
        {userData?.email ?? ''}
      </Typography>
      <Divider />
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItemUserMenu
            key={index}
            item={item}
          />
        ))}
      </MenuList>
    </>
  )
}

export default InfoMenuUser
