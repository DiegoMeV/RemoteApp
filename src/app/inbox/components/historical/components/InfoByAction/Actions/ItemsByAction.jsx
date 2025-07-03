import { toArray } from '@/lib'
import ListForActions from './ListForActions'
import { actionDocument, actionNotification, actionSigedoc, actionUser } from './funcs'

const actionComponents = {
  SAVE_FORM: (props) => {
    return [`${props?.variableName ?? ''} : ${props?.variableValue ?? ''}`]
  },
  GENERATE_DOCUMENT: (props) => {
    return actionDocument(props)
  },
  REVIEW_DOCUMENT: (props) => {
    return actionDocument(props)
  },
  SIGN_DOCUMENT: (props) => {
    return actionDocument(props)
  },
  ASSIGNMENT_TO_USER: (props) => {
    return actionUser(props)
  },
  ADD_PROCESS_ACTOR: (props) => {
    return [
      `Usuario : ${props?.assignedUserData?.firstName ?? ''} ${
        props?.assignedUserData?.lastName ?? ''
      }`,
    ]
  },
  SUBPROCESS: () => {
    return ['Elemento en construcción']
  },
  DOWNLOAD_DOCUMENT: (props) => {
    return actionDocument(props)
  },
  ALERTS_REVIEW: () => {
    return ['Elemento en construcción']
  },
  SEND_NOTIFICATION: (props) => {
    return actionNotification(props)
  },
  CREATE_NOTIFICATION: (props) => {
    return actionNotification(props)
  },
  REVIEW_NOTIFICATION: (props) => {
    return actionNotification(props)
  },
  NUMBERING_DOCUMENT: (props) => {
    return actionDocument(props)
  },
  CREATE_SIGEDOC: (props) => {
    return actionSigedoc(props)
  },
  UPLOAD_DOCUMENT: (props) => {
    return actionDocument(props)
  },
}

const ItemsByAction = ({ actionItems, TaskAction }) => {
  return (
    <>
      {toArray(
        actionItems.map((actionItem, index) => {
          const ArrayData = actionComponents?.[TaskAction?.actionType]
            ? actionComponents?.[TaskAction?.actionType](actionItem)
            : ['Elemento en construcción']

          return (
            <ListForActions
              key={index}
              dataToShow={ArrayData}
            />
          )
        })
      )}
    </>
  )
}

export default ItemsByAction
