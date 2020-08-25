// Global App
import "./css/materialize.min.css";
import "./css/main.css";
import "./js/vendor/materialize.min";
import "./js/vendor/materialize";
import Competition from "./js/models/competition";
import SelectedCompetition from "./js/models/selectedCompetition";
import Team from "./js/models/team";
import SavedMatch from "./js/models/savedMatch";
import SavedTeam from "./js/models/savedTeam";
import * as competitionsView from "./js/views/competitionView";
import * as selectedCompetitionView from "./js/views/selectedCompetitionView";
import * as teamView from "./js/views/teamView";
import * as savedViews from "./js/views/savedViews";
import "./js/database/db"


import {
    elements,
    renderLoader,
    clearLoader
} from "./js/views/base";
import {
    saveTeamDB,
    saveMatchDB,
    isMatchSaved,
    deleteMatchDB,
    getMatchDB,
    isTeamSaved,
    deleteTeamDB,
    getTeamDB
} from "./js/database/db";

const state = {};
window.state = state;

const ctrlCompe = async () => {
    // add Competition to the state
    if (!state.competitions) state.competitions = new Competition();

    // prepare UI for results
    renderLoader(document.querySelector(".competition-form"))

    if (state.competitions) {
        try {
            // Get data from API
            await state.competitions.getCompetition();


            //Render results on UI
            clearLoader();
            competitionsView.renderResult(state.competitions.competition);
        } catch {

        }
    }
}

const ctrlSelectedCompe = async () => {
    const id = competitionsView.getCompetitionID();

    if (id) {

        // Prepare UI for changes
        selectedCompetitionView.clearStanding();
        renderLoader(document.querySelector(".standing-home"))

        // create new competition object
        state.competition = new SelectedCompetition(id);
    }

    try {
        // get competition data
        await state.competition.competitionStanding();

        // render results on UI
        clearLoader();
        selectedCompetitionView.renderCompeStanding(state.competition);
    } catch (error) {

    }
}

const ctrlCompePage = async () => {
    const id = window.location.hash.replace("#competition-", "");

    if (id) {

        // Prepare UI for changes
        renderLoader(document.querySelector(".competition"));
        renderLoader(document.querySelector(".fixtures-list"))

        // create new competition object
        state.competition = new SelectedCompetition(id);
    }

    try {
        // get competition data
        await state.competition.competitionStanding();
        await state.competition.competitionFixtures();


        // render results on UI
        clearLoader();
        clearLoader();
        state.competition.fixtures.sort(function (a, b) {
            return new Date(b.utcDate) - new Date(a.utcDate);
        });
        selectedCompetitionView.renderCompetitionPage(state.competition);
        selectedCompetitionView.renderFixtures(state.competition.fixtures);
        const btn = document.querySelectorAll(".button__like-fixtures");

    } catch (error) {

    }
}

