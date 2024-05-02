import { useState } from "react";
import { View,Text,Alert,Image,StyleSheet } from "react-native";
import { Colors } from "../constant/colors";
import OutlineButton from "../UI/OutlineButton";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  async function verifyPermissions() {
    const permissionResponse = await requestPermission();
    //  permissionResponse.status = "denied";
    console.log(permissionResponse.status);
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
      //return false
    }
    //i didnt check the alert funcionality because i didnt have any option to do so because once it granted it doesnt show the alert box
    if (permissionResponse.status === "denied") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
        [
          {
            text: "Allow",
            onPress: () => {
              permissionResponse.status = "granted";
              verifyPermissions();
            },
          },
          {
            text: "Cancel",
            onPress: () => permissionResponse.status === "denied",
          },
        ]
      );
      return false;
    }
    if (cameraPermissionInformation.status === "granted") {
      return true;
    }
    //  return true;
  }
  async function takeImageHandler() {
    //check if we have permission on IOS
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    //expo method - create the image obj
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    //add the uri to state
    console.log(image);
    if (image.assets) {
      setPickedImage(image.assets[0].uri);
      //rturn vack to the PlaceFoem comp
      onTakeImage(image.assets[0].uri);
    }
  }
  //handle priview varible
  let imagePreview = <Text>No image taken yet.</Text>;
  //if we have uri image
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Pick an image from camera roll
      </OutlineButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
     justifyContent: "center",
     alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius:4,
    overflow:'hidden'
  },
  image: {
    width: "100%",
    height: "100%",
  },
});