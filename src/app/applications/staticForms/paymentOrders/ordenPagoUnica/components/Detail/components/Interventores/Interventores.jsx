import { useBoolean } from '@/lib'
import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { interventoresColumns, LOV_INTERVENTORES, QUERY_INTERVENTORES } from './funcs'
import { BasicTable, useQueryOracle, ValueListQuery } from '@/libV4'
import { useEffect, useState } from 'react'
import { keyName } from '../../../../constants'
import { useSubmitHooks } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const Interventores = ({ nit_compania, queryParamsPks, getFormValue, commonPostInsert }) => {
  const modalToAddRows = useBoolean(null, {
    content: '¿Está seguro de cancelar los cambios?',
    icon: 'warning',
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [interventoresRows, setInterventoresRows] = useState([])

  const {
    data: interventoresData,
    isFetching: loadingInterventores,
    refetch: refetchInterventores,
  } = useQueryOracle({
    query: QUERY_INTERVENTORES({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['interventores', nit_compania, queryParamsPks?.orden],
  })

  useEffect(() => {
    if (queryParamsPks?.orden && interventoresData) {
      const data = interventoresData?.data
      const newRows = data?.map?.((row) => {
        return {
          id: crypto.randomUUID(),
          ...row,
        }
      })
      setInterventoresRows(newRows)
    }
  }, [nit_compania, queryParamsPks?.orden, interventoresData])

  const { submitRuntime, deleteRecord, loadingSubmit, deletingRecord } = useSubmitHooks({
    keyName,
    getData: async ({ isDeleted }) => {
      if (!isDeleted) {
        const responseGeneralPI = await commonPostInsert()

        if (responseGeneralPI?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(
            responseGeneralPI?.data?.outBinds?.OutMessage ?? 'Error al realizar general post insert'
          )
        }
      }
      refetchInterventores()
    },
  })

  const onSubmit = async (row) => {
    const data = {
      nit_compania,
      orden: Number(queryParamsPks?.orden),
      tercero: row?.tercero,
      tercero_type: row?.tercero_type,
    }

    submitRuntime({
      body: {
        blockId: 'interventores_por_opu',
        data,
      },
    })
  }

  const handleDelete = async (row) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: () => {
        deleteRecord({
          body: {
            blockId: 'interventores_por_opu',
            where: {
              nit_compania,
              orden: Number(queryParamsPks?.orden),
              tercero: row?.tercero,
            },
          },
        })
      },
    })
  }

  const columns = interventoresColumns({ handleDelete })

  return (
    <>
      <div className='flex justify-end p-2'>
        <Button
          startIcon={<AddCircle />}
          onClick={() => modalToAddRows?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        loading={loadingInterventores || deletingRecord}
        rows={interventoresRows}
        columns={columns}
      />
      {modalToAddRows?.show && (
        <ValueListQuery
          show={modalToAddRows?.show}
          handleShow={modalToAddRows?.handleShow}
          handleShowConfirm={modalToAddRows?.handleShowConfirm}
          selectedOption={(row) => onSubmit(row)}
          closeOnSelect={false}
          loadingSubmit={loadingSubmit}
          queryProps={{
            lovQuery: LOV_INTERVENTORES({ nit_compania, getFormValue }),
          }}
          tableProps={{
            columns: [
              {
                field: 'tercero',
                headerName: 'Número de interventor',
              },
              {
                field: 'nombre',
                headerName: 'Nombre de interventor',
              },
            ],
          }}
        />
      )}
    </>
  )
}

export default Interventores
