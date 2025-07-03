import {
  BasicTitle,
  CustomAccordion,
  CustomModal,
  ErrorPage,
  MagicString,
  SearchTable,
  getRowClassName,
  resizeColumns,
} from '@/lib'

import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'
import { formsForRetenciones } from '../funcs'
import { GenericForm } from '@/libV4'

const ViewRetenciones = ({ dataOptions, modalOptions, isLoading, isError, control, onSubmit }) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)

  const {
    ADMINISTRATION: { DOCUMENT_RETENCION_TABLE },
  } = MagicString

  const {
    dependencias,
    columns,
    getDetailPanelContentDependencia,
    rowParams,
    pagination,
    searchOffices,
  } = dataOptions

  const titles = {
    addSerie: `${DOCUMENT_RETENCION_TABLE.ADD_SERIE}${rowParams?.name}`,
    editSerie: `${DOCUMENT_RETENCION_TABLE.EDIT_SERIE}${rowParams?.nombre ?? ''}`,
    addSubSerie: `${DOCUMENT_RETENCION_TABLE.ADD_SUBSERIE}${rowParams?.nombre ?? ''}`,
    editSubSerie: `${DOCUMENT_RETENCION_TABLE.EDIT_SUBSERIE}${rowParams?.nombre ?? ''} `,
    createDocumentType: DOCUMENT_RETENCION_TABLE.CREATE_DOCUMENT_TYPE,
    editDocumentType: DOCUMENT_RETENCION_TABLE.EDIT_DOCUMENT_TYPE,
  }

  useEffect(() => {
    resizeColumns(apiRef, isLoading)
  }, [apiRef, isLoading, dependencias])

  const title = titles?.[rowParams?.form ?? '']
  const formsRetenciones = formsForRetenciones(rowParams?.editing)

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <BasicTitle
            title={DOCUMENT_RETENCION_TABLE.TITLE}
            backpath='/administration'
          />
          <div className='flex flex-col gap-2 p-2'>
            <SearchTable
              searchText={searchOffices?.searchText}
              onChange={searchOffices?.handleSearchText}
              clearSearch={searchOffices?.clearSearch}
              width='100%'
            />
            <div className='h-[calc(100vh-250px)]'>
              <DataGridPremium
                apiRef={apiRef}
                rows={dependencias ?? []}
                columns={columns ?? []}
                rowCount={pagination?.rowCountState}
                getRowClassName={(params) => getRowClassName(dark, params)}
                pagination
                paginationMode='server'
                paginationModel={pagination?.paginationModel}
                onPaginationModelChange={pagination?.handlePaginationModelChange}
                pageSizeOptions={[10, 20, 50, 100]}
                loading={isLoading}
                initialState={{
                  pinnedColumns: {
                    right: ['options'],
                  },
                }}
                getDetailPanelContent={getDetailPanelContentDependencia}
                getDetailPanelHeight={() => 'auto'}
              />
            </div>
          </div>
          {modalOptions?.show && (
            <CustomModal
              open={modalOptions?.show}
              handleClose={modalOptions?.handleShow}
              title={title}
              size='xl'
              modalType='form'
              onSubmit={onSubmit}
              actions={[
                {
                  label: MagicString.GENERAL.CANCEL_TITLE,
                  color: 'error',
                  onClick: modalOptions?.handleShow,
                },
                {
                  label: MagicString.GENERAL.SAVE_TITLE,
                  type: 'submit',
                },
              ]}
            >
              <section className='space-y-4'>
                <div className='grid grid-cols-12 gap-4'>
                  <GenericForm
                    inputs={formsRetenciones?.[rowParams?.type]}
                    control={control}
                  />
                </div>

                {rowParams?.type === 'serie' && (
                  <CustomAccordion title={DOCUMENT_RETENCION_TABLE.TITLE_SERIES_WITHOUT_SUBSERIES}>
                    <div className='grid grid-cols-12 gap-4'>
                      <GenericForm
                        inputs={formsRetenciones?.aditionalDataSerie}
                        control={control}
                      />
                    </div>
                  </CustomAccordion>
                )}
              </section>
            </CustomModal>
          )}
        </>
      )}
    </>
  )
}

export default ViewRetenciones
