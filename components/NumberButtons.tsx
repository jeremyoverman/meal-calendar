import { Button, Left, Segment, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  choices: number,
  value: number,
  onChange: (value: number) => any,
};

export default ({
  choices,
  value,
  onChange,
}: IProps) => {
  const createButtons = () => {
    return Array.from(Array(choices).keys()).map(choice => {
      choice = choice + 1;

      return (
        <Button
          key={choice}
          style={style.button}
          bordered={choice !== value}
          onPress={() => onChange(choice)}
        >
          <Text>{choice}</Text>
        </Button>
      );
    });
  }

  return (
    <View style={style.container}>
      {createButtons()}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  button: {
    flexGrow: 0,
  }
})