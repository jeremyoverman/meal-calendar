import * as React from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Item, Label, Text, Toast, } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions, IState } from '../../store';
import { IMeal } from '../../store/meals';
import NumberButtons from '../../components/NumberButtons';
import { BottomTabParamList } from '../../navigation/BottomTabNavigator';
import ListInput from '../../components/ListInput';

type IProps = {
  
} & StackScreenProps<BottomTabParamList, 'EditIngredients'>;

export default ({ navigation, route }: IProps) => {
  if (!route.params || !route.params.ingredients) {
    navigation.navigate('NotFound');
    return <Text/>;
  }

  const dispatch = useDispatch();
  const [ingredients, setIngredients] = React.useState<string[]>(route.params.ingredients);

  const addIngredient = (ingredient: string) => {
    setIngredients(Array.from(new Set([...ingredients, ingredient])))
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(value => value !== ingredient));
  };

  const saveIngredients = () => {
    Keyboard.dismiss();
    dispatch(actions.ingredients.saveIngredients(ingredients));
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent key="save" onPress={() => saveIngredients()}>
          <Text>SAVE</Text>
        </Button>
      )
    })
  });

  return (
    <View style={styles.container}>
      <ListInput
        value={ingredients}
        onAdd={addIngredient}
        onDelete={removeIngredient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});