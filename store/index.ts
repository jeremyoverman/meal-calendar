import { combineReducers, createStore } from "redux";
// @ts-ignore
import Reactotron from '../ReactotronConfig.js';

import {
  actions as mealsActions,
  reducer as mealsReducer,
  IState as IMealsState,
} from "./meals";
import { loadState, saveState } from "./util";

export const actions = {
  meals: mealsActions,
}

export interface IState {
  meals: IMealsState,
};

const reducer = combineReducers({
  meals: mealsReducer
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