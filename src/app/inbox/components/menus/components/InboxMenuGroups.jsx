import { useStoreActions, useStoreState } from 'easy-peasy'
import ListItemMenu from './ListItemMenu'
import { AllInbox, ExpandLess, Workspaces } from '@mui/icons-material'
import { Collapse, List } from '@mui/material'

const InboxMenuGroups = ({ app, index }) => {
  const setInfoMenu = useStoreActions((actions) => actions.menu.setInfoMenu)
  const setOpenApps = useStoreActions((actions) => actions.menu.setOpenApps)
  const setSelectedOption = useStoreActions((actions) => actions.menu.setSelectedOption)
  const selectedOption = useStoreState((state) => state.menu.selectedOption)
  const clearSearchText = useStoreActions((actions) => actions.searchText.clearSearchText)
  const openApps = useStoreState((state) => state.menu.openApps)
  const dark = useStoreState((state) => state.darkTheme.dark)

  // Toggle the state for the specific index
  const toggleApps = () => {
    setOpenApps({
      ...openApps,
      [index]: !openApps[index],
    })
  }
  // set the value of the selected option
  const handleItemClick = (option) => {
    clearSearchText()
    setSelectedOption(option.id)
    setInfoMenu(option)
  }

  return (
    <>
      <ListItemMenu
        onClick={toggleApps}
        icon={<AllInbox />}
        info={app}
      >
        {openApps[index] ? <ExpandLess /> : <></>}
      </ListItemMenu>
      <Collapse
        in={openApps[index]}
        timeout='auto'
      >
        <List
          component='div'
          disablePadding
        >
          {app?.groups?.map((option, index) => {
            return (
              <ListItemMenu
                key={index}
                sx={{
                  pl: 4,
                  backgroundColor:
                    selectedOption === option.id
                      ? dark === 'dark'
                        ? '#ffffff26'
                        : '#D6E7FE'
                      : 'transparent',
                }}
                info={option}
                onClick={() => handleItemClick(option)}
                icon={<Workspaces />}
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default InboxMenuGroups
