import { BasicTable, BasicTitle, SearchAndAdd, useBoolean } from '@/libV4'
import { useEffect, useState } from 'react'
import { FormEditApplication } from '../components'

const ViewProcessApplications = ({ applications, loadingApplications }) => {
  const [filterData, setFilterData] = useState([])
  const [selectedApp, setSelectedApp] = useState({})
  const [searchApp, setSearchApp] = useState('')

  const modalEditApp = useBoolean({
    confirmModalProps: {
      title: 'Cancelar',
      icon: 'warning',
      content: '¿Está seguro que desea cancelar?',
    },
  })

  useEffect(() => {
    if (applications && searchApp.length > 2) {
      const dataFilterForSearch = applications.filter((application) =>
        application.name.toLowerCase().includes(searchApp.toLowerCase())
      )
      setFilterData(dataFilterForSearch)
    } else {
      setFilterData(applications)
    }
  }, [searchApp, applications])

  const openEditApp = (data) => {
    setSelectedApp(data)
    modalEditApp.handleShow()
  }

  return (
    <>
      <BasicTitle
        title='Aplicaciones de procesos'
        backpath='/administration/groupProcess/'
      />
      <div className='general_form_container p-4 backgroundGray1'>
        <SearchAndAdd
          searchProps={{
            value: searchApp,
            onChange: (e) => setSearchApp(e.target.value),
          }}
          buttonProps={{ onClick: () => openEditApp({}) }}
        />
        <BasicTable
          columns={[
            {
              headerName: 'Nombre',
              field: 'name',
            },
          ]}
          rows={filterData ?? []}
          loading={loadingApplications}
          rowHeight={52}
          containerProps={{
            className: 'h-[calc(100vh-350px)]',
          }}
        />
        <FormEditApplication
          modalEditApp={modalEditApp}
          selectedApp={selectedApp}
          onSuccessApp={() => modalEditApp.handleShow()}
        />
      </div>
    </>
  )
}

export default ViewProcessApplications
