import { useRuntimeSubmitActions } from '@/libV4'

const usePushDataForm = ({ formComponent }) => {
  const { submitRuntime, loadingSubmit } = useRuntimeSubmitActions({ keyName: formComponent })
  return { pushDataForm: submitRuntime, isPendingPushDataForm: loadingSubmit }
}

export default usePushDataForm
