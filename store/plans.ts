import { createReducer } from 'deox';
import { IMeal } from './meals';
import { createSimpleActionCreator } from './util';

//
// State
//
export interface IDay {
  breakfast?: string,
  lunch?: string,
  dinner?: string,
}

export interface IPlan {
  [date: number]: IDay
}

export interface IState {
  plan: IPlan
};

export const defaultState: IState = {
  plan: {}
};

//
// Actions
//
export interface IPayloads {
  ADD_MEAL: { date: Date, period: keyof IDay, meal: string }
  REMOVE_MEAL: { period: keyof IDay, date: Date }
};

export const actions = {
  addMeal: createSimpleActionCreator<IPayloads, 'ADD_MEAL'>('ADD_MEAL'),
  removeMeal: createSimpleActionCreator<IPayloads, 'REMOVE_MEAL'>('REMOVE_MEAL'),
};

export const reducer = createReducer(defaultState, handleAction => [
  handleAction(actions.addMeal, (state, { payload }) => {
    const date = new Date(payload.date);
    date.setHours(0, 0, 0)
    date.setMilliseconds(0)

    return {
      ...state,
      plan: {
        ...state.plan,
        [date.valueOf() * 1000]:{
          ...state.plan[date.valueOf() * 1000],
          [payload.period]: payload.meal, 
        }
      }
    }
  }),
  handleAction(actions.removeMeal, (state, { payload }) => {
    const date = new Date(payload.date);
    date.setHours(0, 0, 0)
    date.setMilliseconds(0)

    const day: IDay = {
      ...state.plan[payload.date.valueOf() * 1000]
    }

    delete day[payload.period];

    return {
      ...state,
      plan: {
        ...state.plan,
        [date.valueOf() * 1000]:{
          ...day
        }
      }
    }
  }),
]);