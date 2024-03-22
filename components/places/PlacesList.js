import { View,Text,FlatList,StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
// this comp gets array of places
const PlacesList = ({places}) => {
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
 data={places}
 renderItem={({item})=>{
<PlaceItem place={item} />
 }}
keyExtractor={item=>item.id}
 />    
);
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
fallbackText: {
    fontSize: 26,
    textAlign:'center',
    marginHorizontal:10,
    
  },
});