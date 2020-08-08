import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2018/02/cafe-style-hot-coffee-recipe-1.jpg'
    ),
    new Recipe(
      'Another Test 2 Recipe',
      'This is simply a test',
      'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
