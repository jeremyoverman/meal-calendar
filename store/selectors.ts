import { IState } from ".";
import { IMeal, IState as IMealState} from "./meals";
import { IState as IPlanState} from "./plans";

interface ISelectors {
  getMealList: (state: IState) => IMeal[]
  getMeals: (state: IState) => IMealState['meals']
  getPlan: (state: IState) => IPlanState['plan']
}

export const selectors: ISelectors = {
  getMealList: state => Object.keys(state.meals.meals).map(name => {
    return state.meals.meals[name];
  }),
  getMeals: state => state.meals.meals,
  getPlan: state => state.plan.plan,
};