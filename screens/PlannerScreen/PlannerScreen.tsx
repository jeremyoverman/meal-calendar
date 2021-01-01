import * as React from 'react';
import { PlannerParamList } from './PlannerNav';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Container, Content, Icon, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useMealPlan from '../../hooks/useMealPlan';
import { IMeal } from '../../store/meals';
import { IDay } from '../../store/plans';
import { actions } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/selectors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ISelectedItems {
  breakfast: number[],
  lunch: number[],
  dinner: number[],
}

interface IDateRange {
  from: Date,
  to: Date,
}

const DAY_HEIGHT = 60;
const HEADER_HEIGHT = 40;
const INITIAL_SELECTED_ITEMS: ISelectedItems = {
  breakfast: [],
  lunch: [],
  dinner: [],
};

type IProps = {
  
} & StackScreenProps<PlannerParamList, 'PlannerScreen'>;

export default ({ navigation }: IProps) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = React.useState<ISelectedItems>(INITIAL_SELECTED_ITEMS);

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 14)

  const [dateRange, setDateRange] = React.useState<IDateRange>({
    from: new Date(startDate),
    to: new Date(endDate),
  });
  const [dateButtonsShowing, setDateButtonsShowing] = React.useState(false);
  const [calendarShowing, setCalendarShowing] = React.useState<keyof IDateRange | undefined>();

  const numOfDays = (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24) + 1;

  const isSelecting = selectedItems.breakfast.length + selectedItems.lunch.length + selectedItems.dinner.length > 0;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:() => [
        (
          <Button
            transparent
            key="dates"
            onPress={() => setDateButtonsShowing(!dateButtonsShowing)}
          >
            <Icon name="calendar-range-outline" type="MaterialCommunityIcons" />
          </Button>
        ),
        isSelecting ? (
          <Button transparent key="delete" onPress={() => removeSelectedItems()}>
            <Icon name="trash-can-outline" type="MaterialCommunityIcons" />
          </Button>
        ) : undefined
      ]
    })
  });

  const allMeals = useSelector(selectors.getMeals)
  const dayArray = useMealPlan(dateRange.from, numOfDays);

  const buildPeriod = (period: keyof IDay) => {
    const column = [];
    let blanks = 0;

    for (let day = 0; day < dayArray.length; day++) {
      let span = 1;
      let mealId: string | undefined;
      let meal: IMeal | undefined;
      let meals = dayArray[day].meals;

      if (meals && meals[period]) {
        mealId = meals[period];

        if (mealId) {
          meal = allMeals[mealId];
          span = meal.numOfDays || 1;
          blanks = span
        }
      }

      column.push(
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SelectMeal', {
            date: dayArray[day].date,
            onSelect: (id, date) => {
              dispatch(actions.plans.addMeal({
                date: date,
                period: period,
                meal: id,
              }))
            }
          })}
          style={[
            styles.day,
            blanks > 0 ? {
              borderWidth: 0,
            } : undefined
          ]}
          key={`${day}-blank`}
        />
      )

      if (blanks > 0) {
        blanks -= 1;
      }

      if (meal) {
        column.push(
          <View
            key={`${day}-meal`}
            style={[
              styles.day,
              styles.meal,
              selectedItems[period].includes(day) ? styles.selectedMeal : undefined,
              {
                height: span * DAY_HEIGHT,
                top: (day + 1) * DAY_HEIGHT - HEADER_HEIGHT / 2,
              }
            ]}
          >
            <TouchableWithoutFeedback
              style={{
                height: '100%',
                width: '100%',
                zIndex: day,
              }}
              onPress={() => {
                if (isSelecting) {
                  toggleSelectItem(period, day)
                } else {
                  navigation.navigate('EditMeal', { id: mealId! })
                }
              }}
              onLongPress={() => toggleSelectItem(period, day)}
            >
              <Text
                style={[
                  styles.mealText,
                ]}
              >
                {meal.name}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    }

    return column;
  };

  const toggleSelectItem = (period: keyof ISelectedItems, day: number) => {
    const periodSet = new Set(Array.from(selectedItems[period]));

    if (periodSet.has(day)) {
      periodSet.delete(day);
    } else {
      periodSet.add(day);
    }

    setSelectedItems({
      ...selectedItems,
      [period]: [
        ...Array.from(periodSet)
      ]
    })
  };

  const removeSelectedItems = () => {
    function keys<O>(o: O) {
      return Object.keys(o) as (keyof O)[];
    }

    keys(selectedItems).forEach(period => {
      selectedItems[period].forEach(day => {
        dispatch(actions.plans.removeMeal({
          date: dayArray[day].date,
          period: period
        }))
      });
    });

    setSelectedItems(INITIAL_SELECTED_ITEMS);
  }

  const setDate = (type: keyof IDateRange, date?: Date) => {
    setCalendarShowing(undefined);

    if (date) {
      if (type === 'from' && date.valueOf() > dateRange.to.valueOf()) {
        const to = new Date(date);
        to.setDate(date.getDate() + numOfDays);

        setDateRange({
          from: date,
          to: to
        });
      } else if (type === 'to' && date.valueOf() < dateRange.from.valueOf()) {
        const from = new Date(date);
        from.setDate(date.getDate() - numOfDays);

        setDateRange({
          from: from,
          to: date
        });
      } else {
        setDateRange({
          ...dateRange,
          [type]: date
        });
      }
    }
  }

  const periods = [{
    name: 'Breakfast',
    column: buildPeriod('breakfast'),
  }, {
    name: 'Lunch',
    column: buildPeriod('lunch'),
  }, {
    name: 'Dinner',
    column: buildPeriod('dinner'),
  }];

  console.log(calendarShowing)

  return (
    <View style={styles.container}>
      {dateButtonsShowing ? (
        <View style={styles.dateRangeButtons}>
          <Button block rounded={false} style={styles.dateRangeButton} onPress={() => setCalendarShowing('from')}>
            <Text>From: {dateRange.from.toLocaleDateString()}</Text>
          </Button>
          <Button block rounded={false} style={styles.dateRangeButton} onPress={() => setCalendarShowing('to')}>
            <Text>To: {dateRange.to.toLocaleDateString()}</Text>
          </Button>
          {calendarShowing === 'from' ? <DateTimePicker
            value={dateRange.from}
            onChange={(_, date) => setDate('from', date)}
            
          /> : null}
          {calendarShowing === 'to' ? <DateTimePicker
            value={dateRange.to}
            onChange={(_, date) => setDate('to', date)}
            
          /> : null}
        </View>
      ) : null}
      <Content style={styles.content}>
        <View style={styles.schedule}>
          <View style={[styles.period, styles.days]}>
            <Text style={styles.headerText} />
            {dayArray.map(day => (
              <View key={day.fmt} style={styles.day}>
                <Text style={styles.dayFmt}>{day.fmt}</Text>
                <Text style={styles.dayName}>{day.name}</Text>
              </View>
            ))}
          </View>
          {periods.map(period => (
            <View style={styles.period} key={period.name}>
              <Text style={styles.headerText}>{period.name}</Text>
              {period.column}
            </View>
          ))}
        </View>
      </Content>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  schedule: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  period: {
    flexBasis: 0,
    flexGrow: 1,
  },
  days: {
    flexGrow: 1,
  },
  day: {
    padding: 4,
    height: DAY_HEIGHT,
    borderWidth: 1,
    borderBottomColor: 'black',
    zIndex: 0,
  },
  dayFmt: {
    textAlign: 'center'
  },
  dayName: {
    fontSize: 12,
    textAlign: 'center'
  },
  meal: {
    backgroundColor: 'rgba(150, 166, 255, .8)',
    position: 'absolute',
    top: 1,
    width: '100%',
  },
  selectedMeal: {
    backgroundColor: 'rgba(130, 255, 188, .8)',
  },
  mealText: {
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    borderWidth: 1,
    borderBottomColor: 'black',
    padding: 4,
    height: HEADER_HEIGHT, 
  },
  dateRangeButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  dateRangeButton: {
    flexGrow: 1,
    borderRadius: 0,
  }
});
