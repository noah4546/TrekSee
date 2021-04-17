const baseUrl = "https://treksee.tnoah.ca/php/";

export default class UserActions {
    
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

    static async login(email, password) {

        let params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        let response = await fetch(`${baseUrl}login.php`, {
            method: 'POST',
            mode: 'cors',
            body: params
        });
        return await response.json();
    }

    static async signup(firstName, lastName, password, email) {

        let params = new URLSearchParams();
        params.append("firstName", firstName);
        params.append("lastName", lastName);
        params.append("password", password);
        params.append("email", email);

        let response = await fetch(`${baseUrl}signup.php`, {
            method: 'POST',
            mode: 'cors',
            body: params
        }); 
        return await response.json();
    }

    static logout() {
        fetch(`${baseUrl}logout.php`);
    }

    static async updateLatLng(lat, lng) {

        let params = new URLSearchParams();
        params.append("lat", lat);
        params.append("lng", lng);

        let response = await fetch(`${baseUrl}updateLatLng.php`, {
            method: 'POST',
            mode: 'cors',
            body: params
        }); 
        return await response.text();
    }
}