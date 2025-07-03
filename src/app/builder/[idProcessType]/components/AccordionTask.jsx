import { Accordion, AccordionSummary } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { AccordionDetailsTask, AccordionNameTask } from '.'
import { sxAccordionStyles } from '../styles'
import { useAcordionsTaks } from '../hooks'
import { useEffect, useState } from 'react'
import { BackdropLoading, CustomModal, ValueListGlobal, useActionsInfo } from '@/lib'
import { ActivityParams } from './activityParams'

const AccordionTask = ({ task, handleDeleteTask, idApplication, roleTable, refetchActivities }) => {
  const [expandAccordion, setExpandAccordion] = useState(false)

  const [actions, setActions] = useState([])
  const {
    data: dataAction,
    isFetching: loadingAction,
    refetch: refetchActions,
  } = useActionsInfo({
    idTask: task?.id,
    expandedEnabled: expandAccordion,
  })

  const { roles, isLoading, searchRole, setCursor, pagination, isError } = roleTable
  const [stateVariables, stateFuntions] = useAcordionsTaks({
    task,
    refetchActivities,
    setActions,
    actions,
  })

  const {
    stateDataTask,
    anchorEl,
    openMenu,
    typesMenu,
    loadingCreate,
    formValues,
    ActivityParamsStates,
    actionsActivityParams,
    handleSetRole,
    open,
  } = stateVariables
  const {
    handleChange,
    setAnchorEl,
    setFormValues,
    handleToggle,
    handleSaveModalInfo,
    handleSaveTask,
  } = stateFuntions

  useEffect(() => {
    if (!dataAction?.success && expandAccordion) return
    setActions(dataAction?.data ?? [])
  }, [dataAction, expandAccordion])

  const selectRol = (row) => {
    if (!row) {
      handleChange('', 'roleName')
      handleSetRole()
      searchRole.clearSearch()
      return
    }
    handleChange(row?.name, 'roleName')
    handleSetRole(row)
  }

  const handleSearchRole = (value) => {
    searchRole.handleSearchText(value)
    setCursor()
  }

  return (
    <>
      <BackdropLoading loading={loadingCreate || loadingAction} />
      {ActivityParamsStates.show && (
        <CustomModal
          open={ActivityParamsStates.show}
          handleClose={ActivityParamsStates.handleShow}
          size='lg'
          modalType='form'
          title='Parametrización de Actividad'
          onSubmit={handleSaveModalInfo}
          actions={actionsActivityParams}
          minHeight='200px'
        >
          <ActivityParams
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </CustomModal>
      )}
      {open && (
        <ValueListGlobal
          title='Roles'
          searchOptions={{
            searchText: searchRole.searchText,
            handleSearchText: handleSearchRole,
            clearSearch: () => searchRole.clearSearch(),
          }}
          openOptions={{
            show: open,
            handleShow: handleToggle,
          }}
          rows={roles?.data || []}
          loading={isLoading}
          columns={[
            { field: 'name', headerName: 'Nombre', minWidth: 200 },
            { field: 'description', headerName: 'Descripción', minWidth: 200 },
          ]}
          selectedOption={(params) => {
            selectRol(params?.row)
          }}
          pagination={pagination}
        />
      )}
      <Accordion
        expanded={expandAccordion}
        onChange={() => {
          setExpandAccordion((prevState) => !prevState)
        }}
        sx={{
          ...sxAccordionStyles.accordionContainerHover,
          backgroundColor: 'backgroundGrey1',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <AccordionNameTask
            task={task}
            stateDataTask={stateDataTask}
            handleChange={handleChange}
            handleSaveTask={handleSaveTask}
          />
        </AccordionSummary>
        <AccordionDetailsTask
          task={task}
          actions={actions}
          setActions={setActions}
          refetchActions={refetchActions}
          stateDataTask={stateDataTask}
          handleChange={handleChange}
          handleDeleteTask={handleDeleteTask}
          handleToggle={handleToggle}
          ActivityParamsStates={ActivityParamsStates}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          openMenu={openMenu}
          typesMenu={typesMenu}
          idApplication={idApplication}
          optionsRoles={{
            roles: roles?.data,
            handleSearchRole,
            isLoading,
            isError,
            selectRol,
          }}
        />
      </Accordion>
    </>
  )
}
export default AccordionTask
