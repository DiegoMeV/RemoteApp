import { useEffect, useMemo, useState } from 'react'
import { useProcessModifyItem } from '../hooks'
import { BackdropLoading, GenericAutocompleteRequest } from '@/libV4'
import { Button } from '@mui/material'
import useItemsToPerform from '../../../hooks/useItemsToPerform'

const ElementBindProcesess = ({
  ids,
  idAction,
  element,
  idActivityAction,
  refetchElementActions,
}) => {
  const [idProcess, idActivity] = ids || []

  const [elementActionLocal, setElementActionLocal] = useState({})

  useEffect(() => {
    if (element) {
      setElementActionLocal(element)
    }
  }, [element])

  const { performAction, updatingItemAction } = useItemsToPerform({
    idProcess,
    idActivity,
    idAction,
    onSuccess: (response) => {
      setElementActionLocal(response?.data?.[0])
    },
    onError: () => {
      refetchElementActions?.()
    },
  })

  const onSuccessAditional = async (response) => {
    performAction({ qry: `?idTaskActionItem=${response?.data?.[0]?.idTaskActionItem}` })
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    null,
    onSuccessAditional
  )

  const defaultProcess = useMemo(() => {
    return elementActionLocal?.activityActionItemData?.processRelData ?? {}
  }, [elementActionLocal])

  const [selectedProcess, setSelectedProcess] = useState(defaultProcess)

  useEffect(() => {
    if (defaultProcess?.id) {
      setSelectedProcess(defaultProcess)
    }
  }, [defaultProcess])

  const handleProcessChange = () => {
    const body = {
      idTaskActionItem: elementActionLocal?.id,
      idProcessRel: selectedProcess?.id,
    }
    const qry = `/${elementActionLocal?.activityActionItemData?.id ?? ''}`

    const methodBody = elementActionLocal?.activityActionItemData?.id ? 'put' : 'post'

    modifyItemInformation({ qry, body, methodBody })
  }

  return (
    <>
      <BackdropLoading
        loading={loadingItemCreation || updatingItemAction}
        sizeLoading={50}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <GenericAutocompleteRequest
        className='xs:col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10'
        value={selectedProcess}
        requestprops={{
          baseKey: 'urlProcess',
          url: `/processes?idProcessType=${
            elementActionLocal?.ProcessTypeRel?.id ?? ''
          }&status=COMPLETED`,
          isPaginated: false,
        }}
        getOptionLabel={(options) =>
          `${options?.identifier ?? ''}${
            options?.ProcessType?.name ? ` - ${options?.ProcessType?.name}` : ''
          }`
        }
        disabled={defaultProcess?.id}
        vlprops={{
          shouldClose: true,
          columns: [
            {
              title: 'Identificador',
              dataIndex: 'identifier',
            },
            {
              title: 'Tipo de proceso',
              dataIndex: 'ProcessType',
              render: (_, data) => data?.ProcessType?.name ?? '',
            },
          ],
          toolbarProps: {
            searchProps: {},
          },
        }}
        onChange={(_, value) => setSelectedProcess(value)}
      />
      <Button
        variant='contained'
        className='xs:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2'
        disabled={defaultProcess?.id}
        onClick={() => handleProcessChange()}
      >
        Guardar
      </Button>
    </>
  )
}

export default ElementBindProcesess
