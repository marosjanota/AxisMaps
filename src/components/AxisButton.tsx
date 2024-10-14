import React, { FC, ReactNode } from "react";
import { Button, ButtonProps as MUIButtonProps } from "@mui/material";

interface ButtonProps extends MUIButtonProps {
  onClickFunction: () => void;
  children: ReactNode;
}

const AxisButton: FC<ButtonProps> = ({
  onClickFunction,
  children,
  ...props
}) => {
  return (
    <Button {...props} variant="contained" onClick={onClickFunction}>
      {children}
    </Button>
  );
};

export default AxisButton;
