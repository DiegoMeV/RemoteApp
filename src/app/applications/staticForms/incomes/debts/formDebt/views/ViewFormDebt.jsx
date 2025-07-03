import { BackdropLoading, BasicTitle } from '@/libV4'
import { useState } from 'react'
import { DetailSection, MasterSection } from '../components'
import { useDebtTabs } from '../hooks'

const ViewFormDebt = ({ form, dataForm, isPendingQuery }) => {
  const [valueTab, setValueTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setValueTab(newValue)
  }

  const { detailTabs } = useDebtTabs({ dataForm })
  return (
    <>
      <BasicTitle
        title={'Deuda vehiculos'}
        backpath='/applications/staticForms/incomes/debts'
      />
      <div className='backgroundGray1 p-5 space-y-4'>
        <BackdropLoading loading={isPendingQuery} />
        <MasterSection form={form} />
        <DetailSection
          valueTab={valueTab}
          handleChangeTab={handleChangeTab}
          detailTabs={detailTabs}
        />
      </div>
    </>
  )
}

export default ViewFormDebt
