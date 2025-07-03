import { IconButton, Tooltip } from "@mui/material";
import { sxHoverColor } from "./styles/sxFunctions";

const ClassicIconButton = ({
  children,
  onClick,
  title,
  placement,
  color,
  hoverColor,
  disabled,
  sx,
  type,
}) => {
  return (
    <Tooltip
      arrow
      type={type}
      placement={placement ?? "top"}
      title={title ?? ""}
    >
      <IconButton
        type={type}
        color={color ?? "primary"}
        disabled={disabled ?? false}
        onClick={onClick}
        sx={{ ...sxHoverColor(hoverColor), ...sx }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
export default ClassicIconButton;
