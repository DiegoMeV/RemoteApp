import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'

export const useProcessAllInfo = ({ activeStep }) => {
  const userData = useStoreState((state) => state.user.userData || [])
  const defaultValue = userData?.dependencies.length === 1 ? userData?.dependencies[0] : null
  const [errorInfo, setErrorInfo] = useState(null)
  const [idSelected, setIdSelected] = useState(null)
  const [infoProcess, setInfoProcess] = useState({
    dependenciesSelected: defaultValue,
    processSelected: null,
    descriptionProcess: null,
  })

  const [basicDataProcess, setBasicDataProcess] = useState(null)
  useEffect(() => {
    setInfoProcess({ ...infoProcess, processSelected: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSelected])

  useEffect(() => {
    if (
      infoProcess.dependenciesSelected &&
      infoProcess.processSelected &&
      idSelected &&
      activeStep === 0
    ) {
      setErrorInfo(false)
    }
    if (basicDataProcess && activeStep === 1) {
      setErrorInfo(false)
    }
  }, [idSelected, infoProcess, activeStep, basicDataProcess])
  useEffect(() => {
    if (infoProcess.processSelected?.typeSpecs?.additionalData?.length > 0) {
      setBasicDataProcess(
        infoProcess.processSelected.typeSpecs.additionalData.map((data) => ({
          name: data.name,
          value: '',
          required: data.isRequired,
        }))
      )
    }
  }, [infoProcess.processSelected])
  const statesVariables = {
    errorInfo,
    idSelected,
    infoProcess,
    basicDataProcess,
  }
  const statesFunctions = {
    setIdSelected,
    setInfoProcess,
    setBasicDataProcess,
    setErrorInfo,
  }
  return [statesVariables, statesFunctions]
}
export default useProcessAllInfo
