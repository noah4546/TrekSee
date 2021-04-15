const baseUrl = "https://treksee.tnoah.ca/php/";

export default class DatabaseAPI {

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

}