import { createReducer } from 'deox';
import { createSimpleActionCreator } from './util';

//
// State
//
export interface IState {
  dirty: boolean,
  ingredients: string[],
};

export const defaultState: IState = {
  dirty: false,
  ingredients: [],
};

//
// Actions
//
export interface IPayloads {
  SAVE_INGREDIENTS: string[],
  CLEAR_INGREDIENTS: undefined,
};

export const actions = {
  saveIngredients: createSimpleActionCreator<IPayloads, 'SAVE_INGREDIENTS'>('SAVE_INGREDIENTS'),
  clearIngredients: createSimpleActionCreator<IPayloads, 'CLEAR_INGREDIENTS'>('CLEAR_INGREDIENTS'),
};

export const reducer = createReducer(defaultState, handleAction => [
  handleAction(actions.saveIngredients, (state, { payload }) => ({
    ...state,
    dirty: true,
    ingredients: [ ...payload ],
  })),
  handleAction(actions.clearIngredients, state => ({
    dirty: false,
    ingredients: [],
  }))
]);