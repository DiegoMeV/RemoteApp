import { Button, Typography } from "@mui/material";
import React from "react";

const ImageButton = ({ src, alt, ...props }) => {
  return (
    <Button
      {...props}
      variant={props.variant ?? "outlined"}
      size={props.size ?? "large"}
    >
      <img src={src ?? null} alt={alt} style={{ width: 20, height: 20 }} />
      <Typography
        whiteSpace="nowrap"
        textTransform="none"
        sx={{ fontSize: "0.7rem" }}
        ml={1}
      >
        {props?.text ?? ""}
      </Typography>
    </Button>
  );
};

export default ImageButton;
