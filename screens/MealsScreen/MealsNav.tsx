import * as React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import AppHeader from "../../navigation/AppHeader";
import MealsScreen from "./MealsScreen";
import { RootStackParamList } from '../../navigation';

export type MealsStackParamList = {
  MealsScreen: undefined;
} & RootStackParamList;

const MealsStack = createStackNavigator<MealsStackParamList>();

export function MealsNavigator() {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen
        name="MealsScreen"
        component={MealsScreen}
        options={{
          title: 'Meals',
          header: props => <AppHeader {...props} />
        }}
      />
    </MealsStack.Navigator>
  );
}