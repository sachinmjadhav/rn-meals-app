import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import colors from '../constants/colors';

const CaregoryMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
      <Text>{selectedCategory.title}</Text>
      <Button
        title="Go to Meal Detail!"
        onPress={() => {
          props.navigation.navigate("MealDetail");
        }}
      />
      <Button title="Go Back!" onPress={() => {
        props.navigation.pop();
      }} />
    </View>
  );
};

CaregoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? colors.primaryColor : ""
    },
    headerTintColor:
      Platform.OS === "android" ? "white" : colors.primaryColor
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CaregoryMealsScreen;
