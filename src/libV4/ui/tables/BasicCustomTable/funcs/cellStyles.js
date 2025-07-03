export const cellSyles = (column, rowHeight) => {
  const heighCell = rowHeight
    ? {
        height: rowHeight,
        p: 2,
      }
    : {}

  return {
    position: column?.pinned ? 'sticky' : '',
    left: column?.pinned === 'left' ? column?.left : null,
    right: column?.pinned === 'right' ? column?.right : null,
    zIndex: column?.pinned ? 1 : null,
    width: column?.width,
    display: column?.hidden ? 'none' : '',
    ...heighCell,
  }
}
