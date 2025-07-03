import { Avatar, Card, CardHeader } from '@mui/material'
import React from 'react'

export default function ImgMediaCard({ info, sxCard, sxTitle, sxSubHeader, sxAvatar }) {
  return (
    <Card sx={sxCard}>
      <CardHeader
        avatar={
          info.avatar ? (
            <Avatar
              aria-label='recipe'
              sx={{ ...sxAvatar }}
            >
              {info.avatar}
            </Avatar>
          ) : null
        }
        title={info.title}
        subheader={info.value}
        sx={{
          '& .MuiCardHeader-title': { ...sxTitle },
          '& .MuiCardHeader-subheader': {
            textAlign: 'justify',
            ...sxSubHeader,
          },
        }}
      />
    </Card>
  )
}
