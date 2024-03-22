import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
//get called in PlaceList com. (this is the individual item of the FlatList )
const PlaceItem = ({place,onselect}) => {
// the place is the item from the FlatList
return (
    <Pressable onPress={onselect}>
    <Image source={{ uri: place.imageUri }} />
    <View>
    <Text>{place.title}</Text>
    <Text>{place.address}</Text>
    </View>
    </Pressable>
    );
};

export default PlaceItem;

const styles = StyleSheet.create({

});