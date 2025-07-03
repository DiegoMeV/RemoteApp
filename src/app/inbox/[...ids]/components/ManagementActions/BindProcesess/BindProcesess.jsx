import { ElementContainer } from '@/libV4'
import ElementBindProcesess from './ElementBindProcesess'

const BindProcesess = ({ ids, idAction, elementData, idActivityAction, refetchElementActions }) => {
  return elementData?.map((element, index) => {
    return (
      <ElementContainer
        key={index}
        isRequired={element.isRequired}
        className='relative'
      >
        <ElementBindProcesess
          ids={ids}
          idAction={idAction}
          idActivityAction={idActivityAction}
          element={element}
          refetchElementActions={refetchElementActions}
        />
      </ElementContainer>
    )
  })
}

export default BindProcesess
