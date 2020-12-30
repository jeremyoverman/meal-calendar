import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/selectors';
import { Body, Button, Content, Icon, Left, List, ListItem, Right, StyleProvider, Text } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions } from '../../store';
import { RootStackParamList } from '../../navigation';
import { MealsStackParamList } from './MealsNav';

type IProps = {
  
} & StackScreenProps<MealsStackParamList, 'MealsScreen'>;

export default ({ navigation }: IProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing ] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => [(
        <Button
          transparent
          key="edit"
          onPress={() => setIsEditing(!isEditing)}
        >
          <Icon name={isEditing ? 'pencil-outline' : 'pencil'} type="MaterialCommunityIcons" />
        </Button>
      ), (
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

  const meals = useSelector(selectors.getMealList);

  return (
    <View style={style.container}>
      <Content>
        <List>
          {meals.map(meal => (
            <ListItem
              key={meal.name}
              onPress={() => navigation.navigate('EditMeal', {
                name: meal.name,
              })}
            >
              <Body style={style.item}>
                {isEditing ? (
                  <Button
                    transparent
                    onPress={() => dispatch(actions.meals.removeMeal(meal.name))}
                    style={style.removeButton}
                  >
                    <Icon
                      name="circle-with-minus"
                      type="Entypo"
                      style={style.removeButtonIcon}
                    />
                  </Button>
                ) : null}
                <Text>{meal.name}</Text>
              </Body>
              <Right>
                <Icon name="arrowright" type="AntDesign"/>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
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
    textAlignVertical: 'center'
  },
  removeButton: {
    marginTop: 8,
    height: 1
  },
  removeButtonIcon: {
    color: 'red',
  }
});