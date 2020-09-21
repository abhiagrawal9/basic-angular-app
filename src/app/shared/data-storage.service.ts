import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';

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
          console.log(response);
        },
        (error: Error) => {
          console.error(error.message);
        }
      );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'https://basic-angular-app-ee32c.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
