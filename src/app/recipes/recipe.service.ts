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

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Cheese Recipe updated',
  //     'This is simply a test recipe Updated',
  //     'https://image.jpg',
  //     [new Ingredient('cheese', 2), new Ingredient('butter', 5)]
  //   ),
  //   new Recipe(
  //     'Tomato Test Recipe',
  //     'This is simply a test',
  //     'https://image.jpg',
  //     [
  //       new Ingredient('tomato', 6),
  //       new Ingredient('Banana', 1),
  //       new Ingredient('cheese', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Ginger Garlic Recipe',
  //     'This is simply a test',
  //     'https://www.biggerbolderbaking.com/wp-content/uploads/2019/07/15-Minute-Pizza-WS-Thumbnail.png',
  //     [new Ingredient('ginger', 2), new Ingredient('garlic', 5)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppinglistService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    console.log(this.recipes.length + '- getting recipes');
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
    console.log('data is set');
    console.log(this.recipes.length + ' - after setting');
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

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
