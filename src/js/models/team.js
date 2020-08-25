import axios from "axios";
import {
    elements
} from "../views/base";

export default class Team {
    constructor(id) {
        this.id = id
    }

    async teamFixtures() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569'
        };
        const url = `${elements.url}/teams/${this.id}/matches`;
        const proxie = "https://cors-anywhere.herokuapp.com/";

        try {
            const res = await axios(`${url}`, {
                headers,
                mode: "no-cors"
            });
            this.fixtures = res.data.matches;
        } catch (error) {
            alert(error);
        }
    }

    async teamInfo() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569'
        };
        const url = `${elements.url}/teams/${this.id}`;
        const proxie = "https://cors-anywhere.herokuapp.com/";

        try {
            const res = await axios(`${url}`, {
                headers,
                mode: "no-cors"
            });
            this.logo = res.data.crestUrl;
            this.name = res.data.name;
            this.founded = res.data.founded;
            this.stadium = res.data.venue;
            this.website = res.data.website;
            this.mail = res.data.email;
            this.phone = res.data.phone;
            this.address = res.data.address;
            this.squad = res.data.squad;
        } catch (error) {
            alert(error);
        }
    }
}