import { createReducer } from 'deox';
import { createSimpleActionCreator } from './util';
import { v4 as uuidv4 } from 'uuid';

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
  ingredients: string[],
};

export interface IState {
  meals: Record<string, IMeal>
};

export const defaultState: IState = {
  meals: {},
};

//
// Actions
//
export interface IPayloads {
  SAVE_MEAL: {
    id?: string,
    meal: IMeal,
  }
  REMOVE_MEAL: string,
};

export const actions = {
  saveMeal: createSimpleActionCreator<IPayloads, 'SAVE_MEAL'>('SAVE_MEAL'),
  removeMeal: createSimpleActionCreator<IPayloads, 'REMOVE_MEAL'>('REMOVE_MEAL'),
};

export const reducer = createReducer(defaultState, handleAction => [
  handleAction(actions.saveMeal, (state, { payload }) => ({
    ...state,
    meals: {
      ...state.meals,
      [payload.id ? payload.id : uuidv4()]: payload.meal
    }
  })),
  handleAction(actions.removeMeal, (state, { payload }) => {
    const { [payload]: value, ...result } = state.meals;

    return {
      ...state,
      meals: { ...result }
    }
  })
]);