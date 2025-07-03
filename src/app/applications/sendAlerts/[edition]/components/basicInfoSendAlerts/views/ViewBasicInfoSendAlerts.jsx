import { CustomAccordion, ValueListGlobal } from '@/lib'
import { InputsBasicData } from '../components'

const ViewBasicInfoSendAlerts = ({ control, lovHierarchy, setValue, idEdition, lovModel }) => {
  return (
    <CustomAccordion
      defaultExpanded={true}
      title='Datos básicos'
      color='primary'
      backColor={'backgroundGrey2'}
    >
      <InputsBasicData
        control={control}
        lovHierarchy={lovHierarchy}
        lovModel={lovModel}
        setValue={setValue}
        idEdition={idEdition}
      />
      {lovHierarchy.open.show && (
        <ValueListGlobal
          title={'Dependencias'}
          openOptions={lovHierarchy?.open}
          rows={lovHierarchy?.data}
          loading={lovHierarchy?.loading}
          columns={lovHierarchy?.columns}
          selectedOption={lovHierarchy?.selectedOption}
          searchOptions={lovHierarchy?.searchOptions}
        />
      )}
      {lovModel.open.show && (
        <ValueListGlobal
          title={'Modelos'}
          openOptions={lovModel?.open}
          rows={lovModel?.data}
          loading={lovModel?.loading}
          columns={lovModel?.columns}
          selectedOption={lovModel?.selectedOption}
          searchOptions={lovModel?.searchOptions}
        />
      )}
    </CustomAccordion>
  )
}

export default ViewBasicInfoSendAlerts
