import { Add, Air, Edit, Layers } from '@mui/icons-material'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { boxMap, cardBox, containerCards, containerGroups, titleBox } from '../styles'
import ListMenu from './ListMenu'
import { ClassicIconButton } from '@/lib'
import { useNavigate } from 'react-router-dom'

const BasicProcess = ({ fiscalGroups }) => {
  const navigate = useNavigate()
  return (
    <Box sx={containerCards}>
      <Grid
        container
        spacing={3}
        sx={containerGroups}
      >
        <Grid
          item
          xs={12}
          lg={6}
          xl={4}
          sx={boxMap}
        >
          <Box sx={cardBox}>
            <Box sx={titleBox}>
              <Typography
                variant='h5'
                color={'primary'}
              >
                Fiscalización
              </Typography>
              <ClassicIconButton
                title='Agregar grupo'
                placement='bottom'
                onClick={() => navigate(`/audit/fiscalGroupProcess/edit/new`)}
                color={'secondary'}
              >
                <Add />
              </ClassicIconButton>
            </Box>
            <Divider />
            <Box
              sx={{
                maxHeight: '425px',
                minHeight: '425px',
                overflowY: 'auto',
                padding: '10px',
              }}
            >
              {fiscalGroups?.map((group, index) => (
                <ListMenu
                  key={index}
                  idGroup={group.id}
                  icon={<Layers />}
                  text={group.name}
                  icon2={<Edit />}
                  icon3={<Air />}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BasicProcess
