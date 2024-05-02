import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../components/UI/database';
const AddPlace = ({navigation}) => {
  async function createPlaceHandler(place) {
  await insertPlace(place)
   navigation.navigate("AllPlaces", { place: place });
 }


 return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;