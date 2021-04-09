import { googleMapAPI } from './config.json';

const baseUrl = "https://treksee.tnoah.ca/php/";
const placesAPIbaseUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/";

export default class API {

    static async getAllPlaces() {
        try {
            let response = await fetch(`${baseUrl}getPlaces.php`);
            let places = await response.json();
            return places;
        } catch (error) {
            console.log("Unable to connect to server, reverting to default places");
            return ["Art","Attractions","Event Spaces","Historical Buildings","Museums","Parks","Sports"];
        } 
    }

    static async getGooglePlaces(query, location, radius) {
        let url = `${placesAPIbaseUrl}json?query=${query}&location=${location.lat},${location.lng}&radius=${radius}&key=${googleMapAPI}`;
        let response = await fetch(url);
        let places = await response.json();
        return places;
    }
}