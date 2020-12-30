import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Content, Form, Input, Item, Label, Text, } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions, IState } from '../../store';
import { IMeal } from '../../store/meals';
import NumberButtons from '../../components/NumberButtons';
import { BottomTabParamList } from '../../navigation/BottomTabNavigator';

type IProps = {
  
} & StackScreenProps<BottomTabParamList, 'EditMeal'>;

export default ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();
  let paramsMeal: IMeal | undefined;

  console.log(route);

  if (route.params !== undefined) {
    const { name } = route.params;

    paramsMeal = useSelector<IState, IMeal | undefined>(state => state.meals.meals.find(meal => meal.name == name));
  }

  // const mealFromRoute = useSelector<IState>(state => state.meals.find(meal => meal.name == route.?params.name))

  const [meal, setMeal] = React.useState<IMeal>(paramsMeal || {
    name: '',
    numOfDays: 1,
  });

  const setValue = (name: keyof IMeal, value: string | number) => {
    setMeal({
      ...meal,
      [name]: value,
    })
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          transparent
          key="save"
          onPress={() => {
            dispatch(actions.meals.saveMeal(meal));
            navigation.navigate('Meals');
          }}
        >
          <Text>SAVE</Text>
        </Button>
      )
    })
  });

  return (
    <View style={styles.container}>
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input
              value={meal.name}
              onChangeText={text => setValue('name', text)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Number of Days</Label>
            <NumberButtons
              choices={5}
              value={meal.numOfDays || 1}
              onChange={value => setValue('numOfDays', value)}
            />
          </Item>
        </Form>
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});