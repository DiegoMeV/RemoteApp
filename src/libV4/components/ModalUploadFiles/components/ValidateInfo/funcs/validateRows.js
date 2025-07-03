import { isDate, isDateString, isEmpty, toDayjsDate } from '@/lib'

export const validateRows = async (batchRows, columnsMatch, currentIndex) => {
  const errors = []

  const processBatch = async (batchRows, startIndex) => {
    columnsMatch.forEach(({ originCol, destCol }) => {
      const originColExists = batchRows.every(
        (row) => Object.keys(row).filter((key) => key === originCol).length === 1
      )
      if (originCol === undefined || originCol === null) {
        errors.push({
          id: crypto.randomUUID(),
          row: '999',
          column: originCol,
          message: `La columna ${destCol.keyName} no tuvo correspondencia para validación.`,
        })
        return
      }
      if (!originColExists) {
        errors.push({
          id: crypto.randomUUID(),
          row: '999',
          column: originCol,
          message: `Existe otra columna con el mismo nombre en el archivo.`,
        })
      }

      batchRows.forEach((row, rowIndex) => {
        const value = row[originCol]
        if (value === undefined) {
          return
        }

        // Validación de tipo 'date'
        if (destCol?.colSpecs?.type === 'date') {
          if (isDateString(value)) {
            row[originCol] = toDayjsDate(value).toISOString()
          } else if (isDate(value)) {
            row[originCol] = new Date(value).toISOString()
          } else {
            errors.push({
              id: crypto.randomUUID(),
              row: startIndex + rowIndex + 1,
              column: originCol,
              message: `El formato de fecha no es válido.`,
            })
            return
          }
        }

        // Validación tipo String
        else if (destCol?.colSpecs?.type === 'string' && value !== undefined) {
          try {
            row[originCol] = value.toString()
          } catch (error) {
            errors.push({
              id: crypto.randomUUID(),
              row: startIndex + rowIndex + 1,
              column: originCol,
              message: `El valor de la columna ${originCol} no se pudo convertir a string. (${error.message})`,
            })
            return
          }
        }

        // Validación de otros tipos
        else if (destCol?.colSpecs?.type && typeof value !== destCol.colSpecs.type) {
          errors.push({
            id: crypto.randomUUID(),
            row: startIndex + rowIndex + 1,
            column: originCol,
            message: `El tipo de dato de la columna ${originCol} llega como ${typeof value} y se esperaba ${
              destCol.colSpecs.type
            }.`,
          })
          return
        }

        // Validación personalizada
        if (!isEmpty(destCol?.colSpecs?.validation)) {
          try {
            const validationFunction = new Function('value', destCol.colSpecs.validation)
            const validationResult = validationFunction(value)
            if (isEmpty(value)) {
              row[originCol] = null
            } else if (validationResult !== true) {
              errors.push({
                id: crypto.randomUUID(),
                row: startIndex + rowIndex + 1,
                column: originCol,
                message: validationResult,
              })
              return
            }
          } catch (error) {
            errors.push({
              id: crypto.randomUUID(),
              row: startIndex + rowIndex + 1,
              column: originCol,
              message: `Error al ejecutar la validación para ${originCol}: ${error.message}`,
            })
          }
        }
      })
    })
  }

  await processBatch(batchRows, currentIndex) // Procesar el lote recibido directamente
  return errors
}
