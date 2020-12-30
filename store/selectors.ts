import { IState } from ".";

interface ISelectors {
  getCreateForm: (state: IState) => IState['meals']['form'],
  getMealList: (state: IState) => IState['meals']['meals'],
}

export const selectors: ISelectors = {
  getCreateForm: state => state.meals.form,
  getMealList: state => state.meals.meals,
};