import { BackdropLoading, BasicTitle, DataGridCustom, ErrorPage } from '@/libV4'
import { Modals } from '../components'

const ViewAsgToJob = ({
  idJobtitle,
  JobtitleInfo,
  error,
  columns,
  deletingRol,
  modalPrivilegeProps,
  modalToAddRol,
  handleAddRol,
  addRol,
}) => {
  const { rolInfo, modalPrivileges } = modalPrivilegeProps

  return error ? (
    <ErrorPage />
  ) : (
    <>
      <BasicTitle
        title={`Asignar roles a cargo ${JobtitleInfo?.name ? `- ${JobtitleInfo?.name}` : ''}`}
        backpath='/administration/jobtitles'
      />
      <BackdropLoading loading={deletingRol} />
      <div className='backgroundGray1'>
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/jobTitles/${JobtitleInfo?.id}/roles`,
          }}
          tableProps={{
            columns,
            divClassName: 'col-span-12 h-[calc(100vh-270px)]',
          }}
          toolbarProps={{
            buttonProps: {
              variant: 'contained',
              onClick: () => handleAddRol(),
            },
          }}
        />
      </div>
      <Modals
        modalToAddRol={modalToAddRol}
        modalPrivileges={modalPrivileges}
        JobtitleInfo={JobtitleInfo}
        rolInfo={rolInfo}
        addRol={addRol}
        idJobtitle={idJobtitle}
      />
    </>
  )
}

export default ViewAsgToJob
