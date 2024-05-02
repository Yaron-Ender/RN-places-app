import { useState,useLayoutEffect,useCallback } from "react";
import { StyleSheet,Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
function Map({ navigation,route }) {
  const initialLoaction = route.params&&{
    lat:route.params.initialLat,
    lng:route.params.initialLng
  }
  const [selectedLocation, setSelectedLocation] = useState(initialLoaction);
  const region = {
    latitude:initialLoaction?initialLoaction.lat:30.9923963,
    longitude:initialLoaction?initialLoaction.lng:34.9324947,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(e) {
    for (const key in e) {
      if (key !== "nativeEvent") continue;
      for (const key2 in e[key]) {
        if (key2 !== "coordinate") continue;
        const { latitude, longitude } = e[key][key2];
        setSelectedLocation(
          (prev) => (prev = { lat: latitude, lng: longitude })
        );
      }
    }
  }
  const savePickedLocationHandler =useCallback(()=>{
      if(!selectedLocation){
     Alert.alert(
       "No location picked!",
       "You have to pick a location (by tapping on the map) first!"
     );
     return
      }
       navigation.navigate("AddPlace", {
         pickedLat: selectedLocation.lat,
         pickedLng: selectedLocation.lng,
       });
  },[navigation,selectedLocation])
  useLayoutEffect(() => {
  if(initialLoaction){
    return;
  }
  navigation.setOptions({
    headerRight: ({tintColor}) => { 
      return <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>;
    },
  });
  }, [navigation,savePickedLocationHandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
    //if we come from the LocationPicker comp, initialLocation will be undefine and then we can use marker funcionality, but if we come from PlaceDetails screen, initialLocation will an obj with lat and lng and we will not be abale to set the Marker
      onPress={!initialLoaction&&selectLocationHandler}
    >
      {selectedLocation && (
        // Marker is from expo
        <Marker
          title="picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
