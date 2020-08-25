import {
    renderButtons,
    createButton
} from "./selectedCompetitionView"

import {
    isMatchSaved,
    isTeamSaved
} from "../database/db"

export const renderTeamInfo = (club, isTeamSaved) => {
    const injectHTML = `
        <div class="team__info-header u-margin-bottom-medium">
            <img src="${club.logo}"
                alt="${club.name}">
            <h2 class="heading-secondary">${club.name}</h2>
        </div>

        <div class="team__info-details">
            <div class="team__info-founded">
                <i class="fas fa-calendar-day fa-fw red-text text-darken-1"></i><span>Founded on ${club.founded}</span>
            </div>

            <div class="team__info-stadium">
                <i class="fas fa-home fa-fw red-text text-darken-1"></i><span>${club.stadium}</span>
            </div>

            <div class="team__info-website">
                <i class="fas fa-link fa-fw red-text text-darken-1"></i><span><a
                        href="${club.website}">${club.website}</a></span>

            </div>

            <div class="team__info-email">
                <i class="fas fa-envelope fa-fw red-text text-darken-1"></i><span>${club.mail}</span>

            </div>

            <div class="team__info-phone">
                <i class="fas fa-phone fa-fw red-text text-darken-1"></i><span>${club.phone}</span>

            </div>

            <div class="team__info-adress">
                <i class="fas fa-map-pin fa-fw red-text text-darken-1"></i><span>${club.address}</span>
            </div>

            <div class="save-club">
            <button value="${club.id}" class="button button__like-clubs red red-darken-1 white-text"><i id="${club.id}"
                    class="fas fa-${isTeamSaved ? "trash" : "save"}"></i><span class="innerbutton">${isTeamSaved ? "Delete" : "Save"} Team</span></button>
        </div>

        </div>
    `;
    document.querySelector(".team__info").insertAdjacentHTML("afterbegin", injectHTML);
}

const renderFixture = async fixture => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const injectHTML = `
    <li class="fixtures__list u-margin-bottom-medium">
    <div class="fixtures__date u-center-text red-text text-darken-1 u-margin-bottom-small">
        <p>${new Date(fixture.utcDate).toLocaleDateString(undefined, options)}</p>
        <p>${new Date(fixture.utcDate).toLocaleTimeString('en-US')}</p>
     </div>
            <div class="fixtures__details u-center-text">
        <div class="fixtures__details-hometeam">${fixture.homeTeam.name}</div>
        <div class="fixtures__details-score"><span>${fixture.score.fullTime.homeTeam || 0}</span><span>&nbsp;-&nbsp;</span><span>${fixture.score.fullTime.awayTeam || 0}</span>
        </div>
        <div class="fixtures__details-awayteam">${fixture.awayTeam.name}</div>
    </div>
    <button value="${fixture.id}" class="button__like-fixtures red red-darken-1 white-text"><i id="${fixture.id}" class="fas fa-${await isMatchSaved(fixture.id) ? "trash" : "save"}"></i></button>
</li>
    `;
    document.querySelector(".fixtures-list").insertAdjacentHTML("beforeend", injectHTML);
}

export const renderTeamFixtures = (fixtures, page = 1, resPerPage = 5) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    fixtures.slice(start, end).forEach(renderFixture);

    // render pagination
    renderButtons(page, fixtures.length, resPerPage);
}

const renderSquad = squad => {
    const injectHTML = `
            <li class="player__list">
                <i class="fas fa-tshirt"><span class="player__number">${squad.shirtNumber || ""}</span></i>
                <p class="player__name">${squad.name}</p>
                <p class="player__position">${squad.position || "Coach"}</p>
            </li>
    `;
    document.querySelector(".player").insertAdjacentHTML("afterbegin", injectHTML);
}

export const renderTeamSquad = squads => {
    squads.forEach(renderSquad);
}

export const toggleSaveBtn = (isTeamSaved, id) => {
    if (isTeamSaved) {
        document.getElementById(`${id}`).classList.toggle("fa-save");
        document.getElementById(`${id}`).classList.toggle("fa-trash");
        document.querySelector(".innerbutton").innerHTML = "Delete Team"
    } else {
        document.getElementById(`${id}`).classList.toggle("fa-trash");
        document.getElementById(`${id}`).classList.toggle("fa-save");
        document.querySelector(".innerbutton").innerHTML = "Save Team"
    }
}