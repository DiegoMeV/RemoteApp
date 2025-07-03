import { GenericForm } from '@/libV4'
import { useReceptionInputs } from './hooks'
import { ValueListGlobal } from '@/lib'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const ReceptionData = ({ form }) => {
  // Definitions
  const { receptionData, errorLovs, arrayModals } = useReceptionInputs({ form })
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)
  // Error handling
  useEffect(() => {
    if (errorLovs) {
      toast.error(`Error in LOVs : ${errorLovs}`)
    }
  }, [errorLovs])
  return (
    <div className='px-8 w-full'>
      <div className='grid grid-cols-12 gap-4 w-full'>
        <GenericForm
          control={form.control}
          inputs={receptionData}
        />
        <ValueListGlobal
          {...infoModal}
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params.row)
          }}
          searchOptions={infoModal?.searchOptions}
        />
      </div>
    </div>
  )
}

export default ReceptionData
