import { useEffect,useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "./components/constant/colors";
//screens
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
//comp
import IconButton from "./components/UI/IconButton";
//database SQLite
import { init} from "./components/UI/database";
export default function App() {
 const [dbInitialized, setDbInitialized] = useState(false);
//  SplashScreen.preventAutoHideAsync()
  useEffect(()=>{
  init().then(()=>{
 setDbInitialized(true)
  })
  .catch((err)=>{console.log(err)})
  },[])

  if(dbInitialized){
   const hideSplesh = async()=>{
  await SplashScreen.hideAsync()
   }
   hideSplesh()
  }
  const stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  size={24}
                  color={tintColor}
                  icon={"add"}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add new place" }}
          />
          <stack.Screen name="Map" component={Map} />
          <stack.Screen name="PlaceDetails" component={PlaceDetails}
          options={{title:'Loading Place...'}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
