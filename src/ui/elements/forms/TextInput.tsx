import React from 'react';
import {FieldRenderProps} from 'react-final-form';
import {styled} from '../layout/Theme';

type Props = FieldRenderProps<string>;

const TextInput: React.FC<Props> = ({input, meta, ...rest}) => {
  const {placeholder} = rest;
  return (
    <InputGroup isError={meta.touched && meta.error}>
      <input type="input" {...input} {...rest}/>
      <label>{placeholder}</label>
      <span>{meta.touched ? meta.error : ''}</span>
    </InputGroup>
  );
};

export default TextInput;

interface InputGroupProps {
  isError: boolean;
}

const InputGroup = styled.div<InputGroupProps>`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  
  label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: ${props => props.isError ? props.theme.palette.error.main : props.theme.palette.text.secondary};
      pointer-events:none;
  }
  
  input {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid ${props => props.isError ? props.theme.palette.error.main : props.theme.palette.text.secondary};
      outline: 0;
      font-size: 1.3rem;
      color: ${props => props.theme.palette.text.primary};;
      padding: 7px 0;
      background: transparent;
      transition: border-color 0.2s;
      pointer-events:auto;
    
      &::placeholder {
        color: transparent;
      }
      
      &:required,&:invalid { 
        box-shadow:none; 
      }
     
      :focus {
        border-image: linear-gradient(
          to right, 
          ${props => props.theme.palette.primary.main},
          ${props => props.theme.palette.primary.light}
        ) 1;
      }
  }
  
  span {
    position: absolute;
    top: 60px;
    font-weight: 400;
    display: block;
    color: ${props => props.theme.palette.error.main};
  }
  
  & input:placeholder-shown + label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
  
  & input:focus + label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${props => props.theme.palette.primary.main};
    font-weight:700; 
  }    
`;
