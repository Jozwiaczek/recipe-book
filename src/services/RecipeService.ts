import uniqid from 'uniqid';

export interface IIngredient {
  name: string;
}

export interface IRecipe {
  id: string;
  title: string;
  ingredients: Array<IIngredient>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFormRecipe {
  id?: string;
  title: string;
  ingredients: Array<IIngredient>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RecipeService {

  getRecipes() : Array<IRecipe> {
    const storedRecipe = localStorage.getItem('recipes');
    if (!storedRecipe) {
      localStorage.setItem('recipes', JSON.stringify([]));
      return [];
    }
    return JSON.parse(storedRecipe);
  }

  getRecipe(recipeId: string): IRecipe {
    const recipes = this.getRecipes();
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    if (!recipe) {
      throw new Error('No specific recipe stored');
    }
    return recipe;
  }

  editRecipe(recipe: IFormRecipe): IRecipe {
    const recipes = this.getRecipes();

    let isChanged = false;
    const changedRecipes = recipes.map(storedRecipe => {
      if (storedRecipe.id === recipe.id) {
        if (JSON.stringify(storedRecipe) === JSON.stringify(recipe)) {
          throw new Error('There is no any changes');
        }
        recipe.updatedAt = new Date();
        isChanged = true;
        return recipe;
      }
      return storedRecipe;
    });

    if (!isChanged) {
      throw new Error('No specific recipe stored');
    }

    localStorage.setItem('recipes', JSON.stringify(changedRecipes));
    return recipe as IRecipe;
  }

  removeRecipe(recipeId: string): void {
    const recipes = this.getRecipes();
    const newRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  }

  createRecipe(recipe: IFormRecipe): IRecipe {
    const recipes = this.getRecipes();

    recipes.map(storedRecipe => {
      if (storedRecipe.title === recipe.title) {
        throw new Error('Recipe with equal title already exists');
      }
    });

    recipe.id = uniqid('', recipe.title);
    recipe.createdAt = new Date();
    recipe.updatedAt = new Date();

    recipes.push(recipe as IRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return recipe as IRecipe;
  }
}
