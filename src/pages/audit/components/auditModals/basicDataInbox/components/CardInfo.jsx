import { CustomAccordion, NoDataOverlay, getRowClassName } from '@/lib'
import { Grid, LinearProgress, Typography } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'

const CardInfo = ({ title, info, columnsActivity, getId, sigedocFile = '' }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  return (
    <CustomAccordion
      title={title}
      defaultExpanded={true}
    >
      <Grid container>
        {!columnsActivity ? (
          info?.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
            >
              <Grid
                container
                sx={{
                  backgroundColor: index % 2 === 0 ? 'backgroundWhite1' : 'backgroundGrey1',
                }}
                p={2}
              >
                <Grid
                  item
                  xs={3}
                  display='flex'
                  alignItems='center'
                >
                  <Typography fontWeight={'bold'}>{item?.title ?? ''}:</Typography>
                </Grid>

                <Grid
                  item
                  xs={9}
                  style={{ overflowY: 'auto', maxHeight: '100px' }}
                >
                  <Typography style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {item?.description ?? ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <DataGridPremium
            columns={columnsActivity || []}
            rows={info || []}
            getRowId={getId ?? null}
            getRowClassName={(params) => getRowClassName(dark, params)}
            slots={{
              loadingOverlay: LinearProgress,
              noRowsOverlay: NoDataOverlay,
            }}
            sx={{ bgcolor: 'backgroundWhite1' }}
            autoHeight
          />
        )}
        <Grid
          item
          xs={12}
          display='flex'
          justifyContent='center'
          pt={2}
        >
          {sigedocFile && (
            <img
              src={sigedocFile}
              style={{
                width: '50%',
                minWidth: '320px',
                height: 'auto',
              }}
              alt='Imagen del codigo de sigedoc'
            />
          )}
        </Grid>
      </Grid>
    </CustomAccordion>
  )
}

export default CardInfo
