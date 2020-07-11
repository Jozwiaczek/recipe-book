import React from 'react';
import {Button} from './Button';
import {styled} from './layout/Theme';

interface IconButtonProps {
  color?: string;
  onClick?: (event:React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

export const IconButton = ({color, onClick, children}: IconButtonProps) => {
  return (
    <Button color={color} onClick={onClick}>
      <ButtonContent>
        {children}
      </ButtonContent>
    </Button>
  );
};

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
