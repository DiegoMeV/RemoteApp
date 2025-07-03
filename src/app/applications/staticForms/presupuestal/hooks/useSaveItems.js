import { useCallback } from 'react'
import toast from 'react-hot-toast'

const useSaveItems = ({ pushDataForm, nit_compania }) => {
  const saveItems = useCallback(
    async ({ items, setItems, blockId, mapData, getId, extraFilter = () => true }) => {
      const errors = []
      const newValues = (items ?? []).filter((item) => item.isNew && extraFilter(item))

      for (const item of newValues) {
        try {
          const mappedData = await mapData(item)
          const body = {
            blockId,
            data: {
              nit_compania,
              ...mappedData,
            },
          }

          await pushDataForm({ body, methodBody: 'POST' })

          const itemId = getId(item)
          setItems((prev) =>
            prev.map((row) => (getId(row) === itemId ? { ...row, isNew: false } : row))
          )
        } catch (error) {
          errors.push({
            item,
            error: error?.message || error,
          })
        }
      }

      if (errors.length > 0) {
        toast.error(`Fallaron ${errors.length} registros.`)
        console.error('Errores al guardar:', errors)
      } else {
        toast.success('Todos los registros se guardaron correctamente.')
      }
    },
    [pushDataForm, nit_compania]
  )

  return { saveItems }
}

export default useSaveItems
