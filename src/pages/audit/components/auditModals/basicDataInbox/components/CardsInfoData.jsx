import { Box, Button, CircularProgress } from '@mui/material'
import CardInfo from './CardInfo'
import { useInfoCards } from '../funcs'
import { processDocument, useGetBufferDocument } from '@/lib'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { CustomAccordion, DataGridCustom, formatColombianMoney } from '@/libV4'

const CardsInfoData = ({ info, idProcess }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { processData, datosContribuyente } = useInfoCards({
    info,
  })

  const [newBuffer, setNewBuffer] = useState(null)

  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const { mutateAsync: getBuffer, isLoading: loadingBuffer } = useGetBufferDocument({
    companyId,
    onSuccess: async (response) => {
      const buffer = await processDocument({ buffer: response })
      setNewBuffer(buffer)
    },
    onError: () => {
      toast.error('Error al obtener el sticker')
    },
  })

  useEffect(() => {
    if (info?.processData?.idDocumentSticker) {
      getBuffer({ qry: `${info?.processData?.idDocumentSticker}/documentos` })
    }
  }, [info?.processData?.idDocumentSticker])

  return (
    <Box component={'div'}>
      <>
        {info?.processData?.idDocumentSticker && (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            position='relative'
            mb={5}
          >
            <Button
              variant='contained'
              onClick={() =>
                setPreviewer({
                  open: true,
                  idDocument:
                    info?.processData?.idDocumentStickerPdf ?? info?.processData?.idDocumentSticker,
                  loadingPreviewer: true,
                })
              }
              sx={{
                m: 2,
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              Descargar sticker
            </Button>
            {loadingBuffer ? (
              <CircularProgress size={40} />
            ) : (
              <img
                src={newBuffer}
                height={200}
                alt='sticker'
                style={{ height: 'auto' }}
              />
            )}
          </Box>
        )}

        <CardInfo
          title={'Datos del proceso'}
          info={processData}
        />

        <CardInfo
          title={'Datos del contribuyente'}
          info={datosContribuyente}
        />

        <CustomAccordion
          title='Detalle de cartera'
          accordionprops={{
            defaultExpanded: true,
          }}
        >
          <DataGridCustom
            requestProps={{
              baseKey: 'urlFiscalizacion',
              url: '/processes/debt-details',
              additionalQry: `&idProcess=${idProcess}`,
            }}
            tableProps={{
              containerProps: {
                className: 'h-[500px]',
              },
              rowHeight: 52,
              columns: [
                {
                  field: 'idDebtConcept',
                  headerName: 'Id',
                  defaultSortOrder: 'asc',
                  hidden: true,
                },
                {
                  field: 'period',
                  headerName: 'Periodo',
                },
                {
                  field: 'debtConceptDesc',
                  headerName: 'Concepto',
                },
                {
                  field: 'debtAmount',
                  headerName: 'Valor',
                  renderCell: (data) => formatColombianMoney(data?.debtAmount),
                },
              ],
            }}
          />
        </CustomAccordion>
      </>
    </Box>
  )
}

export default CardsInfoData
