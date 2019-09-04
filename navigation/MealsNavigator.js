import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import colors from '../constants/colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMeals from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMeals,
  },
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? colors.primaryColor : ""
    }, 
    headerTintColor:
      Platform.OS === "android" ? "white" : colors.primaryColor
  },
  mode: 'card',
});

export default createAppContainer(MealsNavigator);