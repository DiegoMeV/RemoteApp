import { CustomAccordion, GenericTable, useQueryDynamicApi } from '@/lib'
import { SGDEAColumns } from './constants'

const SGDEA = ({ infoAlert }) => {
  const { data: SGDEAS, isFetching } = useQueryDynamicApi({
    baseKey: 'urlCgrInt',
    // TODO: url: `/SGDEA/expediente/${infoAlert?.sgdea_id_expediente}`,
    url: `/SGDEA/expediente/14393`,
    enabled: !!infoAlert,
  })

  const newRows = SGDEAS?.data?.documentosConsultados?.map((row) => ({
    id: crypto.randomUUID(),
    ...row,
  }))

  return (
    <>
      {infoAlert && (
        <CustomAccordion title={`Información SGDEA - ${infoAlert?.sgdea_numero_expediente}`}>
          <GenericTable
            rows={newRows ?? []}
            columns={SGDEAColumns}
            loading={isFetching}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
          />
        </CustomAccordion>
      )}
    </>
  )
}

export default SGDEA
