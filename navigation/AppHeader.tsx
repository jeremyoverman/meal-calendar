import * as React from 'react';
import { StackHeaderProps } from "@react-navigation/stack";
import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";
import { StyleSheet, StatusBar } from 'react-native';

export default function AppHeader (props: StackHeaderProps) {
  const {options} = props.scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : props.scene.route.name;

  return (
    <Header noLeft={props.previous === undefined} style={style.header}>
      <Left>
        {props.previous ? (
          <Button transparent onPress={props.navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        ) : (
          undefined
        )}
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {options.headerRight && options.headerRight({ tintColor: undefined })}
      </Right>
    </Header>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
  },
});