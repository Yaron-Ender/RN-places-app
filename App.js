import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
//comp
import IconButton from './components/UI/IconButton';
export default function App() {
  const stack = createNativeStackNavigator()
  return (
    <>
    <StatusBar style='dark' />
    <NavigationContainer>
    <stack.Navigator   
    >
     <stack.Screen name='AllPlaces' component={AllPlaces}
     options={{headerRight:({tintColor})=>(<IconButton size={24} color={tintColor} icon={'add'} />)}}/> 
     <stack.Screen name='AddPlaces'  component={AddPlace}/>
    </stack.Navigator>
    </NavigationContainer>
    </>
   
  );
}

