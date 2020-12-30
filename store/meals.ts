import { createReducer } from 'deox';
import { createSimpleActionCreator } from './util';

//
// State
//
export interface IRecipe {
  url?: string,
  text?: string,
};

export interface IMeal {
  name: string,
  numOfDays?: number,
  recipe?: IRecipe,
};

export interface IState {
  meals: IMeal[],
};

export const defaultState: IState = {
  meals: [],
};

//
// Actions
//
export interface IPayloads {
  SAVE_MEAL: IMeal,
  REMOVE_MEAL: string,
};

export const actions = {
  saveMeal: createSimpleActionCreator<IPayloads, 'SAVE_MEAL'>('SAVE_MEAL'),
  removeMeal: createSimpleActionCreator<IPayloads, 'REMOVE_MEAL'>('REMOVE_MEAL'),
};

export const reducer = createReducer(defaultState, handleAction => [
  handleAction(actions.saveMeal, (state, { payload }) => ({
    ...state,
    meals: [
      ...state.meals,
      payload
    ]
  })),
  handleAction(actions.removeMeal, (state, { payload }) => {
    const mealPredicate = (meal: IMeal) => meal.name === payload;
    return {
      ...state,
      meals: [
        ...state.meals.slice(0, state.meals.findIndex(mealPredicate)),
        ...state.meals.slice(state.meals.findIndex(mealPredicate) + 1)
      ]
    }
  })
]);