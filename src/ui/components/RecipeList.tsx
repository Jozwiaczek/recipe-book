import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FormRecipe, IRecipe, RecipeService} from '../../services/RecipeService';
import {RecipeCreateModal} from './RecipeCreateModal';
import {Add} from '@styled-icons/material';
import {IconButton} from '../elements/buttons/IconButton';
import {List} from '../elements/list/List';

export const RecipeList: React.FC = () => {
  const [isCreateModal, setCreateModal] = useState<boolean>(false);
  const recipeService = new RecipeService();
  const [recipes, setRecipes] = useState<Array<IRecipe>>(recipeService.getRecipes());
  const [refresh, setRefresh] = React.useState<boolean>(false);

  useEffect(() => {
    setRecipes(recipeService.getRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const openCreateRecipe = () => {
    setCreateModal(true);
  };

  const closeCreateRecipe = () => {
    setCreateModal(false);
  };

  const onSubmit = (recipe: FormRecipe) => {
    console.log('test');
    recipeService.createRecipe(recipe);
    setRefresh(prev => !prev);
  };

  const removeRecipe = (recipeId: string) => {
    recipeService.removeRecipe(recipeId);
    setRefresh(prev => !prev);
  };

  return (
    <>
      <Blur isBlurred={isCreateModal}>
        <ActionsSection>
          <IconButton color='primary' onClick={openCreateRecipe}>
            <Add size="24"/>
            Create recipe
          </IconButton>
        </ActionsSection>
        <List title='Recipes' recipes={recipes} removeRecipe={removeRecipe}/>
      </Blur>
      <RecipeCreateModal isVisible={isCreateModal} closeModal={closeCreateRecipe} onSubmit={onSubmit}/>
    </>
  );
};

const ActionsSection = styled.div`
   display: flex;
   justify-content: flex-end;
   align-content: center;
   width: 100%;
   padding: 20px 40px 0 20px;
`;

interface BlurProps {
  isBlurred: boolean;
}

const Blur = styled.div<BlurProps>`
  filter: ${({isBlurred}) => isBlurred ? 'blur(2px) grayscale(30%)' : 'none'};
  pointer-events: ${({isBlurred}) => isBlurred ? 'none' : 'initial'};
  transition: all 0.05s ease-in-out;
`;
