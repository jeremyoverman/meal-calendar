// @ts-ignore
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import EditIngredientsScreen from '../screens/EditIngredients/EditIngredientsScreen';
import EditMealScrene from '../screens/EditMealScrene/EditMealScrene';

import NotFoundScreen from '../screens/NotFoundScreen';
import SelectMealScreen from '../screens/SelectMealScreen/SelectMealScreen';
import AppHeader from './AppHeader';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  EditMeal?: {
    id: string,
  },
  EditIngredients: {
    ingredients: string[],
  },
  SelectMeal: {
    date: Date,
    onSelect: (id: string, date: Date) => any,
  },
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditMeal"
        component={EditMealScrene}
        options={{
          title: 'Create a Meal',
          header: props => <AppHeader {...props} />
        }}
      />
      <Stack.Screen
        name="EditIngredients"
        component={EditIngredientsScreen}
        options={{
          title: 'Edit Ingredients',
          header: props => <AppHeader {...props} />
        }}
      />
      <Stack.Screen
        name="SelectMeal"
        component={SelectMealScreen}
        options={{
          title: 'Add Meal',
          header: props => <AppHeader {...props} />
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}