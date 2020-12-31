import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Content, Form, Icon, Input, Item, Label, List, ListItem, Text, Toast, } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions, IState } from '../../store';
import { IMeal } from '../../store/meals';
import NumberButtons from '../../components/NumberButtons';
import { BottomTabParamList } from '../../navigation/BottomTabNavigator';

type IProps = {
  
} & StackScreenProps<BottomTabParamList, 'EditMeal'>;

export default ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();
  const existingMeals = useSelector<IState, Record<string, IMeal>>(state => state.meals.meals);
  let id = route.params && route.params.id ? route.params.id : undefined;

  const [meal, setMeal] = React.useState<IMeal>({
    name: '',
    numOfDays: 1,
    ingredients: [],
    ...(id ? existingMeals[id] : {})
  });

  const ingredients = useSelector<IState, IState['ingredients']>(state => state.ingredients)

  React.useEffect(() => {
    if (ingredients.dirty) {
      setValue('ingredients', [...ingredients.ingredients]);
      dispatch(actions.ingredients.clearIngredients(undefined));
    }
  }, [ingredients])


  function setValue<K extends keyof IMeal> (name: K, value: IMeal[K]) {
    const result = {
      ...meal,
      [name]: value,
    };

    // Remove duplicate ingredients
    result.ingredients = Array.from(new Set(result.ingredients))

    setMeal(result);
  };

  function saveMeal () {
    const existingNames = Object.keys(existingMeals).map(mealId => {
      if (mealId === id) {
        return null;
      }

      return existingMeals[mealId].name.toLowerCase();
    }).filter(name => name !== null);

    if (existingNames.includes(meal.name.toLowerCase())) {
      Toast.show({
        text: `Meal "${meal.name}" already exists`,
        type: 'warning',
        duration: 3000,
        buttonText: 'OK',
      })
    } else {
      dispatch(actions.meals.saveMeal({ id, meal }));
      navigation.navigate('Meals');
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? existingMeals[id].name : 'Create Meal',
      headerRight: () => (
        <Button transparent key="save" onPress={() => saveMeal()}>
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
          <Item stackedLabel>
            <Label>Number of Days</Label>
            <NumberButtons
              choices={5}
              value={meal.numOfDays || 1}
              onChange={value => setValue('numOfDays', value)}
            />
          </Item>
          <Item stackedLabel>
            <Button warning rounded block
              style={styles.ingredientsEditButton}
              onPress={() => navigation.navigate('EditIngredients', { ingredients: meal.ingredients })}
            >
              <Icon name="pencil" type="MaterialCommunityIcons" style={styles.ingredientsEditIcon} />
            </Button>
            <Label>Ingredients</Label>
            <List style={styles.ingredients}>
              {meal.ingredients.map(ingredient => (
                <ListItem key={ingredient} style={styles.ingredientsItem}>
                  <Text>{ingredient}</Text>
                </ListItem>
              ))}
            </List>
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
  ingredientsEditIcon: {
    position: 'absolute',
    left: -4,
  },
  ingredientsEditButton: {
    position: 'absolute',
    right: 14,
    top: 10,
    width: 48,
    height: 48,
    maxHeight: 48,
    zIndex: 999,
  },
  ingredients: {
    width: '100%',
    margin: 0
  },
  ingredientsItem: {
    marginLeft: 0,
    paddingLeft: 8,
  }
});