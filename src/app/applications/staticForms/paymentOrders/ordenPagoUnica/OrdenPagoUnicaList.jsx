import { BasicTitle, formatToLocaleDateString, QueryTable } from '@/libV4'
import { Edit, Visibility } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const OrdenPagoUnicaList = () => {
  const userData = useStoreState((state) => state.user.userData)
  const nit_compania = userData?.companies?.[0]?.Company?.taxId

  const navigation = useNavigate()

  return (
    <div>
      <BasicTitle title='Lista de ordenes de pago únicas' />
      <div className='p-2 backgroundGray1'>
        <QueryTable
          toolbarComp={
            <Button
              variant='contained'
              className='order-5'
              onClick={() => navigation('form')}
            >
              Agregar
            </Button>
          }
          queryProps={{
            lovQuery: `SELECT
                          sop.*,
                          TRIM(ter.nombre)
                          || ' '
                          || TRIM(ter.apellido_1)
                          || ' '
                          || TRIM(ter.apellido_2)  nombre_tercero,
                          nvl(ter.pensionado, 'N') pensionado,
                          cco.nombre               nombre_centro,
                          tco.descripcion          desc_contrato
                      FROM
                          siif.orden_pagou   sop
                          LEFT JOIN siif.tercero       ter ON ter.nit_compania = sop.nit_compania
                                                        AND ter.tercero = sop.tercero
                          LEFT JOIN siif.centrocosto   cco ON cco.nit_compania = sop.nit_compania
                                                            AND cco.id_centrocosto = sop.id_centrocosto
                          LEFT JOIN siif.tipo_contrato tco ON tco.nit_compania = sop.nit_compania
                                                              AND tco.tipo_contrato = sop.tipo_contrato
                      WHERE
                          sop.nit_compania = ${nit_compania}
                      AND (
                          translate(upper(sop.orden), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                          translate(upper(sop.concepto), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                          translate(upper(sop.tipo_contrato), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
                          )`,
          }}
          tableProps={{
            columns: [
              { field: 'orden', headerName: 'Orden' },
              {
                field: 'fecha',
                headerName: 'Fecha',
                renderCell: (row) => formatToLocaleDateString(row?.fecha),
              },
              { field: 'nombre_tercero', headerName: 'Tercero' },
              { field: 'nombre_centro', headerName: 'Centro Costo' },
              { field: 'desc_contrato', headerName: 'Contrato' },
              {
                field: 'options',
                headerName: '',
                width: 110,
                pinned: 'right',
                renderCell: (row) => (
                  <>
                    <IconButton
                      title='Editar orden de pago'
                      onClick={() => navigation(`form?orden.pk=${row?.orden}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      title='Ver detalle'
                      onClick={() => navigation(`form?orden.pk=${row?.orden}&unsoloconsulta=SI`)}
                    >
                      <Visibility />
                    </IconButton>
                  </>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default OrdenPagoUnicaList
