export const sidebarButton = {
  border: (theme) =>
    theme.palette.mode === "dark"
      ? "solid 1px #757575"
      : "solid 2px rgba(0, 0, 0, 0.12)",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#424242" : "#f5f5f5",
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#272727" : "#DFDFDF",
  },
};
