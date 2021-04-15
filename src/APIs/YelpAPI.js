import { yelpAPI } from '../config.json';

const proxy = "https://tnoah.ca:8888/";
const yelpBaseUrl = `${proxy}https://api.yelp.com/v3/businesses/`;

export default class YelpAPI {

    static async getYelpPlaces(query, location, radius) {
        
        if (radius == null || radius <= 0) return null;

        let url = `${yelpBaseUrl}search?categories=${query}&latitude=${location.lat}&longitude=${location.lng}&radius=${radius}`;
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
                    if (response[j].image_url !== "") {
                        places.push(response[j]);
                    }   
                }
            }
        }

        return places;
    }

}