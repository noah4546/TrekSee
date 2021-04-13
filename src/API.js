import { googleMapAPI, yelpAPI } from './config.json';

const baseUrl = "https://treksee.tnoah.ca/php/";
const proxy = "http://tnoah.ca:8888/";
const placesAPIBaseUrl = `${proxy}https://maps.googleapis.com/maps/api/place/`;
const yelpBaseUrl = `${proxy}https://api.yelp.com/v3/businesses/`;

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

        if (radius == null || radius <= 0) return null;

        let url = `${placesAPIBaseUrl}textsearch/json?query=${query}&location=${location.lat},${location.lng}&radius=${radius}&key=${googleMapAPI}`;
        let response = await fetch(url);
        let places = await response.json();
        console.log(url);
        return places;
    }

    static async getYelpPlaces(query, location, radius) {
        
        if (radius == null || radius <= 0) return null;

        let url = `${yelpBaseUrl}search?term=${query}&latitude=${location.lat}&longitude=${location.lng}&radius=${radius}`;
        let response = await fetch(url, {
            headers: {
                "Authorization": yelpAPI
            }
        });
        let places = await response.json()
        return places.businesses;
    }

    static async getYelpPlacesMultiple(queries, location, radius) {
        
        let places = [];

        for (let i = 0; i < queries.length; i++) {
            let response = await this.getYelpPlaces(queries[i], location, radius);
            
            if (response) {
                for (let j = 0; j < response.length; j++) {
                    places.push(response[j]);
                }
            }
        }

        return places;
    }
}