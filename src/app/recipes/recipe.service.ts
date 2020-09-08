import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Cheese Recipe',
      'This is simply a test',
      'https://cdn.shortpixel.ai/spai/w_995+q_lossy+ret_img+to_webp/https://recipefairy.com/wp-content/uploads/2020/07/kfc-mac-and-cheese.jpg',
      [new Ingredient('cheese', 2), new Ingredient('butter', 5)]
    ),
    new Recipe(
      'Tomato Test Recipe',
      'This is simply a test',
      'https://www.thespruceeats.com/thmb/tN4DaHZxij331iLWC9KyxdyAL_M=/1243x1243/smart/filters:no_upscale()/simple-marinara-tomato-sauce-recipe-3377653-hero-5c4a32f2c9e77c00011dd239.jpg',
      [
        new Ingredient('tomato', 6),
        new Ingredient('Banana', 1),
        new Ingredient('cheese', 2),
      ]
    ),
    new Recipe(
      'Ginger Garlic Recipe',
      'This is simply a test',
      'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
      [new Ingredient('ginger', 2), new Ingredient('garlic', 5)]
    ),
  ];

  constructor(private shoppinglistService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
