import { BasicCard, BasicTitle } from '@/libV4'
import { Add, Business, Edit } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CardCompaniesOptions = ({ companies }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='grid gap-6 w-full max-w-screen-2xl pb-5'>
        <BasicTitle
          title='Compañías'
          backpath='/dashboard'
          className='justify-between'
        >
          <Button
            variant='contained'
            onClick={() => navigate('edition/new')}
          >
            Agregar compañia
          </Button>
        </BasicTitle>
      </div>
      <div className='grid gap-6 w-full max-w-screen-2xl xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {companies?.data?.map((option, index) => {
          return (
            <BasicCard
              key={index}
              name={option.companyName}
              Icon={
                <>
                  {option?.urlLogo ? (
                    <img
                      src={option?.urlLogo ?? ''}
                      alt='Logo-Empresa'
                      style={{
                        maxWidth: '65px',
                        height: 'auto',
                      }}
                    />
                  ) : (
                    <Business
                      sx={{ fontSize: 65 }}
                      color='primary'
                    />
                  )}
                </>
              }
              details={
                <div className='min-w-[75px]'>
                  <IconButton
                    title='Editar'
                    onClick={() => navigate(`/companies/edition/${option?.id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    title='Agregar aplicaciones'
                    onClick={() => navigate(`${option?.id}`)}
                  >
                    <Add />
                  </IconButton>
                </div>
              }
            />
          )
        })}
      </div>
    </>
  )
}

export default CardCompaniesOptions
