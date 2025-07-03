export const selectLabel = (typeItem) => {
  switch (typeItem) {
    case 'formComponent':
      return 'Componente'
    case 'listComponent':
      return 'Listas'
    case 'menuBuilder':
      return 'Menú'
    default:
      return ''
  }
}
