import { SquareIconButton, useMutationDynamicBaseUrl } from '@/lib'
import { BackdropLoading, CustomModal } from '@/libV4'
import { Checkbox, FormControlLabel } from '@mui/material'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const ModalTerms = ({ modalTerms, setModalInfo, modalInfo }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutateAsync: createProcessPQRSDF, isPending: loadingCreatePQRSDF } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlApps',
      url: `/app-specific/pqrsd/key-name/request`,
      isCompanyRequest: true,
      companyId: id,
      onSuccess: (e) => {
        navigate(`/pqrsdf/${id}/registry/${modalInfo.keyName}/${e?.data?.id}`)
        modalTerms.handleShow()
      },
      onError: (error) => {
        toast.error('Error al crear el PQRSDF', error)
      },
    })

  const AcceptTerms = () => {
    if (modalInfo.checkState) {
      createProcessPQRSDF()
    } else {
      toast.error('Debe aceptar las condiciones para continuar')
    }
  }
  return (
    <CustomModal
      open={modalTerms.show}
      handleClose={modalTerms.handleShow}
      title='Política de tratamiento de datos'
    >
      <BackdropLoading open={loadingCreatePQRSDF} />
      <div className='flex flex-col shadow-gray-light shadow p-8 items-center'>
        <p>
          De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013, la Lotería de Risaralda
          informa que el envío de esta información implica su autorización para el tratamiento de
          datos personales, según nuestras políticas.
        </p>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) =>
                setModalInfo({
                  ...modalInfo,
                  checkState: e.target.checked,
                })
              }
            />
          }
          label={
            <>
              Acepto condiciones Políticas de Privacidad y <br />
              Políticas de Tratamientos de datos personales
            </>
          }
          sx={{ width: '45%', my: 8 }}
        />
        <SquareIconButton
          onClick={AcceptTerms}
          sx={{ maxWidth: '500px' }}
          size={'large'}
          text={'Continuar'}
        />
      </div>
    </CustomModal>
  )
}

export default ModalTerms
