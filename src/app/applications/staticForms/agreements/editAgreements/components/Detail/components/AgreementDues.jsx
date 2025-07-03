import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DebtConceptsModal } from '.'
import { duesColumns, inputsDuesTab } from '../../../constants'
import {
  BasicTable,
  CustomModal,
  GenericForm,
  Loading,
  useBoolean,
  useQueryDynamicApi,
} from '@/libV4'

const AgreementDues = ({ idAgreement }) => {
  const openModal = useBoolean()

  const [currentRow, setCurrentRow] = useState(null)

  const { data: duesAgreement, isLoading: loading } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    url: `/convenios/cuotas-convenio-v2/${idAgreement}`,
    isCompanyRequest: true,
    enabled: !!idAgreement,
  })

  const columns = duesColumns({ openModal, setCurrentRow })
  const rows = duesAgreement?.data ?? []

  // mode: 'onBlur',
  const form = useForm({
    defaultValues: {
      cuotasPendientes: '',
      valorConvenio: '',
      valorPendiente: '',
    },
  })

  const INPUTS_DUES = inputsDuesTab({})

  return (
    <article className='backgroundwhite1 h-full w-full flex flex-col gap-4 p-4'>
      {loading && <Loading />}
      <BasicTable
        containerProps={{ className: 'h-[450px]' }}
        rows={rows}
        columns={columns}
        loading={loading}
      />
      <div className='general_form_container'>
        <GenericForm
          control={form?.control}
          inputs={INPUTS_DUES}
        />
      </div>
      {openModal?.show && (
        <CustomModal
          open={openModal?.show}
          handleClose={openModal?.handleShow}
          title={'Conceptos de la cuota'}
        >
          <DebtConceptsModal currentRow={currentRow} />
        </CustomModal>
      )}
    </article>
  )
}

export default AgreementDues
