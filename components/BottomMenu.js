import React, { useEffect } from 'react';
import { CurrentBuilding } from "./CurrentBuilding";
import { View, AsyncStorage, Text, StyleSheet } from "react-native";
import { ToggleCampus } from './ToggleCampus';
import { AppLoading } from 'expo';

function BottomMenu () {
    const [selectedBuilding, setSelectedBuilding] = React.useState("");
    //var currentBuilding = CurrentBuilding();

    buildingSelected = async() => {
        let name = await AsyncStorage.getItem('buildingSelected');
        setSelectedBuilding(name);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            buildingSelected();
        }, 100)
        return () => clearInterval(intervalId);
    })

    if (styles) {
        return (
            <View style={styles.rectangle}>
                <Text style={styles.mainLabel}>{selectedBuilding}</Text>
                <Text style={styles.shortLabel}>More info</Text>
                <View style={styles.toggle}>
                    <ToggleCampus />
                </View>
            </View>
        )
    } else {
        return(
            <AppLoading />
        )
    }
    
}

export const styles = StyleSheet.create({
    rectangle: {
        width: '100%',
        height: 150,
        position: 'absolute',
        borderRadius: 30.5,
        backgroundColor: '#2A2E43',
        justifyContent: 'center',
        bottom: -40
    },
    toggle: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center',
        left: "75%",
        top: "25%"
    },
    mainLabel: {
        position: 'absolute', 
        top: '20%', 
        left: '15%', 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'encodeSansExpanded'
    },
    shortLabel: {
        position: 'absolute', 
        top: '40%', 
        left: '15%', 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#80828D',
        fontSize: 12,
        fontFamily: 'encodeSansExpanded'
    }
});

export { BottomMenu };