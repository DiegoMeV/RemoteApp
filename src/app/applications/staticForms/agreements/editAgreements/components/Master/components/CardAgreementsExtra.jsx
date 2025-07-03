import { BasicTitle, GenericForm } from '@/libV4'

const CardAgreementsExtra = ({
  form = {},
  title = '',
  inputs = [],
  classNameForm = '',
  classNameContainer = '',
} = {}) => {
  return (
    <section className={`w-full ${classNameContainer}`}>
      <BasicTitle title={title} />
      <div className={`general_form_container p-3 ${classNameForm}`}>
        <GenericForm
          control={form?.control}
          inputs={inputs}
        />
      </div>
    </section>
  )
}

export default CardAgreementsExtra
