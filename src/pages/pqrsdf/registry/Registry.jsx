import { useState } from 'react'
import { ModalTerms, PqrsdfCard } from './components'
import { typeProcess } from './constants'
import { useBoolean } from '@/libV4'

const Registry = () => {
  const [modalInfo, setModalInfo] = useState({ keyName: '', checkState: false })
  const modalTerms = useBoolean(false)
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }
  const selectProcess = (keyName) => {
    setModalInfo({ keyName: keyName })
    modalTerms.handleShow()
  }

  return (
    <div className='py-20'>
      <h1 className='text-2xl font-bold text-slate-800 mb-2'>Radicar PQRSDF</h1>
      <p className='text-slate-600 mb-6'>Seleccione el tipo de comunicación que desea realizar</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start'>
        {typeProcess.map((option, index) => (
          <PqrsdfCard
            key={option.title}
            icon={option.icon}
            title={option.title}
            keyName={option.keyName}
            description={option.description}
            expanded={expandedIndex === index}
            onToggle={() => toggleExpand(index)}
            onClick={selectProcess}
          />
        ))}
      </div>
      <ModalTerms
        modalTerms={modalTerms}
        setModalInfo={setModalInfo}
        modalInfo={modalInfo}
      />
    </div>
  )
}

export default Registry
