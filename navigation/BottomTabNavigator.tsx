import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import * as React from 'react';
import { RootStackParamList } from '.';
import { IngredientsNavigator } from '../screens/IngredientsScreen/IngredientsNav';
import { MealsNavigator } from '../screens/MealsScreen/MealsNav';
import { PlannerNavigator } from '../screens/PlannerScreen/PlannerNav';
import { BottomNavigation } from './AppFooter';

export type BottomTabParamList = {
  Meals: undefined;
  Ingredients: undefined;
  Planner: undefined;
} & RootStackParamList;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Meals"
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={props => <BottomNavigation {...props} /> }
    >
      <BottomTab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: () => <Icon name="food" type="MaterialCommunityIcons" />,
        }}
      />
      <BottomTab.Screen
        name="Ingredients"
        component={IngredientsNavigator}
        options={{
          tabBarIcon: () => <Icon name="food-apple" type="MaterialCommunityIcons" />,
        }}
      />
      <BottomTab.Screen
        name="Planner"
        component={PlannerNavigator}
        options={{
          tabBarIcon: () => <Icon name="calendar" type="FontAwesome" />,
        }}
      />
    </BottomTab.Navigator>
  );
};