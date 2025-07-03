import { CardHeader } from '@/lib'
import { Grid } from '@mui/material'

const CardAccordion = ({ cards }) => {
  return (
    <Grid
      container
      spacing={3}
    >
      {cards?.map((card, index) => {
        const gridConfig = card.gridConfig ?? { xs: 12, md: 6, xl: 4 }
        return (
          <Grid
            item
            key={index}
            {...gridConfig}
          >
            <CardHeader
              info={card}
              sxCard={{
                m: 'auto',
                boxShadow: 3,
                background: '#dedede',
                color: 'black',
              }}
              sxTitle={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textAlign: card.display ?? null,
              }}
              sxAvatar={{
                bgcolor: 'primary.main',
              }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CardAccordion
