import { IState } from ".";
import { IMeal, IState as IMealState} from "./meals";

interface ISelectors {
  getMealList: (state: IState) => IMeal[]
  getMeals: (state: IState) => IMealState['meals']
}

export const selectors: ISelectors = {
  getMealList: state => Object.keys(state.meals.meals).map(name => {
    return state.meals.meals[name];
  }),
  getMeals: state => state.meals.meals,
};