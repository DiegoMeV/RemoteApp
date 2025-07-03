export const getRowClassName = (dark, params) => {
  return params?.row?.idTaskReturning || params?.row?.hasPrevNotifs
    ? 'warningRow' // Color rojo para procesos que han sido devueltos
    : params?.indexRelativeToCurrentPage % 2 !== 0
    ? ''
    : dark === 'dark'
    ? 'colorRowDarkMode'
    : 'gray-row' // Asigna la clase CSS solo a las filas impares
}
