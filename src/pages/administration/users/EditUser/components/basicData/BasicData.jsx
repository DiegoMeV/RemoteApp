import { Card, CardContent, Typography } from '@mui/material'
import FormBasicData from './FormBasicData'

const BasicData = ({ inputs, userInfo, isNew, title, redirect = true }) => {
  return (
    <div className='w-full flex justify-center'>
      <Card
        raised
        className='w-[70%] min-w-96'
      >
        <CardContent className='flex flex-col gap-4'>
          <Typography
            variant='h5'
            align='center'
          >
            {title ?? ''}
          </Typography>
          <FormBasicData
            inputs={inputs}
            userInfo={userInfo}
            isNew={isNew}
            redirect={redirect}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default BasicData
