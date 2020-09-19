import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecipeService } from './recipes/recipe.service';
import { Recipe } from './recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    this.http
      .put<Recipe[]>(
        'https://basic-angular-app-ee32c.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe(
        (response) => {
          console.log('Data is stored.');
          console.log(response);
        },
        (error: Error) => {
          console.error(error.message);
        }
      );
  }

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>(
        'https://basic-angular-app-ee32c.firebaseio.com/recipes.json'
      )
      .subscribe(
        (data) => {
          console.log('Data is fetched.');
          this.recipeService.setRecipes(data);
        },
        (error: Error) => {
          console.error(error.message);
        }
      );
  }
}
