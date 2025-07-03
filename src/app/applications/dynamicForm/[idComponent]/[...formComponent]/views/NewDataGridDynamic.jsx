import { Button } from '@mui/material'
import { useColumns, useGetDataEdit } from '../hooks'
import { BasicTable, useBoolean, useGetAllParams } from '@/libV4'
import { useMemo, useState } from 'react'
import { isEmpty, replacePlaceholders } from '@/lib'
import { ModalFormDetail } from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { blockInfo, getInfoData } from '../funcs'
import { useHandleDelete } from '../../hooks'

const NewDataGridDynamic = (props) => {
  const [dataComponent, setDataComponent] = useState([])
  const [dataRow, setDataRow] = useState({ isNew: false })
  const navigate = useNavigate()
  const openModal = useBoolean()
  const { pathname, search } = useLocation()
  const allQueryParams = useGetAllParams()
  const {
    block,
    queryParamsPks,
    companyId,
    formComponent,
    form,
    nit_compania,
    isDynamicForm,
    masterBlock,
  } = props

  const {
    blockId,
    items,
    blockEvents,
    isControlBlock,
    requestType,
    rawQuery,
    tableOptios,
    filterParam,
    relationShips,
  } = blockInfo(block)

  const isMarterBlock = blockId === masterBlock

  const queryParams = useMemo(() => {
    return Object.entries(allQueryParams).reduce((acc, [key, value]) => {
      if (!key.endsWith('.q')) return acc

      const id = key.replace('.q', '')

      if (id === filterParam) return acc

      const isPkField = items?.some((item) => item?.id === id && item?.isPk)

      if (isPkField) {
        acc[id] = value
      }

      return acc
    }, {})
  }, [allQueryParams, items, filterParam])

  const addOption = tableOptios?.some((option) => option?.id === 'add') || !tableOptios
  const editOption = tableOptios?.some((option) => option?.id === 'edit') || !tableOptios
  const deleteOption = tableOptios?.some((option) => option?.id === 'delete')
  const viewOption = tableOptios?.some((option) => option?.id === 'view')

  const { getDataEdit, isGetDataEditPending, getDataToRawQuery, loadingDataToRQ } = useGetDataEdit({
    processSuccess: setDataComponent,
    blockId,
    queryParamsPks,
    companyId,
    formComponent,
    requestType,
    rawQuery,
    isDynamicForm,
    queryParams,
    relationShips,
  })

  const onSuccessFunc = async () => {
    await getInfoData({
      requestType,
      rawQuery,
      replacePlaceholders,
      getDataToRawQuery,
      getDataEdit,
      blockId,
      queryParams,
      relationShips,
      queryParamsPks,
    })
  }

  const { confirmDelete, isDeleting } = useHandleDelete({
    refetch: onSuccessFunc,
    pksProps: {
      inputArray: block?.items || [],
    },
    dbTable: block?.dbTable,
  })

  const handleOpenModal = (edit, data) => {
    if (edit) {
      setDataRow({ isNew: false, ...data })
      openModal.handleShow()
      return
    }
    setDataRow({ isNew: true })
    openModal.handleShow()
  }

  const handleCloseModal = () => {
    block?.items?.forEach((input) => {
      form.setValue(`${blockId}.${input?.id}`, null)
    })
    form.clearErrors([blockId])
    setDataRow({ isNew: false })

    openModal.handleShow()
  }

  const onClickView = (data) => {
    const newParam = data[filterParam]
    const searchParams = new URLSearchParams(search)
    Array.from(searchParams.keys()).forEach((key) => {
      if (key.startsWith(`${filterParam}.q`)) {
        searchParams.delete(key)
      }
    })

    searchParams.set(`${filterParam}.q`, newParam)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const columns = useColumns({
    data: block,
    onClick: handleOpenModal,
    onClickView,
    onClickDelete: confirmDelete,
    editOption,
    deleteOption,
    viewOption,
  })

  return (
    <>
      <div className='h-[calc(100vh - 250px)] flex flex-col'>
        {addOption && (
          <div className='mb-1 flex justify-end'>
            <Button
              variant='contained'
              onClick={() => handleOpenModal()}
              disabled={isEmpty(queryParamsPks)}
            >
              Agregar
            </Button>
          </div>
        )}
        <div className='flex-grow overflow-auto'>
          <BasicTable
            containerProps={{
              className: 'h-[calc(100vh-375px)]',
            }}
            columns={columns}
            loading={isGetDataEditPending || loadingDataToRQ || isDeleting}
            rows={dataComponent?.data ?? []}
          />
        </div>
      </div>
      <ModalFormDetail
        title={block?.blockId}
        queryParamsPks={queryParamsPks}
        formComponent={formComponent}
        companyId={companyId}
        nit_compania={nit_compania}
        form={form}
        dataBlock={block}
        dataRow={dataRow}
        open={openModal.show}
        handleClose={handleCloseModal}
        getDataEdit={getDataEdit}
        getDataToRawQuery={getDataToRawQuery}
        blockEvents={blockEvents}
        isControlBlock={isControlBlock}
        requestType={requestType}
        rawQuery={rawQuery}
        queryParams={queryParams}
        isDynamicForm={isDynamicForm}
        relationShips={relationShips}
        isMarterBlock={isMarterBlock}
      />
    </>
  )
}

export default NewDataGridDynamic
