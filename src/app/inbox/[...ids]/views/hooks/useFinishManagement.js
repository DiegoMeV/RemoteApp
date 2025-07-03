import { useMutationDynamicBaseUrl, useSubmitProcess } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const useFinishManagementFunction = ({
  activityInfo,
  idProcess,
  idActivity,
  setPendingActivities,
  modalPendingActs,
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId || ''
  const showSuggested = activityInfo?.[0]?.Task?.showSuggested || false
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { mutateAsync: getPendingActs, isPending: loadingPendingActs } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}?inclPendingActs=true`,
    method: 'get',
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    onSuccess: async (response) => {
      setPendingActivities(response?.data?.[0].pendingActivities)
      modalPendingActs.handleShow()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const {
    mutateAsync: finishManagement,
    isPending,
    isSuccess: successFinishManagement,
    isError: errorFinishManagement,
  } = useSubmitProcess({
    qry: `/${idProcess}/activities/${idActivity}`,
    method: 'put',
    onSuccess: async () => {
      await queryClient.invalidateQueries([`/${companyId}/inbox`])
      toast.success('Gestión finalizada')
      getPendingActs()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const validationGeneric = (action) => {
    let validation = false

    switch (action?.actionType) {
      case 'UPLOAD_DOCUMENT':
        action?.ActionItems?.forEach((elementAction) => {
          if (!elementAction?.isRequired) return validation
          if (elementAction?.isRequired && !elementAction?.docVersionData) {
            validation = true
          }
        })
        break

      case 'SAVE_FORM':
        if (action.isRequired) {
          action?.ActionItems?.forEach((elementAction) => {
            if (!elementAction.isRequired) return validation
            if (elementAction.isRequired && !elementAction?.value) {
              validation = true
            }
          })
        }
        break

      case 'GENERATE_DOCUMENT':
        action?.ActionItems?.forEach((elementAction) => {
          if (!elementAction.isRequired) return validation
          if (elementAction.isRequired && !elementAction?.docVersionData) {
            validation = true
          }
        })
        break

      case 'REVIEW_DOCUMENT':
        action?.ActionItems?.forEach((elementAction) => {
          if (!elementAction.isRequired) return validation
          if (elementAction.isRequired && elementAction?.documentData?.status === 'PROYECTADO') {
            validation = true
          }
        })
        break

      case 'SIGN_DOCUMENT':
        action?.ActionItems?.forEach((elementAction) => {
          if (!elementAction.isRequired) return validation
          if (elementAction.isRequired && elementAction?.documentData?.status === 'PROYECTADO') {
            validation = true
          }
        })
        break

      case 'ASSIGNMENT_TO_USER':
        action?.ActionItems?.forEach((elementAction) => {
          if (!elementAction.isRequired) return validation
          if (elementAction.isRequired && !elementAction?.assignedUserData) {
            validation = true
          }
        })
        break

      default:
        break
    }

    return validation
  }

  const validationAndFinish = async () => {
    let isValid = true

    activityInfo?.[0]?.actionsToPerform?.forEach((action) => {
      const result = validationGeneric(action)
      if (result) {
        isValid = false
      }
    })

    if (isValid) {
      if (showSuggested) {
        navigate(`/inbox/suggestedActivities/${idProcess}/${idActivity}`)
        return
      }
      await finishManagement({
        body: {
          status: 'COMPLETED',
        },
      })
    } else {
      toast.error('Faltan actividades por completar')
    }
  }

  const handleFinishManagement = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'info',
      title: 'Confirmar',
      content: '¿Está seguro que desea finalizar la gestión?',
      onConfirm: () => {
        validationAndFinish()
      },
    })
  }

  return {
    handleFinishManagement,
    isPending,
    successFinishManagement,
    errorFinishManagement,
    loadingPendingActs,
  }
}

export default useFinishManagementFunction
