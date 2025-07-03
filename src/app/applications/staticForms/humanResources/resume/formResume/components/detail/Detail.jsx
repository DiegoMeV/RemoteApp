import { ConstructionPage, CustomTabHeaders } from '@/lib'
import { BasicTitle, CustomTabPanel } from '@/libV4'

const Detail = ({ valueTab = 0, handleChangeTab = () => {}, detailTabs = [] } = {}) => {
  return (
    <>
      <section className='pt-4 rounded-md w-full overflow-x-auto'>
        <BasicTitle title={`Información general / Cristian Camilo Rodríguez`} />
        <CustomTabHeaders
          value={valueTab}
          handleChange={handleChangeTab}
          options={detailTabs}
          variant='scrollable'
          scrollButtons='auto'
          sx={{
            backgroundColor: 'backgroundWhite1',
            width: '100%',
            pt: 2,
          }}
        />
        {detailTabs?.map((option, index) => {
          return (
            <CustomTabPanel
              key={index}
              value={valueTab}
              index={index}
              className={'backgroundWhite1 !p-0 min-h-[550px] relative [text-transform:none]'}
            >
              {option.component ?? <ConstructionPage />}
            </CustomTabPanel>
          )
        })}
      </section>
    </>
  )
}

export default Detail
