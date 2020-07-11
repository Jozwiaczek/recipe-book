import React, {FC} from 'react';
import styled from 'styled-components';
import {Field} from 'react-final-form';
import TextInput from './TextInput';
import {Add, DeleteForever} from '@styled-icons/material';

interface IngredientFieldProps {
  index: number;
  name: string;
  removeItem: () => void;
  addItem: () => void;
  itemsSize?: number;
}

const required = (value: string|undefined) => (value ? undefined : 'Required');

export const IngredientField: FC<IngredientFieldProps> = ({index, name, removeItem, addItem, itemsSize}) => {
  return (
    <Wrapper>
      <Field<string>
        name={`${name}.name`}
        validate={required}
        component={TextInput}
        placeholder={`Ingredient #${index}`}
      />
      <ActionButtons>
        <DeleteButton onClick={removeItem} size='32'/>
        {index === itemsSize && <AddButton onClick={addItem} size='32'/>}
      </ActionButtons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ActionButtons = styled.div`
  width: 40%;
  padding: 0 15px 0 10px;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled(Add)`
  cursor: pointer;
  color: ${props => props.theme.palette.primary.main};
`;

const DeleteButton = styled(DeleteForever)`
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
`;
