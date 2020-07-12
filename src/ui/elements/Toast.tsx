import React, {createContext, FC, useState} from 'react';
import styled, {keyframes} from 'styled-components';

export type ToastType = 'error' | 'warning' | 'success' | ''

export type IShowToast = (title: string, type: ToastType) => void

interface IToastContext {
  showToast?: IShowToast;
}

const ToastContext = createContext<IToastContext>({});

export const ToastConsumer = ToastContext.Consumer;

export const ToastProvider: FC = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = React.useState<string>();
  const [type, setType] = React.useState<ToastType>('');

  const showToast = (title: string, type: ToastType) => {
    if (!isOpen) {
      setTitle(title);
      setType(type);
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        setTitle('');
        setType('');
      }, 3000);
    }
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <ErrorNotification className={isOpen ? 'open' : ''} type={type}>
        {title}
      </ErrorNotification>
    </ToastContext.Provider>
  );
};

const fadein = keyframes`
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
`;

const fadeout = keyframes`
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
`;

interface IErrorNotification {
  type: ToastType;
}

const ErrorNotification = styled.div<IErrorNotification>`
  visibility: hidden;
  min-width: 200px;
  margin-left: -125px;
  background-color: ${props => {
    if (props.type === 'success') return '#4caf50';
    if (props.type === 'warning') return '#ff9800';
    if (props.type === 'error') return '#f44336';
    return '#585858';
  }};
  color: #fff;
  text-align: center;
  padding: 13px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  bottom: 30px;
  font-size: 1em;
  font-weight: 400;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12);
  
  &.open {
    visibility: visible;
    animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
  }
`;
