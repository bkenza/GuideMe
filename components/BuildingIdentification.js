import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../screens/Map'
import { Marker } from 'react-native-maps';

class BuildingIdentification extends React.Component {
    render(){
        return(
            <View>
                    <Marker
                    coordinate={{ latitude: 45.497330, longitude: -73.579034}}
                    title={'H building'}>
                        <Text style={styles.buildingIdentification}>H</Text>
                    </Marker>

                    <Marker
                    coordinate={{ latitude: 45.496537, longitude: -73.577755}}
                    title={'LB building'}>
                        <Text style={styles.buildingIdentification}>LB</Text>
                    </Marker>

                    <Marker
                    coordinate={{ latitude: 45.495654, longitude: -73.578671}}
                    title={'EV building'}>
                        <Text style={styles.buildingIdentification}>EV</Text>
                    </Marker>

                    <Marker
                    coordinate={{ latitude: 45.495306, longitude: -73.579011}}
                    title={'JMSB building'}>
                        <Text style={styles.buildingIdentification}>JMSB</Text>
                    </Marker>
            </View>
            );
    }
}

export {BuildingIdentification};