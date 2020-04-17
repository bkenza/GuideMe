import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Icon } from "react-native-elements";
import { MapData } from "./MapData";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCoordinates} from "../screens/DoubleSearch";

function mapStateToProps(state) {
  return {
      goToSearchedItem: state.goToSearchedItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToSearchedItemAction: (coords, name) => dispatch({ 
      type: "UPDATE_SEARCH_BAR_VALUE_SEARCH_BAR_MARKER", 
      payload: {coordinates: coords, name: name}})
  }
}

/**
 * US11 - As a user, I would like to see auto-fill options when I type a query
 * US13 - As a user, I want to be able to search a building by typing its name.
 * US25 - As a user, I would like to be able to search for a room
 * US38 - As a user, I would like to search a department/faculty by name.
 * 
 * The following function renders a search bar in the map. One can search for a
 * classroom, building, department & service.
 */

function fetchData () {
  const searchInfo = MapData({context: "Search"});
  return searchInfo;
}

export function Search (props) {
  // eslint-disable-next-line no-unused-vars

  const [data, setData] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState(null);

  useEffect(() => {
    setData(fetchData());
  }, []);

  useEffect(() => {
    updateSearchItem();
  }, [searchItem]);

  
  const goToMenu = () => {
    AsyncStorage.setItem("sideMenu", "sideMenu"); //FIXME: Why?
    props.navigation.openDrawer();
  };

  const updateSearchItem = () => {
    if (searchItem) {
      props.goToSearchedItemAction({
        latitude: searchItem.coordinates.latitude,
        longitude: searchItem.coordinates.longitude
      }, searchItem.name);
    }
  }
  

  return (
    <View style={styles.container} testID={props.testID}>
      <View style={styles.buttonStyle}>
        <TouchableOpacity>
          <View>
            <Icon name='menu' size={30} onPress={goToMenu}></Icon>
          </View>
        </TouchableOpacity>
      </View>
      <SearchableDropdown
        onTextChange={val => val} //This must be here (does nothing)
        onItemSelect={item => {  setSearchItem({name: item.name, coordinates: getCoordinates(item.name)});  }}
        textInputStyle={styles.textInputStyle}
        itemStyle={styles.itemStyle}
        containerStyle={styles.test}
        itemTextStyle={styles.itemTextStyle}
        itemsContainerStyle={styles.itemsContainerStyle}
        items={data}
        placeholder="Where to?"
        resetValue={true}
      />
    </View>
  );
}

Search.propTypes = {
  testID: PropTypes.string,
  navigation: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);


export const styles = StyleSheet.create({
  buttonStyle: {
    width: "15%",
    borderRightWidth: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    maxHeight: 44,
    borderBottomStartRadius: 20
  },
  test: {
    width: "90%",
    backgroundColor: "brown"
  },
  container: {
    width: "80%",
    position: "absolute",
    top: 50,
    left: "10%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  containerStyle: {
    padding: 5
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    fontFamily: "encodeSansExpanded"
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#FAF9F8",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
  },
  itemTextStyle: {
    color: "#222",
    fontFamily: "encodeSansExpanded"
  },
  itemsContainerStyle: {
    maxHeight: "60%",
  }
});
