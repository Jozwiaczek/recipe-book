import {expect} from 'chai';
import {IRecipe, RecipeService} from '../src/services/RecipeService';
import {recipesConstants} from './helpers/recipeConstants';

describe('Recipe Service', function () {
  let recipeService: RecipeService;

  beforeEach(() => {
    recipeService = new RecipeService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Get Many', () => {
    it('returns empty array of recipes', () => {
      const recipes = recipeService.getRecipes();

      expect(recipes).to.be.empty;
    });

    it('returns array of recipes', () => {
      createMockRecipes();
      const recipes = recipeService.getRecipes();

      expect(recipes[2].title).to.be.eq(recipesConstants[2].title);
    });
  });

  describe('Get One', () => {
    it('returns specific recipe', () => {
      const [createdRecipe] = createMockRecipes();
      const recipe = recipeService.getRecipe(createdRecipe.id);

      expect(recipe.title).to.be.eq(recipesConstants[0].title);
    });

    it('fails with getting specific recipe which does not exists', () => {
      expect(() => recipeService.getRecipe('NOT_EXISTING_ID')).to.throw('No specific recipe stored');
    });
  });

  describe('Create', () => {
    it('creates new recipe', () => {
      const [createdRecipe] = createMockRecipes();
      const recipe = recipeService.getRecipe(createdRecipe.id);

      expect(recipe.title).to.be.eq(recipesConstants[0].title);
    });

    it('fails with creating recipe with title which already exist', () => {
      const [createdRecipe] = createMockRecipes();
      expect(() => recipeService.createRecipe(createdRecipe)).to.throw('Recipe with equal title already exists');
    });
  });


  describe('Edit', () => {
    it('edits recipe', () => {
      const [createdRecipe] = createMockRecipes();
      createdRecipe.ingredients.push({name: 'Onion'});
      recipeService.editRecipe(createdRecipe);
      const recipe = recipeService.getRecipe(createdRecipe.id);

      expect(recipe.ingredients).to.deep.include.members([{name: 'Onion'}]);
    });

    it('fails with editing recipe without any changes', () => {
      const [createdRecipe] = createMockRecipes();

      expect(() => recipeService.editRecipe(createdRecipe)).to.throw('There is no any changes');
    });

    it('fails with editing recipe which does not exists', () => {
      const [createdRecipe] = createMockRecipes();
      localStorage.clear();

      expect(() => recipeService.editRecipe(createdRecipe)).to.throw('No specific recipe stored');
    });
  });

  describe('Remove', () => {
    it('removes recipe', async () => {
      const [createdRecipe] = createMockRecipes();
      recipeService.removeRecipe(createdRecipe.id);
      const recipes = recipeService.getRecipes();

      expect(recipes.length).to.be.eq(2);
    });
  });

  const createMockRecipes = (): Array<IRecipe> => {
    const recipes = [];
    recipes.push(recipeService.createRecipe(recipesConstants[0]));
    recipes.push(recipeService.createRecipe(recipesConstants[1]));
    recipes.push(recipeService.createRecipe(recipesConstants[2]));
    return recipes;
  };

});
