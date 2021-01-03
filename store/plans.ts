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
  'PLANS/ADD_MEAL': { date: Date, period: keyof IDay, meal: string }
  'PLANS/REMOVE_MEAL': { period: keyof IDay, date: Date }
  'PLANS/REMOVE_MEALS_WITH_ID': string,
};

export const actions = {
  addMeal: createSimpleActionCreator<IPayloads, 'PLANS/ADD_MEAL'>('PLANS/ADD_MEAL'),
  removeMeal: createSimpleActionCreator<IPayloads, 'PLANS/REMOVE_MEAL'>('PLANS/REMOVE_MEAL'),
  removeMealsWithId: createSimpleActionCreator<IPayloads, 'PLANS/REMOVE_MEALS_WITH_ID'>('PLANS/REMOVE_MEALS_WITH_ID'),
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
  handleAction(actions.removeMealsWithId, (state, { payload }) => {
    const plan: IPlan = {};

    for (let date in state.plan) {
      const day = { ...state.plan[date] };

      const removeMeal = (period: keyof IDay, id: string): IDay => {
        if (day[period] === id) {
          const { [period]: value, ...withoutMeal } = day;
          return withoutMeal;
        }

        return { ...day };
      }

      plan[date] = {
        breakfast: removeMeal('breakfast', payload).breakfast,
        lunch: removeMeal('lunch', payload).lunch,
        dinner: removeMeal('dinner', payload).dinner,
      };
    }

    return { ...state, plan: plan }
    // return { ...state }
  }),
]);