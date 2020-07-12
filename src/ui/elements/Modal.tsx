import React, {ReactNode, useEffect, useCallback, FC} from 'react';
import {createPortal} from 'react-dom';
import {Close} from '@styled-icons/material';
import {styled} from './layout/Theme';

export interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  children: ReactNode;
  inProgress?: boolean;
  className?: string;
  dataTestId?: string;
}

export const Modal: FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  dataTestId = 'modal'
}) => {
  const listenKeyboard = useCallback((event: KeyboardEvent) => {
    if (!!onClose && (event.key === 'Escape' || event.keyCode === 27)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', listenKeyboard, true);
      return () => {
        window.removeEventListener('keydown', listenKeyboard, true);
      };
    }
  }, [isVisible, listenKeyboard]);

  if (isVisible) {
    return createPortal(
      <ModalView data-testid={dataTestId}>
        <ModalOverlay onClick={onClose}/>
        <ModalBodyWrapper>
          <ModalBody>
            {onClose && <CloseButton onClick={onClose} size='36'/>}
            {children}
          </ModalBody>
        </ModalBodyWrapper>
      </ModalView>,
      document.body
    );
  } else return null;

};

const ModalView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 8000;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(147,147,147,0.4);
  opacity: 0.4;
`;

const ModalBodyWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 100%;
  padding: 0 30px 30px 30px;
  max-height: 100%;
  overflow-y: auto;
`;

const ModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 30px;
  background: #FFFFFF;
  border-radius: ${props => props.theme.sizes.borderRadius};
  box-shadow: 0 -2px 25px 0 rgba(0, 0, 0, 0.05), 0 13px 25px 0 rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled(Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease-in-out;
  
  &:hover, &:active {
    color: ${props => props.theme.palette.primary.main};
  }
`;
