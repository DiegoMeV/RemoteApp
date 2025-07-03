import { ConstructionPage, CustomTabHeaders } from '@/lib'
import { setTabDetails } from '../../funcs'
import { CustomTabPanel } from '@/libV4'

const DetailSection = ({ idAgreement = '', valueTab = 0, handleChangeTab = () => {} } = {}) => {
  const detailTabs = setTabDetails({ idAgreement })

  return (
    <section className='backgroundGray1 p-4 rounded-md w-full'>
      <CustomTabHeaders
        value={valueTab}
        handleChange={handleChangeTab}
        options={detailTabs}
        variant='scrollable'
        scrollButtons
        sx={{
          backgroundColor: 'backgroundWhite1',
          width: '100%',
        }}
      />
      {detailTabs?.map((option, index) => {
        return (
          <CustomTabPanel
            key={index}
            value={valueTab}
            index={index}
            className={'backgroundWhite1 min-h-[550px] relative [text-transform:none]'}
          >
            {option.component ?? <ConstructionPage />}
          </CustomTabPanel>
        )
      })}
    </section>
  )
}

export default DetailSection
