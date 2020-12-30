import * as React from 'react';
import { BottomTabBarOptions, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Button, Footer, FooterTab, Text } from "native-base";

export const BottomNavigation = ({state, descriptors, navigation}: BottomTabBarProps<BottomTabBarOptions>) => {
  return (
    <Footer>
      <FooterTab>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Button
              active={isFocused}
              vertical
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}>
              {options.tabBarIcon && options.tabBarIcon({
                focused: isFocused,
                color: 'white',
                size: 2
              })}
              <Text>{label}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};
