import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Table from '../elements/Table';
import TableHeader from '../elements/TableHeader';
import {Button} from '../elements/Button';
import {FormRecipe, IRecipe, RecipeService} from '../../services/RecipeService';
import {RecipeCreateModal} from './RecipeCreateModal';

const headers = [
  {
    name: 'Title',
    value: 'title',
    isSortEnabled: true,
  },
  {
    name: 'Updated At',
    value: 'updatedAt',
    isSortEnabled: true,
  },
  {
    name: 'Created At',
    value: 'createdAt',
    isSortEnabled: true,
  },
  {
    name: '',
    value: '',
    isSortEnabled: false,
  }
];

export const RecipeList: React.FC = (props) => {
  const [isCreateModal, setCreateModal] = useState<boolean>(false);
  const recipeService = new RecipeService();
  const [recipes, setRecipes] = useState<Array<IRecipe>>(recipeService.getRecipes());
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setRecipes(recipeService.getRecipes());
  }, [refresh]);

  const openCreateRecipe = () => {
    setCreateModal(true);
  };

  const closeCreateRecipe = () => {
    setCreateModal(false);
  };

  const onSubmit = (recipe: FormRecipe) => {
    recipeService.createRecipe(recipe);
    setRefresh(prev => !prev);
  };

  const removeRecipe = (recipeId: string) => {
    recipeService.removeRecipe(recipeId);
    setRefresh(prev => !prev);
  };

  // <tr key={key} onClick={() => history.push(`/edit/${recipe.id}`)}>

  return (
    <>
      <Blur isBlurred={isCreateModal}>
        <Table>
          <table>
            <TableHeader headers={headers}/>
            <tbody>
              {recipes.map((recipe, key: number) => (
                <>
                  <tr key={key}>
                    <td>
                      <button onClick={() => setIsOpen(prevState => !prevState)}>{isOpen ? 'Close' : 'Open'}</button>
                    </td>
                    <td>
                      {recipe.title}
                    </td>
                    <td>
                      {new Date(recipe.updatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Button color='secondary' onClick={() => removeRecipe(recipe.id)}>Remove</Button>
                    </td>
                  </tr>
                  <CollapseTr open={isOpen}>
                    <td>
                      {recipe.ingredients.map((ingredient, key) => (
                        <p key={key}>{ingredient.name}</p>
                      ))}
                      <button onClick={() => history.push(`/edit/${recipe.id}`)}>Edit</button>
                      <button style={{backgroundColor: 'red'}} onClick={() => removeRecipe(recipe.id)}>Remove</button>
                    </td>
                  </CollapseTr>
                </>
              ))}
            </tbody>
          </table>
        </Table>
        <ActionsSection>
          <Button color='primary' onClick={openCreateRecipe} {...props}>Create recipe</Button>
        </ActionsSection>
      </Blur>
      {isCreateModal && <RecipeCreateModal closeModal={closeCreateRecipe} onSubmit={onSubmit}/>}
    </>
  );
};

const ActionsSection = styled.div`
   display: flex;
   justify-content: center;
   align-content: center;
   width: 100%;
   margin: 30px 0;
`;

interface BlurProps {
  isBlurred: boolean;
}

const Blur = styled.div<BlurProps>`
  filter: ${({isBlurred}) => isBlurred ? 'blur(2px) grayscale(30%)' : 'none'};
  pointer-events: ${({isBlurred}) => isBlurred ? 'none' : 'initial'};
  transition: all 0.05s ease-in-out;
`;

interface ICollapseTr {
  open: boolean;
}

const CollapseTr = styled.tr<ICollapseTr>`
    visibility: ${props => !props.open && 'collapse'};
    line-height: ${props => props.open ? '5' : 0};
    transition: all 0.3s ease-in-out;
`;
