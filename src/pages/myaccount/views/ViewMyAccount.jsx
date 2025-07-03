import { Container, Paper, Divider } from '@mui/material'
import { AccountTabs, AccountAvatar, AccountForm } from '../components/'
import { sxPaperView } from '../styles/stylesSx'

const ViewMyAccount = ({
  userData,
  form,
  onSubmit,
  isLoadingEditUser,
  setFile,
  handleTabChange,
  activeTab,
}) => {
  return (
    <Container maxWidth={'lg'}>
      <Paper
        elevation={3}
        sx={sxPaperView}
      >
        <AccountTabs
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <Divider />
        {activeTab === 'perfil' && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='general_form_container gap-2 max-h-[calc(100vh-200px)] overflow-auto p-4'
            autoComplete='off'
          >
            <div className='xs:col-span-12 md:col-span-4 flex justify-center py-3'>
              <div className='flex items-center w-full h-full'>
                <AccountAvatar
                  setFile={setFile}
                  userData={userData}
                />
              </div>
            </div>
            <div className='xs:col-span-12 md:col-span-8 flex justify-center py-3'>
              <AccountForm
                userData={userData}
                form={form}
                isLoadingEditUser={isLoadingEditUser}
              />
            </div>
          </form>
        )}
        {/* TO DO: Futura logica del historial {activeTab === 'historial' && (
          <Box
            maxHeight='calc(100vh - 200px)'
            overflow='auto'
          >
            <ConstructionPage />
          </Box>
          // <List> 
          //   {activityData.map((activity, index) => (
          //     <SearchHistoryItem
          //       key={index}
          //       activity={activity}
          //     />
          //   ))}
          // </List>
        )} */}
      </Paper>
    </Container>
  )
}

export default ViewMyAccount
