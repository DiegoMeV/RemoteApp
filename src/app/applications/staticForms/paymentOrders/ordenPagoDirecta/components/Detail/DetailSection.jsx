import { BasicTitle, ConstructionPage, CustomTabHeaders } from '@/lib'
import { BackdropLoading, isEmpty } from '@/libV4'
import { Box } from '@mui/material'

function CustomTabPanel(props) {
  const { children, value, index, sx = {}, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, ...sx }}>{children}</Box>}
    </div>
  )
}

const DetailSection = ({
  detailTabs,
  queryParamsPks,
  valueTab,
  handleChangeTab,
  bloquearBloques,
  ordenPagoData,
  loadingSubmitMaster,
  onSubmitMaster,
  setFormValue,
  isPendingBD,
  detalleOrdenValorNeto,
}) => {
  const isDataEmpty = isEmpty(ordenPagoData?.data?.[0])
  const orden = queryParamsPks?.orden

  return (
    <section
      style={{
        padding: '10px',
      }}
    >
      {orden && !isDataEmpty ? (
        <>
          <BasicTitle title='Opciones de Orden de Pago' />
          <CustomTabHeaders
            value={valueTab}
            handleChange={handleChangeTab}
            options={detailTabs}
            variant='scrollable'
            scrollButtons
            sx={{
              backgroundColor: 'backgroundWhite1',
            }}
          />

          {detailTabs?.map((option, index) => {
            const properties = option?.tabProps ?? {}
            return (
              <CustomTabPanel
                key={index}
                value={valueTab}
                index={index}
                sx={{
                  minHeight: '550px',
                  backgroundColor: 'backgroundWhite1',
                  position: 'relative',
                  ...properties,
                }}
                className={`${bloquearBloques ? 'pointer-events-none' : ''}`}
              >
                {isPendingBD && (
                  <BackdropLoading
                    loading={isPendingBD}
                    sizeLoading={80}
                    sx={{
                      position: 'absolute',
                      borderRadius: '5px',
                      zIndex: 100,
                    }}
                  />
                )}
                {option.component({
                  onSubmitMaster,
                  setFormValue,
                  loadingSubmitMaster,
                  ordenPagoData,
                  detalleOrdenValorNeto,
                }) ?? <ConstructionPage />}
              </CustomTabPanel>
            )
          })}
        </>
      ) : (
        <BasicTitle
          title={
            isDataEmpty && orden
              ? 'Por favor revisar el número de la orden'
              : 'Los detalles serán visibles una vez guardada la orden de pago'
          }
          titleStyles={{
            borderRadius: '10px',
          }}
        />
      )}
    </section>
  )
}

export default DetailSection
