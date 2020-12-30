import * as React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import AppHeader from "../../navigation/AppHeader";
import IngredientsScreen from './IngredientsScreen';

type IngredientsParamList = {
  IngredientsScreen: undefined;
};

const IngredientsStack = createStackNavigator<IngredientsParamList>();

export function IngredientsNavigator() {
  return (
    <IngredientsStack.Navigator>
      <IngredientsStack.Screen
        name="IngredientsScreen"
        component={IngredientsScreen}
        options={{
          title: 'Ingredients',
          header: props => <AppHeader {...props} />
        }}
      />
    </IngredientsStack.Navigator>
  );
}