import Rethus from '@/app/rethus/[...idCompany]/page'
import { ConstructionPage, CustomModal } from '@/lib'
import { ViewFamilyServices } from '@/lib/components/FormFamilyServices/views'
import { useStoreState } from 'easy-peasy'

const ModalFormRegistry = ({ processInfo, modalForm }) => {
  const userData = useStoreState((state) => state.user.userData)
  const idProcess = processInfo?.[0]?.id
  const idCompany = userData.companies?.[0]?.companyId
  const idGroup = processInfo?.[0]?.ProcessType?.Group?.id
  const idProcessParent = processInfo?.[0]?.idProcessParent
  const idProcessType = processInfo?.[0]?.ProcessType?.id
  const fillingForm = processInfo?.[0]?.ProcessType?.Group?.filingForm

  const editingForm = {
    rethus: {
      component: Rethus,
      props: { params: { idCompany: [idCompany, idProcess], modalForm } },
    },
    familyServices: {
      component: ViewFamilyServices,
      props: { idGroup, idProcessParent, idProcessParam: idProcess, idProcessType, edition: true },
    },
  }

  const ComponentForm = editingForm?.[fillingForm]?.component

  return (
    <CustomModal
      title='Edición de formulario de radicación'
      open={modalForm.show}
      handleClose={modalForm.handleShow}
      size='xl'
    >
      {ComponentForm ? (
        <ComponentForm {...editingForm?.[fillingForm]?.props} />
      ) : (
        <ConstructionPage />
      )}
    </CustomModal>
  )
}

export default ModalFormRegistry
