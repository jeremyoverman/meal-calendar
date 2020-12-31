import { combineReducers, createStore } from "redux";
// @ts-ignore
import Reactotron from '../ReactotronConfig.js';

import {
  actions as mealsActions,
  reducer as mealsReducer,
  IState as IMealsState,
} from "./meals";
import {
  actions as ingredientsActions,
  reducer as ingredientsReducer,
  IState as IIngredientsState,
} from "./ingredients";
import { loadState, saveState } from "./util";

export const actions = {
  meals: mealsActions,
  ingredients: ingredientsActions,
}

export interface IState {
  meals: IMealsState,
  ingredients: IIngredientsState,
};

const reducer = combineReducers({
  meals: mealsReducer,
  ingredients: ingredientsReducer,
});

export default async () => {
  const store = createStore(reducer, await loadState(), Reactotron.createEnhancer());

  store.subscribe(() => {
    saveState({
      meals: store.getState().meals,
    })
  });

  return store;
};