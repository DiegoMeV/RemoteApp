import { CustomAccordion, useListBlocksInfo } from '@/lib'
import VariablesTableBlock from './VariablesTableBlock'
import { useState } from 'react'

const DatablocksAcordions = ({ idEdition }) => {
  const { data: blocksData, isLoading, isError } = useListBlocksInfo()
  const [openAccordion, setOpenAccordion] = useState(null)
  return (
    <>
      {isLoading
        ? 'Cargando bloques...'
        : isError
        ? 'Error al traer los bloques de datos'
        : blocksData?.data?.map((item) => (
            <CustomAccordion
              title={item.nombre}
              key={item.id}
              expandedValue={openAccordion === item.id}
              onClickAccordion={() =>
                setOpenAccordion((prev) => (prev === item.id ? null : item.id))
              }
            >
              <VariablesTableBlock
                idBlock={item.id}
                idEdition={idEdition}
              />
            </CustomAccordion>
          ))}
    </>
  )
}

export default DatablocksAcordions
