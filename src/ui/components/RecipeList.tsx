import React, {useEffect, useState} from 'react';
import {IFormRecipe, IRecipe, RecipeService} from '../../services/RecipeService';
import {Add} from '@styled-icons/material';
import {IconButton} from '../elements/buttons/IconButton';
import {List} from '../elements/list/List';
import {RecipeModal} from './RecipeModal';
import useMediaQuery from '../../hooks/useMediaQuery';
import {styled} from '../elements/layout/Theme';

const preHeaders = [
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Updated At',
    value: 'updatedAt'
  },
  {
    name: 'Created At',
    value: 'createdAt'
  },
  {
    name: 'Actions',
    value: 'actions'
  }
];

export const RecipeList: React.FC = () => {
  const recipeService = new RecipeService();
  const [isCreateModalVisible, setCreateModal] = useState<boolean>(false);
  const [isEditModalVisible, setEditModal] = useState<boolean>(false);
  const [currentlyEditedRecipe, setEditedRecipe] = useState<Partial<IFormRecipe> | undefined>();
  const [recipes, setRecipes] = useState<Array<IRecipe>>(recipeService.getRecipes());
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [headers, setHeaders] = React.useState(preHeaders);
  const {isMobile} = useMediaQuery();

  useEffect(() => {
    setRecipes(recipeService.getRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (isMobile) {
      setHeaders(preHeaders.filter(header => header.value !== 'updatedAt' && header.value !== 'createdAt'));
    } else {
      setHeaders(preHeaders);
    }
  }, [isMobile]);

  const openEditRecipe = (recipe: IFormRecipe): void => {
    setEditedRecipe(recipe);
    setEditModal(true);
  };

  const onCloseEditRecipe = (): void => {
    setEditModal(false);
    setEditedRecipe(undefined);
  };

  const onEditRecipe = (recipe: IFormRecipe): void => {
    recipeService.editRecipe(recipe);
    setRefresh(prev => !prev);
  };

  const openCreateRecipe = (): void => {
    setCreateModal(true);
  };

  const onCloseCreateRecipe = (): void => {
    setCreateModal(false);
  };

  const onCreateRecipe = (recipe: IFormRecipe): void => {
    recipeService.createRecipe(recipe);
    setRefresh(prev => !prev);
  };

  const removeRecipe = (recipeId: string): void => {
    recipeService.removeRecipe(recipeId);
    setRefresh(prev => !prev);
  };

  const CreateButton = () =>
    <IconButton color='primary' onClick={openCreateRecipe}>
      <Add size='24'/>
        Create recipe
    </IconButton>;

  return (
    <>
      <Blur isBlurred={isCreateModalVisible}>
        {
          recipes.length > 0
            ? <>
              <ActionsSection>
                <CreateButton/>
              </ActionsSection>
              <List
                title='Recipes'
                headers={headers}
                recipes={recipes}
                removeRecipe={removeRecipe}
                openEditRecipe={openEditRecipe}
              />
            </>
            : <EmptyListContainer>
              <EmptyTitle>No results found</EmptyTitle>
              <CreateButton/>
            </EmptyListContainer>

        }
      </Blur>
      <RecipeModal
        formTitle='Create Recipe'
        closeModal={onCloseCreateRecipe}
        onSubmit={onCreateRecipe}
        isVisible={isCreateModalVisible}
      />
      <RecipeModal
        formTitle='Edit Recipe'
        closeModal={onCloseEditRecipe}
        onSubmit={onEditRecipe}
        isVisible={isEditModalVisible}
        initialValues={currentlyEditedRecipe}
      />
    </>
  );
};

const EmptyTitle = styled.p`
  margin-bottom: 30px;
  font-size: 3em;
  text-align: center;
`;

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
`;

const ActionsSection = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
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
