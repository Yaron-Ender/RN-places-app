import { useEffect,useState } from "react";
import { useIsFocused } from '@react-navigation/native'
import PlacesList from "../components/places/PlacesList";
//database SQLite
import { fetchPlaces } from "../components/UI/database";
const AllPlaces = ({route}) => {
      const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFoucsed = useIsFocused()
    useEffect(()=>{
    async function loadPlaces(){
const places = await fetchPlaces()
setLoadedPlaces(places)
    }
    if(isFoucsed){
      loadPlaces()
//  setLoadedPlaces((prev)=>{
//    prev = [...prev,route.params.place]
//    return prev
//  })
    }
   
    },[isFoucsed])
    return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;