import axios from 'axios';
import {
    elements
} from "../views/base"


export default class SavedMatch {
    constructor(id) {
        this.id = id;
    }

    async getMatch() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569',
        };
        const url = `${elements.url}/matches/${this.id}`;
        const proxie = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await axios(`${url}`, {
                headers,
                mode: 'no-cors',
            });
            this.match = res.data.match;

        } catch {
            alert(error);
        }
    }
}