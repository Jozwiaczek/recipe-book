import {styled} from '../layout/Theme';

interface IButton {
  color?: string;
}

export const Button = styled.button<IButton>`
  position: relative;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  background-color: ${props => props.color !== 'primary' ? props.theme.palette.secondary.main : props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
  box-sizing: border-box;
  padding: 7px 14px;
  margin: 0;
  text-align: center;
  outline: none;
  border: none;
  min-width: 64px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  word-spacing: 0;
  overflow: hidden;
  transition: 0.15s;
  
  &:disabled {
    background-color: ${props => props.theme.palette.action.disabledBackground};
    color: ${props => props.theme.palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
    
    &:hover, &:active {
      background-color: ${props => props.theme.palette.action.disabledBackground};
      box-shadow: none;
    }
    
    :active::after {
      opacity: 1;
      transform: none;
      transition: none;
  }
  }
  
  &:hover, &:active {
    background-color: ${props => props.color !== 'primary' ? props.theme.palette.secondary.dark : props.theme.palette.primary.dark};
    box-shadow: rgba(50, 50, 93, 0.11) 0 4px 6px, rgba(0, 0, 0, 0.08) 0 1px 3px;
  }
  
  &:focus {
    outline: 0;
  }
  
  // Overlay
  ::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  ::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    padding: 50%;
    width: 32px;
    height: 32px;
    background-color: #fff;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
    transition: opacity 1s, transform 0.5s;
  }
    
  :active::after {
    opacity: 0.32;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0s;
  }
`;
