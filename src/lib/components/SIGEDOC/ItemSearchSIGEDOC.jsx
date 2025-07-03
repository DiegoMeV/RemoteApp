import { useMutationDynamicBaseUrl } from '@/lib/api'
import { BackdropLoading, ClassicIconButton, SearchTextField } from '@/lib/ui'
import { Delete } from '@mui/icons-material'
import { Grid } from '@mui/material'
import toast from 'react-hot-toast'
import { inputLabelSearchSigedoc } from './funcs'
import { MagicString } from '@/lib/constants'

const ItemSearchSIGEDOC = ({ index, handleRemove, form, disabled }) => {
  const idSigedoc = form?.watch(`arrSearch.${index}.idCadena`)

  const { mutateAsync: getSigedocInfo, isPending } = useMutationDynamicBaseUrl({
    url: '/SIGEDOC/consultar/radicado',
    method: 'get',
    baseKey: 'urlCgrInt',
    isCompanyRequest: true,
    onSuccess: (response) => {
      if (response?.data?.length === 0) {
        toast.error('No se encontró SIGEDOC')
        form?.setValue(`arrSearch.${index}.idCadena`, 'none')
        return
      }
      form?.setValue(
        `arrSearch.${index}.idCadena`,
        response?.data[0]?.DocumentoComunicacion?.codigoSeguimiento
      )
      toast.success('Se encontró la información de SIGEDOC')
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al buscar')

      toast.error('No se encontró SIGEDOC')
      form?.setValue(`arrSearch.${index}.idCadena`, 'none')
    },
  })

  const handleClickSearchBtn = () => {
    const searchSigedoc = form?.watch(`arrSearch.${index}.label`)
    if (!searchSigedoc) {
      toast.error(MagicString.MANAGEMENT.SIGEDOC_SEARCH_REQUIRED_MESSAGE)
      return
    }
    getSigedocInfo({ qry: `/${searchSigedoc}` })
  }

  const INPUT_SEARCH_SIGEDOC = inputLabelSearchSigedoc({
    index,
    handleClick: handleClickSearchBtn,
    isLoading: isPending,
    idSigedoc,
    verificationSuccess: idSigedoc && idSigedoc !== 'none',
  })

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        my: 2,
      }}
    >
      <BackdropLoading loading={isPending} />
      <SearchTextField
        item={INPUT_SEARCH_SIGEDOC}
        control={form?.control}
      />
      <ClassicIconButton
        onClick={() => handleRemove(index)}
        title={'Eliminar'}
        placement={'bottom'}
        color={'error'}
        disabled={disabled}
      >
        <Delete />
      </ClassicIconButton>
    </Grid>
  )
}

export default ItemSearchSIGEDOC
