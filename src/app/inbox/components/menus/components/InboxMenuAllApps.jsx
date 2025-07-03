import { useState } from 'react'
import ListItemMenu from './ListItemMenu'
import { AllInbox, ExpandLess, Workspaces } from '@mui/icons-material'
import { Box, Collapse, List } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const commonRegistry = [
  'familyServices',
  'sendsAlerts',
  'registryContract',
  'registryForms',
  'registryPayContract',
  'contractualProcessPay',
  'registryPayThird',
  'RegistryIncomingCorrespondence',
  'RegistryOutgoingCorrespondence',
  'RegistryInternalCorrespondence',
  'sendsAlerts',
  'reqPqrs',
]

const InboxMenuAllApps = ({ app, index }) => {
  const navigate = useNavigate()
  const [openApps, setOpenApps] = useState({})
  // Toggle the state for the specific index
  const toggleApps = () => {
    setOpenApps({
      ...openApps,
      [index]: !openApps[index],
    })
  }
  // set the value of the selected option
  const handleItemClick = (option) => {
    const filingForm = option?.filingForm

    if (!filingForm) {
      navigate(`/inbox/registry/${option?.id}`)
      return
    }
    if (commonRegistry.includes(filingForm)) {
      navigate(`/inbox/${filingForm}?idGroup=${option?.id}`)
      return
    }

    navigate(`/inbox/${filingForm}/${option?.id}?`)
  }

  return (
    <Box>
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
                info={option}
                onClick={() => handleItemClick(option)}
                icon={<Workspaces />}
                sx={{ pl: 4 }}
              />
            )
          })}
        </List>
      </Collapse>
    </Box>
  )
}

export default InboxMenuAllApps
