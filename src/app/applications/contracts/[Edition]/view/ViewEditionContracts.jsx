import { BackdropLoading, BasicTitle, CustomModal, ValueListGlobal } from '@/lib'
import { AccordionInfoContract, Accordions, OptionsForm, VariablesContract } from '../components'
import { Box, Typography } from '@mui/material'
import { FormContractType } from '@/app/applications/contractsTypes/[edition]/components'
import { EditingContractorsForm } from '@/app/applications/contractors/[edition]/components'
import { useStoreActions, useStoreState } from 'easy-peasy'

const ViewEditionContracts = ({
  title,
  loading,
  isNewContract,
  form,
  autocompletes,
  idEdition,
  modals,
  variablesContract,
  idTypeContract,
}) => {
  const { modalValueList, modalTypeContract } = modals
  const { handleSubmit, control, setValue, handleCancel, watch } = form

  const modalShow = useStoreState((state) => state.modalFuncs.modalShow)
  const setModalShow = useStoreActions((actions) => actions.modalFuncs.setModalShow)
  return (
    <>
      <Box
        component='form'
        sx={{ height: 'calc(100vh - 120px)' }}
        onSubmit={handleSubmit}
      >
        <BasicTitle
          title={title}
          backpath='/applications/contracts'
        />
        <BackdropLoading loading={loading} />
        <Box
          height='calc(100% - 100px)'
          overflow='auto'
          pt={2}
        >
          <AccordionInfoContract
            control={control}
            setValue={setValue}
            watch={watch}
            modalTypeContract={modalTypeContract}
            autocompletes={autocompletes}
            isNewContract={isNewContract}
          />
          <VariablesContract
            variablesContract={variablesContract}
            control={control}
            setValue={setValue}
          />
          {isNewContract ? (
            <Typography
              variant='h5'
              pt={2}
            >
              Para acceder a las demás opciones se debe crear el contrato primero
            </Typography>
          ) : (
            <Accordions
              idContract={idEdition}
              idTypeContract={idTypeContract}
              control={control}
              setValue={setValue}
              watch={watch}
            />
          )}
        </Box>
        <OptionsForm handleCancel={handleCancel} />
      </Box>
      {modalValueList.map((modal, index) => (
        <ValueListGlobal
          key={index}
          title={modal?.title}
          openOptions={modal?.open}
          rows={modal?.rows}
          loading={modal?.loading}
          columns={modal?.columns}
          selectedOption={modal?.selectedOption}
          searchOptions={modal?.searchOptions}
        />
      ))}

      <CustomModal
        open={modalTypeContract?.show}
        handleClose={modalTypeContract?.handleShow}
        title='Crear modalidad de contratación'
      >
        <FormContractType
          idEdition='new'
          handleClose={modalTypeContract?.handleShow}
        />
      </CustomModal>
      {modalShow && (
        <CustomModal
          open={modalShow}
          handleClose={setModalShow}
          title='Crear Tercero'
        >
          <EditingContractorsForm
            idEdition='new'
            handleClose={setModalShow}
          />
        </CustomModal>
      )}
    </>
  )
}

export default ViewEditionContracts
