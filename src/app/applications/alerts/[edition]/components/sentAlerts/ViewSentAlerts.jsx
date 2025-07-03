import { DynamicTableAlert } from '@/app/applications/components'
import { CustomAccordion } from '@/lib'
import React from 'react'

const ViewSentAlerts = ({
  handleOpenUploadFileAcc,
  uploadFileAccState,
  isLoading,
  columns,
  alertsSent,
}) => {
  return (
    <CustomAccordion
      title='Envíos de la alerta'
      color='primary'
      expandedValue={uploadFileAccState}
      onClickAccordion={handleOpenUploadFileAcc}
    >
      <DynamicTableAlert
        loading={isLoading}
        columns={columns}
        rows={alertsSent?.data || []}
      />
    </CustomAccordion>
  )
}

export default ViewSentAlerts
