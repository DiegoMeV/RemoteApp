import { Box, Grid } from '@mui/material'
import { RenderGroup, RenderOption } from '../../AutocompleteOfficial'
import { BasicTitle } from '@/libV4'

const CardPrevActors = ({ elementAction }) => {
  return (
    <Grid
      item
      xs={12}
    >
      <Box
        sx={{
          width: '100%',
          boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.4)',
          borderRadius: 2,
        }}
      >
        <BasicTitle
          title='Actores registrados previamente'
          className='p-1'
          titleProps={{
            variant: 'h6',
          }}
        />
        <RenderGroup />
        {elementAction?.prevActorsAssigned?.map((actor) => {
          const userInfo = actor?.assignedUserData
          return (
            <RenderOption
              key={actor?.id}
              props={{
                pl: 2,
                minHeight: '40px',
              }}
              option={{
                id: actor?.id,
                hierarchy: `${userInfo?.firstName} ${userInfo?.lastName || ''}`,
                jobTitle: userInfo?.jobTitles?.[0]?.name,
                depencyName: userInfo?.jobTitles?.[0]?.depencyName,
              }}
            />
          )
        })}
      </Box>
    </Grid>
  )
}

export default CardPrevActors
