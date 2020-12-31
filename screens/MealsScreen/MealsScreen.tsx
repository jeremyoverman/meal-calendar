import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/selectors';
import { Body, Button, Content, Icon, Left, List, ListItem, Right, StyleProvider, Text } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions } from '../../store';
import { MealsStackParamList } from './MealsNav';
import ListInput from '../../components/ListInput';

type IProps = {
  
} & StackScreenProps<MealsStackParamList, 'MealsScreen'>;

export default ({ navigation }: IProps) => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => [(
        <Button
          transparent
          key="create"
          onPress={() => navigation.navigate('EditMeal')}
        >
          <Icon name="plus" type="Entypo" />
        </Button>
      )]
    })
  });

  const meals = useSelector(selectors.getMeals);

  return (
    <View style={style.container}>
      <ListInput
        value={Object.keys(meals).map(id => ({
          id,
          value: meals[id].name,
        }))}
        onDelete={id => dispatch(actions.meals.removeMeal(id))}
        onPress={id => navigation.navigate('EditMeal', { id })}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    textAlignVertical: 'center',
    marginLeft: 0
  },
  removeButton: {
    marginTop: 8,
    height: 1
  },
  removeButtonIcon: {
    color: 'red',
  },
  content: {
    marginLeft: 0,
    paddingLeft: 0
  }
});