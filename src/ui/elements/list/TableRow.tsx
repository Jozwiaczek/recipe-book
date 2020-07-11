import React, {FC} from 'react';
import {IconButton} from '../buttons/IconButton';
import {DeleteForever, ExpandLess, KeyboardArrowDown} from '@styled-icons/material';
import {IRecipe} from '../../../services/RecipeService';
import {styled} from '../layout/Theme';

interface TableRowProps {
  recipe: IRecipe;
  removeRecipe: (recipeId: string) => void;
}

export const TableRow: FC<TableRowProps> = ({removeRecipe, recipe}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <Row open={isOpen}>
        <ExpandButtonCell>
          {isOpen
            ? <ArrowUpIcon onClick={() => setIsOpen(prevState => !prevState)} size='24'/>
            : <ArrowDownIcon onClick={() => setIsOpen(prevState => !prevState)} size='24'/>
          }
        </ExpandButtonCell>

        <Cell>
          {recipe.title}
        </Cell>

        <Cell>
          {new Date(recipe.updatedAt).toLocaleDateString()}
        </Cell>

        <Cell>
          {new Date(recipe.createdAt).toLocaleDateString()}
        </Cell>

        <Cell>
          <IconButton color='secondary' onClick={() => removeRecipe(recipe.id)}>
            <DeleteForever size='24'/>
            Remove
          </IconButton>
        </Cell>
      </Row>

      <CollapseRow open={isOpen}>
        <CollapseCell colSpan={5}>
          {recipe.ingredients?.map((ingredient, key) => (
            <p key={key}>{ingredient.name}</p>
          ))}
        </CollapseCell>
      </CollapseRow>
    </>
  );
};

interface IRow {
  open?: boolean;
}

export const Row = styled.tr<IRow>`
  text-align: left;
  border-bottom: 1px solid ${props => props.open ? 'transparent' : props.theme.palette.divider};
  line-height: 0.1rem;
  transition: all 0.15s ease-in-out;
`;

const Cell = styled.td`
  height: 60px;
  padding-left: 20px;
`;

const ExpandButtonCell = styled(Cell)`
  width: 10px;
`;

const CollapseCell = styled.td`
  height: 60px;
  padding-left: 60px;
`;

const CollapseRow = styled(Row)<IRow>`
    visibility: ${props => !props.open && 'collapse'};
    line-height: ${props => props.open ? '2' : 0};
    transition: visibility 0.2s ease-in-out;
    border-bottom: 1px solid ${props => props.theme.palette.divider};
`;

const ArrowDownIcon = styled(KeyboardArrowDown)`
  cursor: pointer;
  transition: color 0.15s ease-in-out;
  color: ${props => props.theme.palette.action.active};
  
  &:hover, &:active {
    color: ${props => props.theme.palette.primary.main};
  }
`;

const ArrowUpIcon = styled(ExpandLess)`
  cursor: pointer;
  transition: color 0.15s ease-in-out;
  color: ${props => props.theme.palette.action.active};
  
  &:hover, &:active {
    color: ${props => props.theme.palette.primary.main};
  }
`;
