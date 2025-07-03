export const sxHoverColor = (hoverColor) => {
  if (hoverColor) {
    return {
      '&:hover': {
        color: hoverColor,
      },
    }
  }
  return
}
