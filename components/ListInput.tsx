import { Body, Icon, Input, Item, ListItem, Right, Text, View } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

type Value = {
  id: string,
  value: string,
} | string;

type IProps = {
  value: Value[],
  onAdd?: (value: string) => any,
  onDelete?: (value: string) => any,
  onPress?: (value: string) => any,
};

export default ({
  value,
  onAdd,
  onDelete,
  onPress,
}: IProps) => {
  const [newItem, setNewItem] = React.useState('');
  const [isSwiping, setIsSwiping] = React.useState(false);

  const handleNewItem = () => {
    if (onAdd && newItem.length > 0) {
      onAdd(newItem);
      setNewItem('');
    }
  }

  return (
    <View style={style.container}>
      <SwipeListView
        swipeGestureBegan={() => setIsSwiping(true)}
        swipeGestureEnded={() => setIsSwiping(false)}
        useFlatList={false}
        style={style.list}
        disableRightSwipe
        data={value.map((v, i) => ({
          key: typeof v === 'string' ? v : v.id,
          text: typeof v === 'string' ? v : v.value,
          first: i === 0,
          last: i === value.length - 1
        }))}
        renderItem={data => {
          const listItem = (
            <ListItem
              key={data.item.key}
              style={[
                style.rowFront,
                data.item.first && style.rowFrontFirst
              ]}
            >
              <Body>
                <Text>{data.item.text}</Text>
              </Body>
              {onPress && (
                <Right>
                  <Icon name="arrowright" type="AntDesign"/>
                </Right>
              )}
            </ListItem>
          );

          if (onPress) {
            return (
              <TouchableHighlight onPress={() => {
                if (!isSwiping) {
                  onPress(data.item.key)
                }
              }}>
                {listItem}
              </TouchableHighlight>
            );
          } else {
            return listItem;
          }
        }}
        renderHiddenItem={onDelete ? data => (
          <View style={style.rowBack}>
            <TouchableOpacity style={style.deleteButton} onPress={() => onDelete(data.item.key)}>
              <Icon style={style.deleteIcon} name="trash-can-outline" type="MaterialCommunityIcons" />
            </TouchableOpacity>
          </View>
        ) : undefined}
        ListFooterComponent={onAdd && (
          <Item>
            <Input
              style={style.newItemInput}
              value={newItem}
              onChangeText={setNewItem}
              onBlur={handleNewItem}
              onSubmitEditing={handleNewItem}
              placeholder="Add ingredient..."
              blurOnSubmit={false}
              returnKeyType="next"
            />
          </Item>
        )}
        rightOpenValue={-75}
      />
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  rowFront: {
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
    backgroundColor: '#f2f2f2',
    marginLeft: 0,
    paddingLeft: 8,
    height: 60,
  },
  rowFrontFirst: {
    borderTopWidth: 1,
  },
  deleteButton: {
    width: '100%',
    height: '100%',
  },
  deleteIcon: {
    color: 'white',
    position: 'absolute',
    right: 24,
    top: 14,
  },
  container: {
    width: '100%',
    paddingTop: 8,
    flex: 1,
  },
  rowBack: {
    width: '100%',
    height: 400,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF0000',
  },
  newItemInput: {
    marginLeft: 8
  }
});
