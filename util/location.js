const GOOGLE_API_KEY = 'AIzaSyA0qD_UJMVCJyhijr1oEb2cOYduwYaAgas';


export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

//geocoding google API - get used in locationPicker
export async function getAdress(lat,lng){
const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
 const response = await fetch(url);
 if(!response.ok){
    throw new Error("failed to fetch adress");
 }
  const data = await response.json();
  const address =await data.results[0].formatted_address;
  return address;
}
