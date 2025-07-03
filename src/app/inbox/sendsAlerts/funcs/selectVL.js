export const selectVL = (modals) => {
  return modals?.find((modal) => !!modal.openOptions.show)
}
