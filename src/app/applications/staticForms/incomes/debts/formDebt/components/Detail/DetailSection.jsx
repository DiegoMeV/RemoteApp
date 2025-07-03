import { ConstructionPage, CustomTabHeaders } from '@/lib'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className='p-1 shadow-lg border'>{children}</div>}
    </div>
  )
}

const DetailSection = ({ valueTab, handleChangeTab, detailTabs }) => {
  return (
    <section
      style={{
        padding: '5px',
      }}
    >
      <>
        <CustomTabHeaders
          value={valueTab}
          handleChange={handleChangeTab}
          options={detailTabs}
          variant='scrollable'
          scrollButtons
          sx={{
            backgroundColor: 'backgroundWhite1',
          }}
        />

        {detailTabs?.map((option, index) => {
          const properties = option?.tabProps ?? {}
          return (
            <CustomTabPanel
              key={index}
              value={valueTab}
              index={index}
              sx={{
                minHeight: '550px',
                backgroundColor: 'backgroundWhite1',
                position: 'relative',
                ...properties,
              }}
            >
              {option.component ?? <ConstructionPage />}
            </CustomTabPanel>
          )
        })}
      </>
    </section>
  )
}

export default DetailSection
