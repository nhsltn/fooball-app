import axios from 'axios';
import {
    elements
} from "../views/base"

export default class Competition {
    constructor() {
        this.competitions = this.competition;
    }

    // Search data on API based on Query
    async getCompetition() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569'
        };
        const url = `${elements.url}/competitions?plan=TIER_ONE`;
        const proxie = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await axios(`${url}`, {
                headers,
                mode: "no-cors"
            });
            this.competition = res.data.competitions;
            // console.log(this.results);
        } catch (error) {
            alert(error);
        }
    }
}