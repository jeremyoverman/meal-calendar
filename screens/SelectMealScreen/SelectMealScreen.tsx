import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/selectors';
import { Button, Icon } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { actions } from '../../store';
import ListInput from '../../components/ListInput';
import { RootStackParamList } from '../../navigation';

type IProps = {
  
} & StackScreenProps<RootStackParamList, 'SelectMeal'>;

export default ({ navigation, route }: IProps) => {
  const meals = useSelector(selectors.getMeals);

  const handleSelect = (id: string) => {
    if (route.params && route.params.onSelect) {
      route.params.onSelect(id, route.params.date);
    }

    navigation.goBack();
  }

  return (
    <View style={style.container}>
      <ListInput
        value={Object.keys(meals).map(id => ({
          id,
          value: meals[id].name,
        }))}
        onPress={id => handleSelect(id)}
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