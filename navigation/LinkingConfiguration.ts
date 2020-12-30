import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Meals: {
            screens: {
              Meals: 'meals',
            },
          },
          Ingredients: {
            screens: {
              Ingredients: 'ingredients',
            },
          },
          Planner: {
            screens: {
              Planner: 'planner',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
