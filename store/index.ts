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
import {
  actions as planActions,
  reducer as planReducer,
  IState as IPlanState,
} from "./plans";
import { loadState, saveState } from "./util";

export const actions = {
  meals: mealsActions,
  ingredients: ingredientsActions,
  plans: planActions,
}

export interface IState {
  meals: IMealsState,
  ingredients: IIngredientsState,
  plan: IPlanState,
};

const reducer = combineReducers({
  meals: mealsReducer,
  ingredients: ingredientsReducer,
  plan: planReducer
});

export default async () => {
  // saveState({});

  const store = createStore(reducer, await loadState(), Reactotron.createEnhancer());

  store.subscribe(() => {
    saveState({
      meals: store.getState().meals,
      plan: store.getState().plan,
    })
  });

  return store;
};