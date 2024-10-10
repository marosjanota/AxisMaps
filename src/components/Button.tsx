import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { Button } from '@mui/material';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClickFunction: () => void;
  children: ReactNode;
}

const AxisButton: FC<ButtonProps> = ({onClickFunction, children, ...props}) =>  {
    return (
        <Button {...props} variant="contained" onClick={onClickFunction}>
            {children}
        </Button>
    );
};

export default AxisButton;