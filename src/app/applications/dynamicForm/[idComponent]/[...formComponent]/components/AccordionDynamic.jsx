import { CustomAccordion } from '@/lib'
import Form from '../views/Form'
import { useState } from 'react'
import NewDataGridDynamic from '../views/NewDataGridDynamic'

const AccordionDynamic = ({
  block,
  isSuccess,
  isMasterDetail,
  endpointMutation,
  infoDataEdit,
  isEdit,
  companyNit,
  objetEdit,
  dataComponent,
  handleFormCompletion,
  isFieldEnabled,
  parentFormValues,
  setParentFormValues,
  idComponent,
  idApplications,
  typeModule,
  nit_compania,
  eventSubmit,
  form,
  dbOrigin,
  firstBlock,
  queryParamsPks,
  allParams,
}) => {
  const [isOPenBlock, setIsOPenBlock] = useState(
    (block?.isDefaultOpen || block?.isMaster || firstBlock) ?? false
  )
  const openBlock = () => {
    setIsOPenBlock(!isOPenBlock)
  }
  return (
    <CustomAccordion
      title={block?.title}
      defaultExpanded={isOPenBlock}
      onClickAccordion={openBlock}
      sx={{ display: block?.hidden ? 'none' : 'block' }}
    >
      {isOPenBlock && (
        <>
          {block?.type === 'FORM' ? (
            <Form
              dataBlock={block}
              isSuccess={isSuccess}
              isMasterDetail={isMasterDetail}
              endpointMutation={endpointMutation}
              infoDataEdit={infoDataEdit}
              isEdit={isEdit}
              companyNit={companyNit}
              objetEdit={objetEdit}
              dataComponent={dataComponent}
              handleFormCompletion={handleFormCompletion}
              isFieldEnabled={isFieldEnabled}
              parentFormValues={parentFormValues}
              setParentFormValues={setParentFormValues}
              idComponent={idComponent}
              idApplications={idApplications}
              typeModule={typeModule}
              nit_compania={nit_compania}
              eventSubmit={eventSubmit}
              form={form}
              dbOrigin={dbOrigin}
            />
          ) : (
            <NewDataGridDynamic
              block={block}
              idForm={idComponent}
              idApplication={idApplications}
              form={form}
              queryParamsPks={queryParamsPks}
              queryParams={allParams}
              companyId
              formComponent
              /* nit_compania,
              dataBlock={block}
              endpointMutation={endpointMutation}
              isSuccess={isSuccess}
              isMasterDetail={isMasterDetail}
              infoDataEdit={infoDataEdit}
              isEdit={isEdit}
              companyNit={companyNit}
              objetEdit={objetEdit}
              dataComponent={dataComponent}
              handleFormCompletion={handleFormCompletion}
              isFieldEnabled={isFieldEnabled}
              idComponent={idComponent}
              parentFormValues={parentFormValues}
              setParentFormValues={setParentFormValues}
              nit_compania={nit_compania}
              eventSubmit={eventSubmit}
              form={form}
              dbOrigin={dbOrigin} */
            />
          )}
        </>
      )}
    </CustomAccordion>
  )
}

export default AccordionDynamic
