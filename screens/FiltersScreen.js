import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Switch, Platform} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import colors from "../constants/colors";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        onValueChange={props.onChange}
        trackColor={{
          true: colors.primaryColor
        }}
        thumbColor={
          Platform.OS === "android" ? colors.primaryColor : ""
        }
      />
    </View>
  );
};

const FiltersScreen = props => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilter = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };
    console.log(appliedFilter);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  const {navigation} = props;

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Available Filters / Restrictions
      </Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={val => setIsGlutenFree(val)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={val => setIsLactoseFree(val)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={val => setIsVegan(val)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={val => setIsVegetarian(val)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  }
});
export default FiltersScreen;
