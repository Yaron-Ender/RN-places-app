import { useEffect, useState } from "react";
 import { View, StyleSheet, Alert, Image, Text } from "react-native";
 import { useNavigation, useRoute, useIsFocused} from "@react-navigation/native";
import { Colors } from "../constant/colors";
import OutlineButton from "../UI/OutlineButton";
import { getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
// import * as Location from 'expo-location';
import { getMapPreview,getAdress } from '../../util/location'

 function LocationPicker({ onPickLocation }) {
   const navigation = useNavigation();
   const route = useRoute();
   const isFocused = useIsFocused();
   const [pickedLocation, setPickedLocation] = useState();
   const [locationPermissionInformation, requestPermission] =
     useForegroundPermissions();

   useEffect(() => {
     if (route.params && isFocused) {
       const mpaPickedLocation = {
         lat: route.params.pickedLat,
         lng: route.params.pickedLng,
       };
       setPickedLocation(mpaPickedLocation);
     }
   }, [isFocused, route]);
   //return back the location to PlaceForm comp
   useEffect(()=>{
    async function handleLocation(){
    if(pickedLocation){
      // the adress is the human readable address
      const address =  await getAdress(pickedLocation.lat,pickedLocation.lng)
      onPickLocation({...pickedLocation,address})
    }
    }
    handleLocation()
   },[pickedLocation,onPickLocation]
  )
   
   const verifyPermission = async () => {
     if (locationPermissionInformation.status === "undetermined") {
       const permissionResponse = await requestPermission();
       return permissionResponse.granted;
       //return false
     }
     if (locationPermissionInformation.status === "denied") {
       Alert.alert(
         "Insufficient Permissions!",
         "You need to grant camera permissions to use this app.",
         [
           {
             text: "Allow",
             onPress: async () => {
               locationPermissionInformation.status = "granted";
               getLocationHandler();
             },
           },
           {
             text: "Cancel",
             onPress: async () => {
               navigation.navigate("AllPlaces");
             },
           },
         ]
       );
     }
     if (locationPermissionInformation.status === "granted") {
       return true;
     }
   };
   async function getLocationHandler() {
     const hasPrmistion = await verifyPermission();
     if (!hasPrmistion) return;
     const location = await getCurrentPositionAsync();
     const { coords } = location;
     setPickedLocation({
       lat: coords.latitude,
       lng: coords.longitude,
     });
   }
   let locationPreview = (
     <Text style={{ fontSize: 20 }}>No location picked yet.</Text>
   );
   {
     locationPreview = pickedLocation && (
       <Image
         style={styles.image}
         source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
       />
     );
   }

   function pickOnMapHandler() {
     navigation.navigate("Map");
   }
   return (
     <View>
       <View style={styles.mapPreview}>{locationPreview}</View>
       <View style={styles.actions}>
         <OutlineButton icon="location" onPress={getLocationHandler}>
           Locate User
         </OutlineButton>
         <OutlineButton icon="map" onPress={pickOnMapHandler}>
           Pick on Map
         </OutlineButton>
       </View>
     </View>
   );
 }

 export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4
  },
});
