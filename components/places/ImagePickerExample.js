import { useState } from "react";
import { View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

function ImagePickerExample() {
  const [image, setImage] = useState(null);
  async function pickImage() {
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });
    console.log(result);
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* {image && (
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    )} */}
    </View>
  );
}

export default ImagePickerExample;
