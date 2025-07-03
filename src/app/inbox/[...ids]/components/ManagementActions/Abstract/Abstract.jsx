import { DescriptionOutlined } from '@mui/icons-material'
import { DynamicSection, AbstractContainer, SubContainer, InformationSection } from './'
import { CustomAccordion } from '@/lib'
import { Grid } from '@mui/material'
import { GenericTextfield } from '@/libV4'

const Abstract = ({ dataManagement }) => {
  const activityInfo = dataManagement?.activityInfo
  const rejectionComment = activityInfo?.[0]?.activityData?.activityRejection?.observation
  return (
    <CustomAccordion
      title='Resumen'
      icon={<DescriptionOutlined color='primary' />}
      defaultExpanded={true}
    >
      <AbstractContainer>
        <SubContainer lg={8}>
          <InformationSection dataManagement={dataManagement} />
        </SubContainer>
        <SubContainer lg={4}>
          <DynamicSection
            idProcess={dataManagement?.processInfo?.[0]?.id}
            processInfo={dataManagement?.processInfo?.[0]}
            activityInfo={activityInfo}
          />
        </SubContainer>
        {rejectionComment && rejectionComment !== '' && (
          <SubContainer lg={12}>
            <Grid
              item
              xs={12}
            >
              <GenericTextfield
                label='Causa de devolución de la actividad'
                value={rejectionComment}
                error={true}
                fullwidth
                multiline
                minRows={3}
                maxRows={5}
                InputProps={{
                  readOnly: true,
                  sx: {
                    fontStyle: 'italic',
                  },
                }}
              />
            </Grid>
          </SubContainer>
        )}
      </AbstractContainer>
    </CustomAccordion>
  )
}

export default Abstract