const ctrlTeam = async () => {
    const id = parseInt(window.location.hash.replace("#team-", ""));

    if (id) {


        // Prepare UI for changes
        renderLoader(document.querySelector(".team__info"));
        renderLoader(document.querySelector(".fixtures-list"));
        renderLoader(document.querySelector(".player"));


        // create new club object
        state.team = new Team(id)

        try {
            await state.team.teamFixtures();
            await state.team.teamInfo();

            clearLoader();
            clearLoader();
            clearLoader();
            state.team.fixtures.sort(function (a, b) {
                return new Date(b.utcDate) - new Date(a.utcDate);
            });
            teamView.renderTeamInfo(state.team, await isTeamSaved(id));
            teamView.renderTeamFixtures(state.team.fixtures);
            teamView.renderTeamSquad(state.team.squad);

            document.querySelector(".button__like-clubs").addEventListener("click", async event => {
                state.savedc = new SavedTeam(id);

                if (!await isTeamSaved(id)) {
                    try {
                        await state.savedc.getTeam();
                        saveTeamDB(state.savedc.club);
                        M.toast({
                            html: 'Match Telah Disimpan!',
                            classes: 'success'
                        });
                        teamView.toggleSaveBtn(await isTeamSaved(id), id);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    deleteTeamDB(id);
                    M.toast({
                        html: 'Match Telah Dihapus!',
                        classes: 'delete'
                    });
                    teamView.toggleSaveBtn(await isTeamSaved(id), id);
                }

            });

        } catch (error) {

        }


    }
}

const ctrlFavourite = async () => {
    const match = await getMatchDB();
    const clubs = await getTeamDB();
    teamView.renderTeamFixtures(match);
    savedViews.renderClubs(clubs);
}





document.addEventListener('DOMContentLoaded', function () {


    // SIDEBAR NAVIGATION
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav")
                    .forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a')
                    .forEach(function (elm) {
                        elm.addEventListener('click', function (event) {
                            // Tutup sidenav
                            var sidenav = document.querySelector('.sidenav');
                            M.Sidenav.getInstance(sidenav).close();

                            // Muat konten halaman yang dipanggil
                            page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", 'nav.html', true);
        xhttp.send();
    }

    // Load page content
    var page = window.location.hash.substr(1);
    if (page == '') page = 'home';
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector(".body-content");
                if (this.status == 200) {

                    content.innerHTML = xhttp.responseText;

                    // Get Element Coding Here
                    if (page === "home") {
                        ctrlCompe();
                        document.querySelector(".submitForm").addEventListener("click", event => {
                            event.preventDefault();
                            ctrlSelectedCompe();
                            document.getElementsByClassName("standing-home")[0].style.display = "block";
                        });
                    } else if (page === "competition") {
                        ctrlCompePage();
                        document.querySelector(".fixtures__pagination").addEventListener("click", event => {
                            const btn = event.target.closest(".button__page");
                            if (btn) {
                                const goToPage = parseInt(btn.dataset.page, 10);
                                selectedCompetitionView.clearFixturesResults();
                                selectedCompetitionView.renderFixtures(state.competition.fixtures, goToPage);
                            }
                        });

                    } else if (page === "team") {
                        ctrlTeam();
                        document.querySelector(".fixtures__pagination").addEventListener("click", event => {
                            const btn = event.target.closest(".button__page");
                            if (btn) {
                                const goToPage = parseInt(btn.dataset.page, 10);
                                const resPerPage = 5;
                                selectedCompetitionView.clearFixturesResults();
                                selectedCompetitionView.renderFixtures(state.team.fixtures, goToPage, resPerPage);
                            }
                        });
                    } else if (page === "favourite") {
                        ctrlFavourite();
                        document.querySelector(".fixtures-list").addEventListener("click", event => {
                            if (event.target.matches(".button__like-fixtures, .button__like-fixtures *")) {
                                const id = parseInt(event.target.value);

                                if (id) {
                                    deleteMatchDB(id)
                                    M.toast({
                                        html: 'Match Telah Dihapus!',
                                        classes: 'delete'
                                    });
                                    savedViews.deleteFixtures(id);
                                }

                            }
                        });
                        document.querySelector(".team-list").addEventListener("click", event => {
                            if (event.target.matches(".button__delete-clubs, .button__delete-clubs *")) {
                                const id = parseInt(event.target.value);

                                if (id) {
                                    deleteTeamDB(id)
                                    M.toast({
                                        html: 'Team Telah Dihapus!',
                                        classes: 'delete'
                                    });
                                    savedViews.deleteTeam(id);
                                }

                            }
                        })

                    }

                    if (page === "team" || page === "competition") {
                        document.querySelector(".fixtures-list").addEventListener("click", async event => {
                            if (event.target.matches(".button__like-fixtures, .button__like-fixtures *")) {
                                const id = parseInt(event.target.value);

                                if (!await isMatchSaved(id)) {
                                    state.savedm = new SavedMatch(event.target.value);
                                    try {
                                        await state.savedm.getMatch();
                                        saveMatchDB(state.savedm.match);
                                        M.toast({
                                            html: 'Match Telah Disimpan!',
                                            classes: 'success'
                                        });
                                        selectedCompetitionView.toggleSaveBtn(await isMatchSaved(id), id);
                                    } catch (error) {

                                    }
                                } else {
                                    deleteMatchDB(id);
                                    M.toast({
                                        html: 'Match Telah Dihapus!',
                                        classes: 'delete'
                                    });
                                    selectedCompetitionView.toggleSaveBtn(await isMatchSaved(id), id);
                                }
                            }
                        });

                    }


                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", 'pages/' + page + '.html', true);
        xhttp.send();
    }

    ["hashchange", "load"].forEach(event => window.addEventListener(event, function () {
        const checkcompetition = window.location.hash.indexOf("competition");
        const checkteam = window.location.hash.indexOf("team");

        if (checkcompetition === 1) {
            loadPage("competition");

        } else if (checkteam === 1) {
            loadPage("team");
        }

    }));

});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
            requestNotificationPermission();
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
};

// Meminta ijin menggunakan Notification API
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                return;
            } else if (result === "default") {
                return;
            }

            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BO0fOWRW2NwhKGECuaFVCekpghXihTCPa-4F5t-2FECXGy5sGagl7FZntQJ78q9KOtTptSlQo9byrT0H4E63P5U")
                        }).then(function (subscribe) {
                            console.log("Successfully subscribe with endpoint ", subscribe.endpoint);
                            console.log("Successfully subscribe with p256dh key ", btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey("p256dh"))
                            )));
                            console.log("Successfully subscribe with authkey ", btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey("auth"))
                            )));

                        }).catch(error => {
                            console.log("Cannot complete the subscription. ", error.message);
                        });
                    });
                }
            });
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}