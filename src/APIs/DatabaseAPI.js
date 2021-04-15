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

    static async getUser() {
        try {
            let response = await fetch(`${baseUrl}getUser.php`);
            let user = await response.json();
            return user;
        } catch (error) {
            console.log("Unable to get user, defaulting to logged out");
            return {
                loggedIn: false
            }
        } 
    }

    static login(username) {

        let params = new URLSearchParams();
        params.append("username", username);

        fetch(`${baseUrl}login.php`, {
            method: 'POST',
            mode: 'cors',
            body: params
        })
        .then(response => response.text())
        .then(data => console.log(data));
    }

}