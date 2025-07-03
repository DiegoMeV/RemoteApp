import { BasicTitle } from '@/libV4'
import { Detail, Master } from '../components'
import { setTabDetails } from '../funcs'
import { useState } from 'react'

const ViewFormResume = ({ form, division }) => {
  const detailTabs = setTabDetails()

  const [valueTab, setValueTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setValueTab(newValue)
  }

  return (
    <>
      <BasicTitle
        title='Hoja de vida'
        className='shadow-md shadow-black/20 z-10'
      />
      <div className='p-5 pt-0 backgroundGray1 flex flex-col'>
        <Master
          form={form}
          division={division}
        />
        <Detail
          valueTab={valueTab}
          handleChangeTab={handleChangeTab}
          detailTabs={detailTabs}
        />
      </div>
    </>
  )
}

export default ViewFormResume
