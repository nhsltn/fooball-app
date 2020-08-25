import axios from 'axios';
import {
    elements
} from "../views/base"



export default class SelectedCompetition {
    constructor(id) {
        this.id = id;
    }

    async competitionStanding() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569'
        };
        const url = `${elements.url}/competitions/${this.id}/standings?standingType=TOTAL`;
        const proxie = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await axios(`${url}`, {
                headers,
                mode: "no-cors"
            });
            this.name = res.data.competition.name;
            this.id = res.data.competition.id;
            this.standing = res.data.standings[0].table;

        } catch {
            alert(error);
        }
    }

    async competitionFixtures() {
        var date = (new Date()).toISOString().split('T')[0]; // for further usage of the app
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'b97a8d1c00dd45e2943107522cc22569'
        };
        const url = `${elements.url}/competitions/${this.id}/matches?dateFrom=2020-07-01&dateTo=2022-09-08`;
        try {
            const res = await axios(`${url}`, {
                headers,
                mode: "no-cors"
            });

            this.fixtures = res.data.matches;


        } catch {
            alert(error);
        }
    }




}