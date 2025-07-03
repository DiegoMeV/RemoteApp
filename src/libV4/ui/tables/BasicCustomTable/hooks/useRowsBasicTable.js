import { isEmpty } from '@/libV4/funcs'
import { useMemo, useState } from 'react'

const useRowsBasicTable = (externalRows, columns) => {
  const defaultOrder = columns?.find((column) => !isEmpty(column.defaultSortOrder))

  const [order, setOrder] = useState(defaultOrder?.defaultSortOrder ?? 'none') // 'asc' | 'desc' | 'none'
  const [orderBy, setOrderBy] = useState(defaultOrder?.field ?? null)
  const [filters, setFilters] = useState({}) // Estado para los filtros
  const rows = useMemo(() => externalRows, [externalRows])

  // Handle sorting
  const handleSort = (property) => {
    if (orderBy !== property) {
      setOrder('asc')
      setOrderBy(property)
    } else {
      if (order === 'asc') setOrder('desc')
      else if (order === 'desc') {
        setOrder('none')
        setOrderBy(null)
      } else {
        setOrder('asc')
      }
    }
  }

  const handleFilter = (field, value) => {
    setFilters((prevFilters) => {
      const currentValue = prevFilters[field]
      if (currentValue && currentValue.includes(value)) {
        const newValue = currentValue.filter((filterValue) => filterValue !== value)
        return {
          ...prevFilters,
          [field]: newValue?.length > 0 ? newValue : undefined,
        }
      }

      return {
        ...prevFilters,
        [field]: [...(currentValue || []), value],
      }
    })
  }

  // Filtrar las filas según los filtros seleccionados
  const filteredRows = useMemo(() => {
    return isEmpty(filters)
      ? rows
      : rows.filter((row) =>
          columns.every((column) => {
            // Si la columna no tiene filtros o no hay filtros activos para esta columna, pasa
            if (!column.filters || !filters[column.field]) return true

            // Aplicar el filtro para esta columna (OR lógico entre los valores seleccionados)
            const selectedFilters = filters[column.field]
            return selectedFilters.some((filterValue) => column.onFilter(filterValue, row))
          })
        )
  }, [rows, columns, filters])

  // Ordenar las filas según el orden actual
  const sortedRows = useMemo(() => {
    if (order === 'none' || !orderBy) return filteredRows

    return [...filteredRows].sort((a, b) => {
      const aValue = a[orderBy]
      const bValue = b[orderBy]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return order === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
    })
  }, [order, orderBy, filteredRows])

  return {
    sortedRows,
    order,
    orderBy,
    filters,
    handleSort,
    handleFilter,
  }
}

export default useRowsBasicTable
