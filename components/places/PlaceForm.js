import { Text, View,ScrollView,TextInput,StyleSheet } from 'react-native';
import { useState,useCallback } from 'react';
import { Colors } from '../constant/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/Place';
function PlaceForm({onCreatePlace}) {
const [enteredTitle,setEnteredTitle]=useState('')
 const [selectedImage, setSelectedImage] = useState();
 const [pickedLocation, setPickedLocation] = useState();
const changeTitleHeader=(enteredText)=>{
setEnteredTitle(enteredText)
}
 function takeImageHandler(imageUri) {
   setSelectedImage(imageUri);
 }
 const pickLocationHandler = useCallback((location) => {
   setPickedLocation(location);
 }, []);

 function savePlaceHandler() {
  onCreatePlace(new Place(enteredTitle,selectedImage,pickedLocation))
 }
  return (
    <ScrollView style={styles.form}>
    <View style={styles.container} >
      <Text style={styles.label}>Title</Text>
      <TextInput onChangeText={changeTitleHeader} value={enteredTitle}
      style={styles.input}
      />
    <ImagePicker onTakeImage={takeImageHandler}/>
    <LocationPicker onPickLocation={pickLocationHandler} />
    <Button onPress={savePlaceHandler}>Add Place</Button>
    </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
  flex:1,
  padding:24,
  },
  container: {
  flex:1,
 marginBottom:40
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input:{
 marginHorizontal:4,
 marginVertical:8,
 paddingVertical:8,
 fontSize:16,
 borderColor:Colors.primary700,
 borderWidth:2,
 backgroundColor:Colors.primary100,
  },
});
