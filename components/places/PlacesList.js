import { View,Text,FlatList,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../constant/colors";
// this comp gets array of places
const PlacesList = ({places}) => {
const navigation = useNavigation()
//this function will called on placeItem and pass the id
function selectPlaceHandler(id){
  navigation.navigate('PlaceDetails',{placeId:id})
}
//if the arrray is empty or doesnt exist so
if(!places||places.length===0){
return (
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackText}>
      No places added yet - start adding some!
    </Text>
  </View>
);
}
//if the array has items so
return (
 <FlatList
  style={styles.list}
 data={places}
 renderItem={({item})=><PlaceItem place={item} onSelect={selectPlaceHandler}/>
 }
keyExtractor={item=>item.id}
 />    
);
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    // textAlign:'center',
    // marginHorizontal:10,
    color: Colors.primary200,
  },
});