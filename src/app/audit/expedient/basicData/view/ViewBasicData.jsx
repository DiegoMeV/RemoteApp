import { TitlePage } from '@/app/audit/components'
import { Card, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { ContributorData } from '../components'
import { ListingDue } from '../components'
import { BasicData } from '../components'
import { MoreVert } from '@mui/icons-material'

const ViewBasicData = ({ form }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const options = ['Histórico', 'Gestionar', 'Ir al programa origen']

  return (
    <>
      <TitlePage
        title='Expediente de fiscalización - Predial unificado'
        backpath='/audit/notify'
      >
        <IconButton onClick={handleClick}>
          <MoreVert color='primary' />
        </IconButton>
      </TitlePage>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index}>{option}</MenuItem>
        ))}
      </Menu>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 2,
          bgcolor: 'backgroundGrey1',
          minHeight: '80vh',
          mb: '20px',
        }}
      >
        <BasicData form={form} />
        <ContributorData />
        <ListingDue />
      </Card>
    </>
  )
}

export default ViewBasicData
