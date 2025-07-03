export const getRowClassName = (dark, params) => {
  return params?.indexRelativeToCurrentPage % 2 !== 0 ? '' : dark ? 'colorRowDarkMode' : 'gray-row' // Asigna la clase CSS solo a las filas impares
}

export const resizeColumns = async (apiRef, loading, outliersFactor = 1) => {
  if (!loading) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
    apiRef?.current?.autosizeColumns?.({
      includeOutliers: true,
      includeHeaders: true,
      outliersFactor,
    })
  }
}

export const getRowClassNameCT = (dark, index, params) => {
  return params?.idTaskReturning || params?.hasPrevNotifs
    ? 'warningRow'
    : index % 2 !== 0
    ? 'backgroundwhite1'
    : dark
    ? 'colorRowDarkMode'
    : 'gray-row'
}
