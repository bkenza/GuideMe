/* eslint-disable no-unused-vars */
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BuildingHighlight  from "../components/BuildingHighlight";
import { BuildingIdentification } from "../components/BuildingIdentification";
import { BottomMenu } from "../components/BottomMenu";
import { CurrentBuildingLocation } from "../components/CurrentBuildingLocation";
import { View } from "native-base";
import Search  from "../components/Search";
import PropTypes from "prop-types";

const mapPosition = {
    sgwCoord: {
        latitude: 45.496557,
        longitude: -73.578896,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    loyCoord: {
        latitude: 45.457841,
        longitude: -73.640307,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
};

/**
 * US1 - As a user, I would like to navigate through SGW campus.
 * US2 - As a user, I would like to navigate through Loyola campus.
 * 
 * This is our main screen which includes all the components inside a map.
 */
function Map ({ navigation }) {

    const [campusSwitch, setCampusSwitch] = React.useState(true);
    const setSelectedCampus = (value) => {
        setCampusSwitch(value);
    }

    return (
        <View testID="mapView" data-test="MapComponent">
            <View>
                <MapView
                    data-test="MapViewComponent"
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={campusSwitch ? mapPosition.sgwCoord : mapPosition.loyCoord}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsIndoors={false}
                >
                    <BuildingHighlight />
                    <BuildingIdentification />
                </MapView>
                <Search testID="searchBar" navigation = {navigation}/>
                <View style={styles.CurrentBuildingLocation}>
                        {/* <CurrentBuildingLocation /> */}
                </View>
            <BottomMenu navigation={navigation} campus = {setSelectedCampus.bind(this)}/>
            </View>
        </View>
    );
}

Map.propTypes = {
    navigation: PropTypes.any,
};



export const styles = StyleSheet.create({
    map: {
        height: "100%"
    },
    CurrentBuildingLocation: {
        position: "absolute",
        top: "82%",
        left: "80%"
    }
});

export default Map;
