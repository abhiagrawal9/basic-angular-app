import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'Description 1',
      'https://hips.hearstapps.com/del.h-cdn.co/assets/16/21/1464124561-shot-1-033.jpg'
    ),
    new Recipe(
      'Test Recipe 2',
      'Description 2',
      'https://assets.bonappetit.com/photos/597f6557a2d4466309949378/1:1/w_400%2Cc_limit/0817-murray-mancini-grilled-chinese-beef-broccoli.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
