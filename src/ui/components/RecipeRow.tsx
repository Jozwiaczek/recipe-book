import React, {FC} from 'react';
import {IconButton} from '../elements/buttons/IconButton';
import {DeleteForever, Edit, ExpandLess, KeyboardArrowDown} from '@styled-icons/material';
import {IFormRecipe, IRecipe} from '../../services/RecipeService';
import {styled} from '../elements/layout/Theme';
import useMediaQuery from '../../hooks/useMediaQuery';
import {IShowToast, ToastConsumer} from '../elements/Toast';

interface TableRowProps {
  recipe: IRecipe;
  removeRecipe: (recipeId: string) => void;
  openEditRecipe: (recipe: IFormRecipe) => void;
}

interface IDeleteIconButton {
  showToast: IShowToast|undefined;
}

export const RecipeRow: FC<TableRowProps> = ({removeRecipe, recipe, openEditRecipe}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const {isMobile} = useMediaQuery();

  const onExpandButtonClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsOpen(prevState => !prevState);
  };

  const onRemoveButtonClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    removeRecipe(recipe.id);
  };

  const onEditButtonClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    openEditRecipe(recipe);
  };

  const DeleteIconButton: FC<IDeleteIconButton> = ({showToast}) => {
    const remove = (e: React.MouseEvent): void => {
      onRemoveButtonClick(e);
      showToast && showToast('Recipe removed!', 'success');
    };

    if (isMobile) {
      return (
        <DeleteForever onClick={remove} color={'#dc004e'} size='32'/>
      );
    }
    return (
      <IconButton color='secondary' onClick={remove}>
        <DeleteForever size='22'/>
        &nbsp;Remove
      </IconButton>
    );
  };

  const EditIconButton: FC = () => {
    const edit = (e: React.MouseEvent): void => {
      onEditButtonClick(e);
    };

    if (isMobile) {
      return (
        <Edit onClick={edit} color={'#1976d2'} size='32'/>
      );
    }
    return (
      <IconButton color='primary' onClick={edit}>
        <Edit size='22'/>
          &nbsp;Edit
      </IconButton>
    );
  };

  return (
    <ToastConsumer>
      {({showToast}) =>
        <>
          <Row open={isOpen} onClick={onExpandButtonClick}>
            <ExpandButtonCell>
              {isOpen
                ? <ArrowUpIcon size='24'/>
                : <ArrowDownIcon size='24'/>
              }
            </ExpandButtonCell>

            <Cell>
              {recipe.title}
            </Cell>

            {!isMobile &&
        <Cell>
          {new Date(recipe.updatedAt).toLocaleDateString()}
        </Cell>
            }

            {!isMobile &&
        <Cell>
          {new Date(recipe.createdAt).toLocaleDateString()}
        </Cell>
            }

            <ActionsCell>
              <EditIconButton/>
              <DeleteIconButton showToast={showToast}/>
            </ActionsCell>
          </Row>

          <CollapseRow open={isOpen}>
            <CollapseCell colSpan={5}>
              <IngredientsListTitle>Ingredients</IngredientsListTitle>
              <IngredientsList>
                { recipe.ingredients?.length > 0
                  ? recipe.ingredients.map((ingredient, key) => (
                    <li key={key}>{ingredient.name}</li>
                  ))
                  : <p>This recipe doesn&rsquo;t have any ingredients</p>
                }
              </IngredientsList>
            </CollapseCell>
          </CollapseRow>
        </>
      }
    </ToastConsumer>
  );
};

const IngredientsListTitle = styled.p`
  font-weight: 500;
`;

const IngredientsList = styled.ul`
  padding-left: 20px;
`;

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

const ActionsCell = styled(Cell)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 300px;
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
