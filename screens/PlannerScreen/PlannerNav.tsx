import * as React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import AppHeader from "../../navigation/AppHeader";
import PlannerScreen from "./PlannerScreen";
import { RootStackParamList } from '../../navigation';

export type PlannerParamList = {
  PlannerScreen: undefined;
} & RootStackParamList;

const PlannerStack = createStackNavigator<PlannerParamList>();

export function PlannerNavigator() {
  return (
    <PlannerStack.Navigator>
      <PlannerStack.Screen
        name="PlannerScreen"
        component={PlannerScreen}
        options={{
          title: 'Planner',
          header: props => <AppHeader {...props} />
        }}
      />
    </PlannerStack.Navigator>
  );
}