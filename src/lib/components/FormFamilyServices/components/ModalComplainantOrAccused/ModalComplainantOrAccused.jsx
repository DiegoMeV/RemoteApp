import { BackdropLoading, CustomAccordion, CustomModal, ValueListGlobal } from '@/lib'

import FormComplainantOrAccused from './FormBasicData'
import FormAdditionalData from './FormAdditionalData'

const ModalComplainantOrAccused = ({
  loading,
  modalOptionsFS,
  handleCloseModal,
  formModal,
  onSubmit,
  onError,
  typeTable,
  basicData,
  enabledAdditionalData,
  characterization,
  additionalDataActor,
  valueListEducationLevel,
  educationalLevel,
  searchEducationLevel,
  handleChangeEducationalLevel,
  modalProvinces,
  provincesInfo,
  handleChangeBornProvince,
  searchDepartments,
  modalNeighborhoods,
  neighborhoodsInfo,
  handleChangeNeighborhood,
  searchNeighborhoods,
}) => {
  return (
    <>
      <BackdropLoading loading={loading} />
      <CustomModal
        open={modalOptionsFS.show}
        handleClose={handleCloseModal}
        title={typeTable === 'PETICIONARIO' ? 'Agregar peticionario' : 'Agregar tercero'}
        size='lg'
        modalType='form'
        onSubmit={formModal.handleSubmit(onSubmit, onError)}
        actions={[
          {
            label: 'Cancelar',
            color: 'error',
            onClick: handleCloseModal,
          },
          {
            label: 'Guardar',
            type: 'submit',
          },
        ]}
        height='calc(100vh - 200px)'
      >
        <CustomAccordion
          defaultExpanded={true}
          title={`Información del ${
            typeTable === 'PETICIONARIO'
              ? 'peticionario'
              : typeTable === 'DENUNCIANTE'
              ? 'denunciante'
              : 'denunciado'
          }`}
        >
          <FormComplainantOrAccused
            basicData={basicData}
            formModal={formModal}
          />
        </CustomAccordion>
        {!enabledAdditionalData && (
          <CustomAccordion
            title='Caracterización'
            expandedValue={characterization.show}
            onClickAccordion={characterization.handleShow}
          >
            <FormAdditionalData
              additionalDataActor={additionalDataActor}
              formModal={formModal}
            />
            <ValueListGlobal
              title='Nivel educativo que Tiene o Cursa'
              openOptions={valueListEducationLevel}
              rows={educationalLevel?.data?.data ?? []}
              searchOptions={searchEducationLevel}
              columns={[{ field: 'nombre', headerName: 'Nivel educativo', flex: 1 }]}
              selectedOption={(params) => {
                handleChangeEducationalLevel(params.row)
              }}
            />
            <ValueListGlobal
              title='Departamento de Procedencia'
              openOptions={modalProvinces}
              searchOptions={searchDepartments}
              rows={provincesInfo?.data?.data ?? []}
              columns={[{ field: 'nombre', headerName: 'Departamento', flex: 1 }]}
              selectedOption={(params) => {
                handleChangeBornProvince(params.row)
              }}
            />
            <ValueListGlobal
              title='Barrio o Vereda de Residencia'
              openOptions={modalNeighborhoods}
              searchOptions={searchNeighborhoods}
              rows={neighborhoodsInfo?.data?.data ?? []}
              columns={[
                { field: 'nombre', headerName: 'Nombre Barrio', flex: 1 },
                {
                  field: 'nameCommune',
                  headerName: 'Nombre comuna',
                  flex: 1,
                },
              ]}
              selectedOption={(params) => {
                handleChangeNeighborhood(params.row)
              }}
            />
          </CustomAccordion>
        )}
      </CustomModal>
    </>
  )
}

export default ModalComplainantOrAccused
