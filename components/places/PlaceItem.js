import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constant/colors';
//get called in PlaceList com. (this is the individual item of the FlatList )
const PlaceItem = ({place,onSelect}) => {
// the place is the item from the FlatList
return (
  <Pressable
    onPress={onSelect.bind(this, place.id)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Image style={styles.image} source={{ uri: place.imageUri }} />
    <View style={styles.info}>
      <Text tyle={styles.title}>{place.title}</Text>
      <Text style={styles.address}>{place.address}</Text>
    </View>
  </Pressable>
);
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});