import { ValueListGlobal } from '@/lib'
import { GenericForm } from '@/libV4'
import { useReceptionInputs } from '@/pages/pqrsdf/registry/registryTypeProcess/components/step3/hooks'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const ViewStep2 = ({ form }) => {
  const { receptionData, errorLovs, arrayModals } = useReceptionInputs({ form })
  useEffect(() => {
    if (errorLovs) {
      toast.error(`Error in LOVs : ${errorLovs}`)
    }
  }, [errorLovs])
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)

  return (
    <div className='backgroundwhite1 p-10 rounded-md min-h-[360px]'>
      <div className='grid grid-cols-12 gap-4 w-full'>
        <GenericForm
          inputs={receptionData}
          control={form?.control}
        />
        <ValueListGlobal
          {...infoModal}
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params?.row?.id)
          }}
          searchOptions={infoModal?.searchOptions}
        />
      </div>
    </div>
  )
}

export default ViewStep2
