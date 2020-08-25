import axios from 'axios';
import {
    elements
} from "../views/base"


export default class SavedTeam {
    constructor(id) {
        this.id = id;
    }

    async getTeam() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569',
        };
        const url = `${elements.url}/teams/${this.id}`;
        const proxie = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await axios(`${url}`, {
                headers,
                mode: 'no-cors',
            });
            this.club = res.data;

        } catch {
            alert(error);
        }
    }
}