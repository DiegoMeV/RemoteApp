import { AddCompany, TabsEditCompany } from '@/app/companies/components'
import { BasicTitle, CustomTabPanel, PageNotFound } from '@/lib'
import { Box } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { ParamsTable } from '../components'

const ViewEditionCompany = ({ idCompany }) => {
  const userData = useStoreState((state) => state.user.userData)
  const isSuperSaiyayin = userData?.superSaiyayin

  const [valueTab, setValueTab] = useState(0)
  const isNew = idCompany === 'new'

  const handleChange = (_, newValue) => {
    setValueTab(newValue)
  }

  return isSuperSaiyayin ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        pt: '20px',
      }}
    >
      <Box
        sx={{
          maxWidth: '1440px',
          width: '100%',
          backgroundColor: 'backgroundGrey1',
        }}
      >
        <BasicTitle
          title={isNew ? 'Agregar compañia' : 'Edición de compañia'}
          backpath='/companies'
        />
        <TabsEditCompany
          valueTab={valueTab}
          handleChange={handleChange}
          isNew={isNew}
        />
        <CustomTabPanel
          value={valueTab}
          index={0}
        >
          <AddCompany selectedCompany={idCompany} />
        </CustomTabPanel>

        {!isNew && (
          <CustomTabPanel
            value={valueTab}
            index={1}
          >
            <ParamsTable idCompany={idCompany} />
          </CustomTabPanel>
        )}
      </Box>
    </Box>
  ) : (
    <PageNotFound />
  )
}

export default ViewEditionCompany
