// import { Button } from '@mui/material'
import '../styles/styles.css'
import { useRootStore } from '../../../store'

const AccessCardData = () => {
  const { userData } = useRootStore()
  return (
    <>
      <h1 className='card_title'>
        No cuenta con los permisos necesarios para esta vista {userData?.firstName}
        {userData?.lastName || ''}
      </h1>
      <p className='card_secondary_title'>
        Por favor contacte a su administrador para solicitar los permisos necesarios
      </p>
      {/*
       TODO: Implement the button to request permission
       <div className='flex justify-center'>
        <Button
          variant='contained'
          color='primary'
        >
          Solicitar Permiso
        </Button>
      </div> */}
    </>
  )
}

export default AccessCardData
