import { BackdropLoading, CustomModal, GenericForm } from '@/libV4'

const EditionModal = ({ rowSelected, editionModal, onSubmit, control, inputs, loading }) => {
  return (
    <CustomModal
      title={
        rowSelected
          ? 'Edición de registro Detalle de la orden'
          : 'Creación de registro Detalle de la orden'
      }
      open={editionModal?.show}
      handleClose={() => editionModal?.handleShowConfirm()}
      actions={[
        {
          label: 'Cancelar',
          color: 'error',
          onClick: () => editionModal?.handleShowConfirm(),
        },

        {
          label: 'Guardar',
          onClick: () => {
            onSubmit()
          },
        },
      ]}
      size='sm'
      dialogClassName='relative'
    >
      <BackdropLoading
        loading={loading}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <div className='general_form_container'>
        <GenericForm
          inputs={inputs}
          control={control}
        />
      </div>
    </CustomModal>
  )
}

export default EditionModal
