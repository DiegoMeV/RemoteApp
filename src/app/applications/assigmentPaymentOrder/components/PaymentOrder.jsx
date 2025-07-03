import { BackdropLoading, GenericForm, useMutationDynamicBaseUrl } from '@/lib'
import { Box, Button, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PaymentOrder = ({ idProcess, infoOrder, refetchTreasuriesList, paymentOrderStates }) => {
  const form = useForm()
  const queryClient = useQueryClient()
  const messageReject = `Devolución orden de pago: ${infoOrder?.tipo || ''} Número ${
    infoOrder?.nrodoc || ''
  }/${infoOrder?.prefijo || ''}`
  const { mutateAsync: rejectPaymentOrder, isPending: isPendingRejecting } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      url: `/apps-specific/contracts/reject-pay-order/${idProcess}`,
      method: 'POST',
      enabled: !!idProcess,
      onSuccess: () => {
        toast.success('Orden de pago devuelta con éxito')
        refetchTreasuriesList()
        paymentOrderStates?.handleShow()
        queryClient.invalidateQueries([`/applications/treasury`])
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error)
      },
    })
  const inputs = [
    {
      label: 'Comentario',
      name: 'comment',
      required: true,
      space: 12,
      minRows: 3,
      multiline: true,
    },
  ]

  const onSubmit = (data) => {
    rejectPaymentOrder({ body: { comment: data?.comment } })
  }
  return (
    <>
      <BackdropLoading loading={isPendingRejecting} />
      <Box
        p={2}
        bgcolor='backgroundGrey2'
        alignItems='center'
        borderRadius='0.3rem'
        boxShadow='0 2px 3px 0px rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
      >
        <Typography
          color='primary'
          variant='h6'
        >
          {messageReject}
        </Typography>
      </Box>
      <Box
        bgcolor='backgroundGrey1'
        p={5}
      >
        <Box
          component='form'
          onSubmit={form.handleSubmit(onSubmit)}
          gap={5}
          p={5}
          bgcolor='backgroundWhite1'
          justifyContent='space-between'
          alignItems='center'
          borderRadius='0.3rem'
          boxShadow='0 2px 3px 0px rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
        >
          <GenericForm
            inputs={inputs}
            control={form.control}
          />
          <Box
            width='100%'
            display='flex'
            justifyContent='flex-end'
            pt={4}
          >
            <Button
              variant='contained'
              type='submit'
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PaymentOrder
