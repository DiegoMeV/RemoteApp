import { useEffect, useState } from 'react'
import { DocumentContainer, ElementContainer } from '../..'
import ElementNotification from './ElementNotification'
import { getDefaultValuesToNotification } from './funcs'

const Notification = ({
  action,
  ids,
  idActivityAction,
  refetchManagement,
  elementData,
  refetchElementActions,
  type,
}) => {
  const [itemsNotification, setItemsNotification] = useState([])

  useEffect(() => {
    const defaultValue = getDefaultValuesToNotification(elementData, type)
    setItemsNotification(defaultValue)
  }, [elementData, type])

  // TODO : const newNotificationDefaultValue =
  //   elementData?.[0]?.allActivityActionItems?.length > 0
  //     ? false
  //     : elementData?.[0]?.actionItemSpecs.channel
  //     ? true
  //     : false
  // const [addNewNotification, setAddNewNotification] = useState(newNotificationDefaultValue)

  // TODO : const addNotification = () => {
  //   setItemsNotification([{ id: crypto.randomUUID(), isNew: true }, ...itemsNotification])
  //   setAddNewNotification(true)
  // }

  return (
    <DocumentContainer>
      {/* TODO : <Button
        onClick={addNotification}
        disabled={addNewNotification}
        variant='contained'
        sx={{
          maxWidth: '200px',
        }}
      >
        Agregar notificación
      </Button> */}
      {itemsNotification?.map((item) => (
        <ElementContainer key={item.id}>
          <ElementNotification
            action={action}
            elementData={elementData}
            ids={ids}
            idActivityAction={idActivityAction}
            refetchElementActions={refetchElementActions}
            refetchManagement={refetchManagement}
            itemInfo={item}
            type={type}
            // setAddNewNotification={setAddNewNotification}
          />
        </ElementContainer>
      ))}
    </DocumentContainer>
  )
}

export default Notification
