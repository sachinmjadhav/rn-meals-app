import React from "react";
import {Text} from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMeals from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import colors from "../constants/colors";

let defaultStackNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? colors.primaryColor : ""
    },
    headerTintColor:
      Platform.OS === "android" ? "white" : colors.primaryColor,
    headerTitleStyle: {
      fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans"
    }
  },
  mode: "card"
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMeals
    },
    MealDetail: MealDetailScreen
  },
  defaultStackNavOptions
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  defaultStackNavOptions
);

let tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      }
    },
    tabColor: colors.primaryColor,
    tabBarLabel:
      Platform.OS === "android" ? (
        <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text>
      ) : (
        "Meals"
      )
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-star"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: colors.accent,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text>
        ) : (
          "Favorites"
        )
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: colors.accent
        }
      });

const FiltersNavigator = createStackNavigator(
  {
    Filter: FiltersScreen
  },
  defaultStackNavOptions
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.accent,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
