import { useSelector } from "react-redux";
import { IDay } from "../store/plans";
import { selectors } from "../store/selectors";

const DATE_STRING = ['Sunday', 'Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface IDate {
  date: Date,
  fmt: string,
  name: string,
  meals?: IDay,
}

export default function useMealPlan(startDate: Date, numOfDays: number) {
  const fullPlan = useSelector(selectors.getPlan);

  const dayArray: IDate[] = [];
  let extraDays = 0;

  const addDateObjects = (dates: IDate[], count: number, start: Date) => {
    let date: Date;

    Array.from(Array(count).keys()).forEach(() => {
      if (!dates.length) {
        date = new Date(start);
        date.setHours(0, 0, 0)
        date.setMilliseconds(0)
      } else {
        date = new Date(dates[dates.length - 1].date)
        date.setDate(date.getDate() + 1)
      }

      const day: IDate = {
        date: date,
        fmt: `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`,
        name: DATE_STRING[date.getDay()],
      }

      if (fullPlan[date.valueOf() * 1000]) {
        day.meals = fullPlan[date.valueOf() * 1000];

        Object.keys(day.meals).forEach((periodName) => {
          const meal = day.meals![periodName as keyof IDay];

          if (meal) {
            const excess = (dayArray.length + (meal.numOfDays || 1)) - numOfDays

            if (excess > extraDays) {
              extraDays = excess
            }
          }
        })
      }

      dates.push(day);
    })
  }

  addDateObjects(dayArray, numOfDays, startDate)

  Array.from(Array(extraDays).keys()).forEach(() => {
    addDateObjects(dayArray, extraDays, startDate)
  })

  return dayArray;
}